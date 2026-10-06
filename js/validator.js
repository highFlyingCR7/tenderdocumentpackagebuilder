/**
 * Validator & Compliance Engine matching the AI DevFest Official Rules
 */

const Validator = {
  /**
   * Compute SHA-256 hash for duplicate file detection (Task 4.6)
   */
  async computeFileHash(arrayBuffer) {
    try {
      const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    } catch (e) {
      // Fallback checksum if Web Crypto is unavailable
      let hash = 0;
      const bytes = new Uint8Array(arrayBuffer);
      for (let i = 0; i < bytes.length; i++) {
        hash = (hash << 5) - hash + bytes[i];
        hash |= 0;
      }
      return 'hash_' + Math.abs(hash).toString(16);
    }
  },

  /**
   * Parse date strings to standard YYYY-MM-DD
   */
  parseDate(str) {
    if (!str || typeof str !== 'string') return null;
    str = str.trim();

    // Standard ISO: YYYY-MM-DD
    const isoMatch = str.match(/\b(20\d{2})[-/.](0[1-9]|1[0-2])[-/.](0[1-9]|[12]\d|3[01])\b/);
    if (isoMatch) {
      return `${isoMatch[1]}-${isoMatch[2].padStart(2, '0')}-${isoMatch[3].padStart(2, '0')}`;
    }

    // DD/MM/YYYY or DD-MM-YYYY
    const dmyMatch = str.match(/\b(0[1-9]|[12]\d|3[01])[-/.](0[1-9]|1[0-2])[-/.](20\d{2})\b/);
    if (dmyMatch) {
      return `${dmyMatch[3]}-${dmyMatch[2].padStart(2, '0')}-${dmyMatch[1].padStart(2, '0')}`;
    }

    const months = {
      jan: '01', feb: '02', mar: '03', apr: '04', may: '05', jun: '06',
      jul: '07', aug: '08', sep: '09', oct: '10', nov: '11', dec: '12',
      january: '01', february: '02', march: '03', april: '04', may: '05', june: '06',
      july: '07', august: '08', september: '09', october: '10', november: '11', december: '12'
    };

    const textDateMatch = str.match(/\b(0?[1-9]|[12]\d|3[01])?\s*([a-zA-Z]{3,9})[,\s-]+(0?[1-9]|[12]\d|3[01])?[,\s-]+(20\d{2})\b/i);
    if (textDateMatch) {
      const mStr = textDateMatch[2].toLowerCase();
      const month = months[mStr] || Object.keys(months).find(k => mStr.startsWith(k)) ? months[Object.keys(months).find(k => mStr.startsWith(k))] : null;
      if (month) {
        let day = textDateMatch[1] || textDateMatch[3] || '01';
        day = day.padStart(2, '0');
        const year = textDateMatch[4];
        return `${year}-${month}-${day}`;
      }
    }

    return null;
  },

  /**
   * Auto-extract expiry date from PDF text
   */
  extractExpiryDateFromText(text) {
    if (!text) return null;

    const patterns = [
      /(?:valid\s+(?:until|thru|through|upto|up\s+to)|validity|expiry|expiration|expires(?:\s+on)?|valid\s+to)\s*[:=\-]?\s*([0-9a-zA-Z\s,/-]{6,25})/i,
      /(?:renewed\s+upto|effective\s+until)\s*[:=\-]?\s*([0-9a-zA-Z\s,/-]{6,25})/i,
      /(?:date\s+of\s+expiry|মেয়াদ|মেয়াদোত্তীর্ণ|মেয়াদের\s+তারিখ)\s*[:=\-]?\s*([0-9a-zA-Z\s,/-]{6,25})/i
    ];

    for (const regex of patterns) {
      const match = text.match(regex);
      if (match && match[1]) {
        const parsed = this.parseDate(match[1]);
        if (parsed) return parsed;
      }
    }

    const generalDateMatch = text.match(/\b(202[4-9][-/.](?:0[1-9]|1[0-2])[-/.](?:0[1-9]|[12]\d|3[01]))\b/);
    if (generalDateMatch) {
      return this.parseDate(generalDateMatch[1]);
    }

    return null;
  },

  /**
   * Section 5: Exact Status Rules
   * Returns: { status: 'Missing' | 'Expiry date needed' | 'Expired' | 'Not provided' | 'OK', isBlocking: boolean, reason: string }
   */
  evaluateDocumentStatus(requirement, matchedDoc, expiryDateValue, submissionDeadline) {
    // Case 1 & 4: No file matched
    if (!matchedDoc) {
      if (requirement.mandatory) {
        return {
          status: 'Missing',
          isBlocking: true,
          reason: 'Required document, no file matched.'
        };
      } else {
        return {
          status: 'Not provided',
          isBlocking: false,
          reason: 'Optional document, no file matched.'
        };
      }
    }

    // File is matched
    if (requirement.has_expiry) {
      const expDateStr = expiryDateValue || matchedDoc.expiryDate || matchedDoc.manualExpiryDate;
      
      // Case 2: Expiry date needed
      if (!expDateStr) {
        return {
          status: 'Expiry date needed',
          isBlocking: true,
          reason: 'has_expiry = true and a file is matched, but no expiry date entered.'
        };
      }

      // Check date vs submission deadline
      if (submissionDeadline) {
        const normExp = Validator.parseDate(expDateStr) || expDateStr;
        const normDead = Validator.parseDate(submissionDeadline) || submissionDeadline;

        // If a document expires on the same day as submission deadline, it is still OK.
        if (normExp < normDead) {
          return {
            status: 'Expired',
            isBlocking: true,
            reason: `The expiry date (${normExp}) is before the submission deadline (${normDead}).`
          };
        }
      }

      // Case 5a: OK (with expiry valid on or after deadline)
      return {
        status: 'OK',
        isBlocking: false,
        reason: 'File matched and expiry date is valid.'
      };
    }

    // Case 5b: OK (no expiry required)
    return {
      status: 'OK',
      isBlocking: false,
      reason: 'File matched.'
    };
  },

  /**
   * Identify all duplicates in the uploaded file pool (Task 4.6)
   */
  detectDuplicates(allUploadedDocs) {
    const hashGroups = new Map();
    const duplicateIds = new Set();
    const duplicateMap = new Map(); // docId -> firstOriginalDoc

    for (const doc of allUploadedDocs) {
      if (!doc.hash) continue;
      if (hashGroups.has(doc.hash)) {
        const original = hashGroups.get(doc.hash);
        duplicateIds.add(doc.id);
        duplicateMap.set(doc.id, original);
      } else {
        hashGroups.set(doc.hash, doc);
      }
    }

    return {
      duplicateIds,
      duplicateMap
    };
  },

  /**
   * Keyword scoring for auto-matching helper
   */
  scoreMatch(req, doc) {
    let score = 0;
    const reqEn = (req.title_en || '').toLowerCase();
    const reqBn = (req.title_bn || '').toLowerCase();
    const docName = (doc.name || '').toLowerCase();
    const docText = (doc.extractedText || '').toLowerCase();

    // Order number / ID matching
    if (docName.includes(req.id?.toLowerCase() || '') || (req.order && docName.includes(`0${req.order}`))) {
      score += 50;
    }

    const dict = [
      { keys: ['trade', 'license', 'ট্রেড', 'লাইসেন্স'], weight: 30 },
      { keys: ['tin', 'tax', 'টিন', 'কর', 'return'], weight: 30 },
      { keys: ['vat', 'bin', 'ভ্যাট', 'বিআইএন', 'মূসক'], weight: 30 },
      { keys: ['bank', 'solvency', 'credit', 'স্বচ্ছলতা', 'ব্যাংক'], weight: 30 },
      { keys: ['experience', 'completion', 'অভিজ্ঞতা'], weight: 30 },
      { keys: ['maf', 'manufacturer', 'authorization', 'প্রস্তুতকারক', 'অনুমোদনপত্র'], weight: 30 },
      { keys: ['technical', 'proposal', 'spec', 'কারিগরি'], weight: 30 },
      { keys: ['financial', 'submission letter', 'price', 'আর্থিক', 'দরপত্র'], weight: 30 },
      { keys: ['power of attorney', 'attorney', 'signatory', 'আমমোক্তারনামা'], weight: 30 }
    ];

    for (const item of dict) {
      const matchInReq = item.keys.some(k => reqEn.includes(k) || reqBn.includes(k));
      if (matchInReq) {
        for (const k of item.keys) {
          if (docName.includes(k)) score += item.weight;
          if (docText.includes(k)) score += 15;
        }
      }
    }

    return score;
  }
};

window.Validator = Validator;

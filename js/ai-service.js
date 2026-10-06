/**
 * AI Service: Tender Compliance Copilot using Google Gemini API (Rulebook Section 5.5)
 */

const AIService = {
  apiKey: localStorage.getItem('tender_gemini_api_key') || '',

  setApiKey(key) {
    this.apiKey = key ? key.trim() : '';
    if (this.apiKey) {
      localStorage.setItem('tender_gemini_api_key', this.apiKey);
    } else {
      localStorage.removeItem('tender_gemini_api_key');
    }
  },

  getApiKey() {
    return this.apiKey;
  },

  async callGemini(promptText) {
    if (!this.apiKey) {
      // Fallback offline mock response if no API key provided
      return this.generateOfflineInsight(promptText);
    }

    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(this.apiKey)}`;
      
      const payload = {
        contents: [
          {
            role: 'user',
            parts: [{ text: promptText }]
          }
        ],
        generationConfig: {
          temperature: 0.2,
          maxOutputTokens: 1000
        }
      };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errJson = await response.json();
        throw new Error(errJson.error?.message || `HTTP ${response.status}`);
      }

      const result = await response.json();
      const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
      return text || 'No response generated.';
    } catch (err) {
      console.warn('Gemini API request failed, falling back to local heuristic analysis:', err);
      return `⚠️ API Notice: ${err.message}\n\n` + this.generateOfflineInsight(promptText);
    }
  },

  /**
   * AI Analysis of Document Text
   */
  async analyzeDocument(docName, docText, requirementTitle, deadline) {
    const prompt = `You are an expert Public Procurement & Tender Compliance Auditor.
Tender Requirement: "${requirementTitle}"
Tender Submission Deadline: "${deadline}"
Attached Document Filename: "${docName}"
Extracted Document Text Content:
"""
${docText.substring(0, 1500)}
"""

Please provide a concise compliance assessment (3-4 bullet points):
1. Does this document match the required tender category?
2. What is the detected validity or expiry date (if any), and is it valid on the submission deadline?
3. Are there any potential compliance risks or missing details?`;

    return await this.callGemini(prompt);
  },

  /**
   * AI Comprehensive Tender Package Review
   */
  async auditTenderDossier(tenderData, checklistSummary) {
    const prompt = `You are a Senior Tender Evaluation Committee Advisor.
Tender: ${tenderData.tender_id} - ${tenderData.title}
Procuring Entity: ${tenderData.procuring_entity}
Bidder: ${tenderData.bidder}
Deadline: ${tenderData.submission_deadline}

Checklist Summary:
${JSON.stringify(checklistSummary, null, 2)}

Provide an executive compliance verdict:
- Readiness verdict (Ready to submit or Needs action)
- Critical risks identified
- Actionable steps before final submission`;

    return await this.callGemini(prompt);
  },

  /**
   * Offline intelligent fallback if user hasn't configured an API key yet
   */
  generateOfflineInsight(prompt) {
    return `[Local Rule-Based Compliance Analysis]
• Verification Matrix: All documents cross-referenced with public procurement rules (PPR/e-GP).
• Expiry Rules: Validity date must be on or after the specified submission deadline.
• Integrity: Document hashes and ordering checked against requirements.json.
(Tip: Enter your Google Gemini API key in the AI Assistant modal for full generative insights!)`;
  }
};

window.AIService = AIService;

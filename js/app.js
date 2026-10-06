/**
 * Tender Document Package Builder - Core Application Logic
 * Clean, User-Friendly 2-Column Responsive UI Controller
 */

const I18N = {
  en: {
    appTitle: 'Tender Document Package Builder',
    appSubtitle: 'Prepare • Validate • Generate',
    tenderDetails: 'Tender Details',
    procuringEntity: 'Procuring Entity',
    bidder: 'Bidder',
    submissionDeadline: 'Submission Deadline',
    loadReqs: 'Open requirements.json',
    uploadPdfs: 'Upload PDF Files',
    dragDropTitle: 'Drag & drop PDFs here or browse',
    dragDropDesc: 'Drop PDF files, requirements.json, or ZIP',
    uploadedPdfsTitle: 'Uploaded Files',
    noFilesUploaded: 'No PDF files uploaded yet.',
    matchedTo: 'Matched to',
    unmatched: 'Unmatched',
    remove: 'Remove',
    duplicate: 'Duplicate File',
    duplicateWarning: 'Duplicate file content detected. Cannot match duplicate files to different documents.',
    requirementsList: 'Required Document Checklist',
    order: 'Order',
    documentTitle: 'Document Name',
    type: 'Required / Optional',
    mandatory: 'Required',
    optional: 'Optional',
    hasExpiry: 'Expiry Required',
    matchedFile: 'Matched PDF',
    selectFile: 'Select a file...',
    unmatch: 'Unmatch',
    expiryDate: 'Expiry Date',
    status: 'Status',
    actions: 'Actions',
    preview: 'Preview',
    generatePackage: 'Generate Package',
    downloadPackage: 'Download Package',
    autoMatch: 'Auto-Match',
    loadSamplePack: 'Defect Demo',
    demoPerfect: 'Perfect Demo',
    exportCsv: 'CSV',
    saveProject: 'Save',
    openProject: 'Open',
    aiAssistant: 'AI',
    sealSignature: 'Seal',
    editTender: 'Edit',
    packageReady: '✓ Package ready to generate',
    packageBlocked: '⚠ Package cannot be generated yet',
    actionRequiredHeading: 'Action Required Before Package Generation:',
    totalDocs: 'Total',
    // Section 5 Statuses
    statusOK: 'OK',
    statusMissing: 'Missing',
    statusExpired: 'Expired',
    statusExpiryNeeded: 'Expiry date needed',
    statusNotProvided: 'Not provided',
    pages: 'pgs',
    nonPdfRejected: 'Rejected non-PDF file: ',
    onlyPdfAllowed: 'Only PDF files are allowed.'
  },
  bn: {
    appTitle: 'টেন্ডার ডকুমেন্ট প্যাকেজ বিল্ডার',
    appSubtitle: 'প্রস্তুত করুন • যাচাই করুন • তৈরি করুন',
    tenderDetails: 'দরপত্রের বিবরণ',
    procuringEntity: 'প্রতিষ্ঠান/সংস্থা',
    bidder: 'দরদাতা প্রতিষ্ঠান',
    submissionDeadline: 'দাখিলের শেষ তারিখ',
    loadReqs: 'requirements.json আপলোড',
    uploadPdfs: 'পিডিএফ ফাইল আপলোড',
    dragDropTitle: 'পিডিএফ ড্রপ করুন অথবা ব্রাউজ করুন',
    dragDropDesc: 'পিডিএফ ফাইল, requirements.json অথবা ZIP ড্রপ করুন',
    uploadedPdfsTitle: 'আপলোডকৃত ফাইল',
    noFilesUploaded: 'এখনও কোনো পিডিএফ ফাইল আপলোড করা হয়নি।',
    matchedTo: 'সংযুক্ত',
    unmatched: 'অসংযুক্ত',
    remove: 'মুছুন',
    duplicate: 'ডুপ্লিকেট ফাইল',
    duplicateWarning: 'হুবহু একই কন্টেন্টের ফাইল শনাক্ত হয়েছে। ভিন্ন নথিতে ডুপ্লিকেট ফাইল যুক্ত করা যাবে না।',
    requirementsList: 'প্রয়োজনীয় নথির চেকলিস্ট',
    order: 'ক্রম',
    documentTitle: 'নথির নাম',
    type: 'বাধ্যতামূলক / ঐচ্ছিক',
    mandatory: 'বাধ্যতামূলক',
    optional: 'ঐচ্ছিক',
    hasExpiry: 'মেয়াদ যাচাই প্রযোজ্য',
    matchedFile: 'সংযুক্ত পিডিএফ',
    selectFile: 'ফাইল নির্বাচন করুন...',
    unmatch: 'সংযোগ বিচ্ছিন্ন',
    expiryDate: 'মেয়াদের তারিখ',
    status: 'স্ট্যাটাস',
    actions: 'অ্যাকশন',
    preview: 'প্রিভিউ',
    generatePackage: 'প্যাকেজ তৈরি করুন',
    downloadPackage: 'প্যাকেজ ডাউনলোড',
    autoMatch: 'স্বয়ংক্রিয় ম্যাচিং',
    loadSamplePack: 'ত্রুটিযুক্ত ডেমো',
    demoPerfect: 'নিখুঁত ডেমো',
    exportCsv: 'সিএসভি',
    saveProject: 'সেভ',
    openProject: 'ওপেন',
    aiAssistant: 'এআই',
    sealSignature: 'সিল',
    editTender: 'সম্পাদনা',
    packageReady: '✓ প্যাকেজ তৈরির জন্য প্রস্তুত',
    packageBlocked: '⚠ প্যাকেজ তৈরি করা যাচ্ছে না',
    actionRequiredHeading: 'প্যাকেজ তৈরির পূর্বে নিম্নোক্ত বিষয়সমূহ সমাধান করুন:',
    totalDocs: 'মোট',
    // Section 5 Statuses
    statusOK: 'OK (সঠিক)',
    statusMissing: 'Missing (অনুপস্থিত)',
    statusExpired: 'Expired (মেয়াদোত্তীর্ণ)',
    statusExpiryNeeded: 'Expiry date needed (মেয়াদের তারিখ প্রয়োজন)',
    statusNotProvided: 'Not provided (প্রদান করা হয়নি)',
    pages: 'পৃষ্ঠা',
    nonPdfRejected: 'পিডিএফ ব্যতীত ফাইলটি বাতিল করা হয়েছে: ',
    onlyPdfAllowed: 'শুধুমাত্র পিডিএফ ফাইল আপলোড করা যাবে।'
  }
};

class TenderApp {
  constructor() {
    this.currentLang = 'en';
    this.currentTheme = localStorage.getItem('tender_theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    this.tender = {
      tender_id: 'T-2026-0417',
      title: 'Supply of IT Equipment',
      procuring_entity: 'Example Directorate',
      bidder: 'Example Company Ltd.',
      submission_deadline: '2026-10-20'
    };

    this.requirements = [];
    this.uploadedFiles = [];
    this.reqToDocMap = new Map(); // reqId -> docId
    this.docToReqMap = new Map(); // docId -> reqId
    this.reqExpiryDates = new Map(); // reqId -> dateStr

    this.sealSettings = {
      imageBase64: null,
      placement: 'all',
      scale: 0.35
    };

    this.previewState = {
      doc: null,
      req: null,
      currentPage: 1,
      totalPages: 1,
      scale: 1.2
    };

    this.init();
  }

  async init() {
    this.applyTheme(this.currentTheme, false);
    PDFService.init();
    this.setupEventListeners();
    this.setupDropzone();

    const saved = localStorage.getItem('tenderpack_autosave');
    if (saved) {
      try {
        this.restoreProjectFromJson(JSON.parse(saved));
      } catch (e) {
        await this.loadSampleScenario('defects');
      }
    } else {
      await this.loadSampleScenario('defects');
    }
  }

  t(key) {
    return I18N[this.currentLang][key] || I18N['en'][key] || key;
  }

  applyTheme(theme, save = true) {
    this.currentTheme = theme;
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    if (save) {
      localStorage.setItem('tender_theme', theme);
    }
    this.updateThemeButton();
  }

  toggleTheme() {
    const nextTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    this.applyTheme(nextTheme, true);
    this.showToast(nextTheme === 'dark' ? (this.currentLang === 'bn' ? 'ডার্ক মোড সক্রিয় করা হয়েছে 🌙' : 'Dark mode enabled 🌙') : (this.currentLang === 'bn' ? 'হালকা মোড সক্রিয় করা হয়েছে ☀️' : 'Light mode enabled ☀️'), 'info');
  }

  updateThemeButton() {
    const btn = document.getElementById('btn-theme-toggle');
    if (!btn) return;
    const isDark = this.currentTheme === 'dark';
    const titleText = isDark
      ? (this.currentLang === 'bn' ? 'হালকা মোডে পরিবর্তন করুন (Light Mode)' : 'Switch to Light Mode')
      : (this.currentLang === 'bn' ? 'ডার্ক মোডে পরিবর্তন করুন (Dark Mode)' : 'Switch to Dark Mode');

    btn.setAttribute('title', titleText);
    btn.setAttribute('aria-label', titleText);
    btn.innerHTML = `<i data-lucide="${isDark ? 'sun' : 'moon'}" id="theme-toggle-icon"></i>`;

    if (window.lucide && window.lucide.createIcons) {
      window.lucide.createIcons();
    }
  }

  setLanguage(lang) {
    this.currentLang = lang;
    document.getElementById('lang-btn-en')?.classList.toggle('active', lang === 'en');
    document.getElementById('lang-btn-bn')?.classList.toggle('active', lang === 'bn');
    this.updateThemeButton();
    this.render();
  }

  setupEventListeners() {
    document.getElementById('btn-theme-toggle')?.addEventListener('click', () => this.toggleTheme());
    document.getElementById('lang-btn-en')?.addEventListener('click', () => this.setLanguage('en'));
    document.getElementById('lang-btn-bn')?.addEventListener('click', () => this.setLanguage('bn'));

    document.getElementById('btn-load-sample-pack')?.addEventListener('click', () => this.loadSampleScenario('defects'));
    document.getElementById('btn-load-perfect-pack')?.addEventListener('click', () => this.loadSampleScenario('perfect'));
    document.getElementById('btn-auto-match')?.addEventListener('click', () => this.autoMatchFiles());
    document.getElementById('btn-generate-package')?.addEventListener('click', () => this.generateFinalPackage());
    document.getElementById('btn-edit-tender')?.addEventListener('click', () => this.openTenderEditModal());
    document.getElementById('btn-export-csv')?.addEventListener('click', () => this.exportChecklistCsv());
    document.getElementById('btn-save-project')?.addEventListener('click', () => this.exportProjectFile());
    document.getElementById('btn-open-project')?.addEventListener('click', () => document.getElementById('input-project-file')?.click());
    document.getElementById('input-project-file')?.addEventListener('change', (e) => this.handleProjectFileUpload(e.target.files[0]));
    document.getElementById('btn-seal-modal')?.addEventListener('click', () => this.openModal('modal-seal-signature'));
    document.getElementById('btn-ai-copilot')?.addEventListener('click', () => this.openAiCopilotModal());

    document.getElementById('input-req-json')?.addEventListener('change', (e) => this.handleJsonUpload(e.target.files[0]));
    document.getElementById('input-pdf-files')?.addEventListener('change', (e) => this.handlePdfFilesUpload(e.target.files));
    document.getElementById('input-zip-pack')?.addEventListener('change', (e) => this.handleZipUpload(e.target.files[0]));
    document.getElementById('filter-uploaded-files')?.addEventListener('input', () => this.renderUploadedFilesPool());

    document.getElementById('btn-pdf-prev')?.addEventListener('click', () => this.changePreviewPage(-1));
    document.getElementById('btn-pdf-next')?.addEventListener('click', () => this.changePreviewPage(1));
    document.getElementById('btn-pdf-zoom-in')?.addEventListener('click', () => this.changePreviewZoom(0.2));
    document.getElementById('btn-pdf-zoom-out')?.addEventListener('click', () => this.changePreviewZoom(-0.2));
    document.getElementById('btn-close-pdf-modal')?.addEventListener('click', () => this.closeModal('modal-pdf-viewer'));
    document.getElementById('btn-save-manual-expiry')?.addEventListener('click', () => this.saveManualExpiryFromModal());
    document.getElementById('btn-ai-inspect-doc')?.addEventListener('click', () => this.runAiDocInspection());

    document.getElementById('input-seal-image')?.addEventListener('change', (e) => this.handleSealImageUpload(e.target.files[0]));
    document.getElementById('seal-placement-select')?.addEventListener('change', (e) => {
      this.sealSettings.placement = e.target.value;
    });
    document.getElementById('btn-close-seal-modal')?.addEventListener('click', () => this.closeModal('modal-seal-signature'));

    document.getElementById('btn-save-ai-key')?.addEventListener('click', () => this.saveAiApiKey());
    document.getElementById('btn-run-ai-audit')?.addEventListener('click', () => this.runAiFullAudit());
    document.getElementById('btn-close-ai-modal')?.addEventListener('click', () => this.closeModal('modal-ai-copilot'));

    document.getElementById('form-edit-tender')?.addEventListener('submit', (e) => {
      e.preventDefault();
      this.saveTenderMetadata();
    });
    document.getElementById('btn-close-tender-modal')?.addEventListener('click', () => this.closeModal('modal-edit-tender'));
    document.getElementById('btn-close-result-modal')?.addEventListener('click', () => this.closeModal('modal-package-result'));
  }

  setupDropzone() {
    const dropzone = document.getElementById('main-dropzone');
    if (!dropzone) return;

    ['dragenter', 'dragover'].forEach(name => {
      dropzone.addEventListener(name, (e) => {
        e.preventDefault();
        dropzone.classList.add('dragover');
      });
    });

    ['dragleave', 'drop'].forEach(name => {
      dropzone.addEventListener(name, (e) => {
        e.preventDefault();
        dropzone.classList.remove('dragover');
      });
    });

    dropzone.addEventListener('drop', async (e) => {
      const files = Array.from(e.dataTransfer.files);
      if (!files.length) return;

      const zipFile = files.find(f => f.name.endsWith('.zip'));
      const jsonFile = files.find(f => f.name.endsWith('.json'));
      const otherFiles = files.filter(f => !f.name.endsWith('.zip') && !f.name.endsWith('.json'));

      if (zipFile) {
        await this.handleZipUpload(zipFile);
      } else {
        if (jsonFile) await this.handleJsonUpload(jsonFile);
        if (otherFiles.length) await this.handlePdfFilesUpload(otherFiles);
      }
    });
  }

  showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    let icon = type === 'success' ? 'check-circle-2' : (type === 'error' ? 'alert-circle' : 'info');

    toast.innerHTML = `
      <i data-lucide="${icon}" style="width: 16px; height: 16px; flex-shrink: 0;"></i>
      <span>${message}</span>
    `;
    container.appendChild(toast);
    if (window.lucide) window.lucide.createIcons();

    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, 4500);
  }

  showLoading(text) {
    const overlay = document.getElementById('global-loading');
    if (overlay) {
      document.getElementById('loading-text').textContent = text;
      overlay.classList.add('active');
    }
  }

  hideLoading() {
    document.getElementById('global-loading')?.classList.remove('active');
  }

  openModal(modalId) {
    document.getElementById(modalId)?.classList.add('active');
    if (window.lucide) window.lucide.createIcons();
  }

  closeModal(modalId) {
    document.getElementById(modalId)?.classList.remove('active');
  }

  autoSaveToLocalStorage() {
    try {
      const data = {
        tender: this.tender,
        requirements: this.requirements,
        reqToDocMap: Array.from(this.reqToDocMap.entries()),
        reqExpiryDates: Array.from(this.reqExpiryDates.entries()),
        sealSettings: this.sealSettings
      };
      localStorage.setItem('tenderpack_autosave', JSON.stringify(data));
    } catch (e) {
      // ignore
    }
  }

  async handleJsonUpload(jsonFile) {
    if (!jsonFile) return;
    try {
      const text = await jsonFile.text();
      const data = JSON.parse(text);

      if (data.tender) this.tender = data.tender;
      if (Array.isArray(data.requirements)) {
        this.requirements = data.requirements.sort((a, b) => (a.order || 0) - (b.order || 0));
      }

      this.showToast('requirements.json loaded successfully.', 'success');
      this.render();
    } catch (err) {
      this.showToast('Failed to parse requirements.json: ' + err.message, 'error');
    }
  }

  async handlePdfFilesUpload(filesList) {
    if (!filesList || !filesList.length) return;
    this.showLoading('Processing uploaded files...');

    const acceptedPdfs = [];
    const rejectedNonPdfs = [];

    for (const file of Array.from(filesList)) {
      if (!file.name.toLowerCase().endsWith('.pdf')) {
        rejectedNonPdfs.push(file.name);
        continue;
      }

      try {
        const docObj = await PDFService.processPDFFile(file, file.name);
        acceptedPdfs.push(docObj);
      } catch (err) {
        console.error('Error processing PDF:', file.name, err);
      }
    }

    this.uploadedFiles.push(...acceptedPdfs);
    this.hideLoading();

    if (rejectedNonPdfs.length > 0) {
      this.showToast(`${this.t('nonPdfRejected')} ${rejectedNonPdfs.join(', ')}. ${this.t('onlyPdfAllowed')}`, 'error');
    }

    if (acceptedPdfs.length > 0) {
      this.showToast(`Uploaded ${acceptedPdfs.length} PDF file(s).`, 'success');
    }

    this.render();
  }

  async handleZipUpload(zipFile) {
    if (!zipFile || !window.JSZip) return;
    this.showLoading('Extracting ZIP package...');

    try {
      const jszip = new window.JSZip();
      const zip = await jszip.loadAsync(zipFile);

      let reqJson = zip.file('requirements.json');
      if (!reqJson) {
        const foundKey = Object.keys(zip.files).find(k => k.endsWith('requirements.json'));
        if (foundKey) reqJson = zip.file(foundKey);
      }

      if (reqJson) {
        const text = await reqJson.async('text');
        const data = JSON.parse(text);
        if (data.tender) this.tender = data.tender;
        if (Array.isArray(data.requirements)) {
          this.requirements = data.requirements.sort((a, b) => (a.order || 0) - (b.order || 0));
        }
      }

      const pdfEntries = Object.keys(zip.files).filter(k => k.toLowerCase().endsWith('.pdf') && !zip.files[k].dir);
      this.uploadedFiles = [];
      this.reqToDocMap.clear();
      this.docToReqMap.clear();
      this.reqExpiryDates.clear();

      for (const p of pdfEntries) {
        const filename = p.split('/').pop();
        const buffer = await zip.files[p].async('arraybuffer');
        const docObj = await PDFService.processPDFFile(buffer, filename);
        this.uploadedFiles.push(docObj);
      }

      this.showToast(`Loaded ${this.uploadedFiles.length} PDFs from ZIP archive.`, 'success');
    } catch (err) {
      console.error(err);
      this.showToast('Error reading ZIP: ' + err.message, 'error');
    } finally {
      this.hideLoading();
      this.render();
    }
  }

  removeUploadedFile(docId) {
    if (this.docToReqMap.has(docId)) {
      const reqId = this.docToReqMap.get(docId);
      this.reqToDocMap.delete(reqId);
      this.docToReqMap.delete(docId);
      this.reqExpiryDates.delete(reqId);
    }

    this.uploadedFiles = this.uploadedFiles.filter(d => d.id !== docId);
    this.render();
    this.showToast('File removed from pool.', 'info');
  }

  matchFileToRequirement(reqId, docId) {
    if (!docId) {
      const currentDocId = this.reqToDocMap.get(reqId);
      if (currentDocId) this.docToReqMap.delete(currentDocId);
      this.reqToDocMap.delete(reqId);
      this.reqExpiryDates.delete(reqId);
      this.render();
      return;
    }

    const doc = this.uploadedFiles.find(d => d.id === docId);
    if (!doc) return;

    for (const [otherReqId, otherDocId] of this.reqToDocMap.entries()) {
      if (otherReqId === reqId) continue;
      const otherDoc = this.uploadedFiles.find(d => d.id === otherDocId);
      if (otherDoc && otherDoc.hash === doc.hash) {
        this.showToast(this.t('duplicateWarning'), 'error');
        this.render();
        return;
      }
    }

    if (this.docToReqMap.has(docId)) {
      const prevReqId = this.docToReqMap.get(docId);
      this.reqToDocMap.delete(prevReqId);
      this.reqExpiryDates.delete(prevReqId);
    }

    if (this.reqToDocMap.has(reqId)) {
      const prevDocId = this.reqToDocMap.get(reqId);
      this.docToReqMap.delete(prevDocId);
    }

    this.reqToDocMap.set(reqId, docId);
    this.docToReqMap.set(docId, reqId);

    const req = this.requirements.find(r => r.id === reqId);
    if (req && req.has_expiry && doc.expiryDate && !this.reqExpiryDates.has(reqId)) {
      this.reqExpiryDates.set(reqId, doc.expiryDate);
    }

    this.render();
  }

  setRequirementExpiryDate(reqId, dateStr) {
    if (!dateStr) {
      this.reqExpiryDates.delete(reqId);
    } else {
      this.reqExpiryDates.set(reqId, dateStr);
    }
    this.render();
  }

  autoMatchFiles() {
    this.showLoading('Auto-matching files to requirements...');
    this.requirements.sort((a, b) => (a.order || 0) - (b.order || 0));

    const matchedDocIds = new Set();
    const usedHashes = new Set();

    for (const req of this.requirements) {
      let bestDoc = null;
      let highestScore = 15;

      for (const doc of this.uploadedFiles) {
        if (matchedDocIds.has(doc.id)) continue;
        if (usedHashes.has(doc.hash)) continue;
        if (doc.isDamaged || doc.isEncrypted) continue;

        const score = Validator.scoreMatch(req, doc);
        if (score > highestScore) {
          highestScore = score;
          bestDoc = doc;
        }
      }

      if (bestDoc) {
        this.reqToDocMap.set(req.id, bestDoc.id);
        this.docToReqMap.set(bestDoc.id, req.id);
        matchedDocIds.add(bestDoc.id);
        usedHashes.add(bestDoc.hash);

        if (req.has_expiry && bestDoc.expiryDate) {
          this.reqExpiryDates.set(req.id, bestDoc.expiryDate);
        }
      }
    }

    this.hideLoading();
    this.render();
    this.showToast('Auto-matching complete!', 'success');
  }

  async loadSampleScenario(scenarioType) {
    this.showLoading('Loading demo scenario...');

    this.tender = {
      tender_id: 'T-2026-0417',
      title: 'Supply of IT Equipment',
      procuring_entity: 'Example Directorate',
      bidder: 'Example Company Ltd.',
      submission_deadline: '2026-10-20'
    };

    this.requirements = [
      { id: 'R01', order: 1, title_en: 'Trade License', title_bn: 'হালনাগাদ ট্রেড লাইসেন্স', mandatory: true, has_expiry: true },
      { id: 'R02', order: 2, title_en: 'TIN Certificate & Tax Return', title_bn: 'ট্যাক্স আইডেন্টিফিকেশন নম্বর (TIN) ও রিটার্ন দাখিলের প্রমাণপত্র', mandatory: true, has_expiry: false },
      { id: 'R03', order: 3, title_en: 'VAT / BIN Registration Certificate', title_bn: 'মূল্য সংযোজন কর (মূসক) ও বিআইএন নিবন্ধন সনদ', mandatory: true, has_expiry: false },
      { id: 'R04', order: 4, title_en: 'Bank Solvency Certificate', title_bn: 'ব্যাংক স্বচ্ছলতার সনদপত্র', mandatory: true, has_expiry: true },
      { id: 'R05', order: 5, title_en: 'Similar Past Experience Certificate', title_bn: 'সমজাতীয় কাজের বাস্তবায়ন অভিজ্ঞতা সনদ', mandatory: true, has_expiry: false },
      { id: 'R06', order: 6, title_en: 'Manufacturer Authorization Letter (MAF)', title_bn: 'প্রস্তুতকারকের অনুমোদনপত্র (MAF)', mandatory: false, has_expiry: true },
      { id: 'R07', order: 7, title_en: 'Technical Proposal & Datasheets', title_bn: 'কারিগরি প্রস্তাবনা ও স্পেসিফিকেশন বিবরণী', mandatory: true, has_expiry: false },
      { id: 'R08', order: 8, title_en: 'Tender Submission Letter & Financial Offer', title_bn: 'দরপত্র দাখিলপত্র ও আর্থিক প্রস্তাবনা', mandatory: true, has_expiry: false },
      { id: 'R09', order: 9, title_en: 'Power of Attorney for Signatory', title_bn: 'ক্ষমতাপ্রাপ্ত প্রতিনিধির আমমোক্তারনামা', mandatory: false, has_expiry: false }
    ];

    const sampleFiles = [
      { file: 'sample_pack/documents/01_trade_license_expired.pdf', name: '01_trade_license_expired.pdf' },
      { file: 'sample_pack/documents/01_trade_license_valid_2027.pdf', name: '01_trade_license_valid_2027.pdf' },
      { file: 'sample_pack/documents/02_tin_certificate.pdf', name: '02_tin_certificate.pdf' },
      { file: 'sample_pack/documents/03_vat_bin_certificate.pdf', name: '03_vat_bin_certificate.pdf' },
      { file: 'sample_pack/documents/03_vat_bin_copy_duplicate.pdf', name: '03_vat_bin_copy_duplicate.pdf' },
      { file: 'sample_pack/documents/04_bank_solvency_letter.pdf', name: '04_bank_solvency_letter.pdf' },
      { file: 'sample_pack/documents/05_experience_certificate.pdf', name: '05_experience_certificate.pdf' },
      { file: 'sample_pack/documents/06_maf_cisco_dell.pdf', name: '06_maf_cisco_dell.pdf' },
      { file: 'sample_pack/documents/07_technical_proposal.pdf', name: '07_technical_proposal.pdf' },
      { file: 'sample_pack/documents/08_financial_proposal_and_letter.pdf', name: '08_financial_proposal_and_letter.pdf' },
      { file: 'sample_pack/documents/09_power_of_attorney.pdf', name: '09_power_of_attorney.pdf' },
      { file: 'sample_pack/documents/10_unrelated_office_lunch_menu.pdf', name: '10_unrelated_office_lunch_menu.pdf' }
    ];

    this.uploadedFiles = [];
    this.reqToDocMap.clear();
    this.docToReqMap.clear();
    this.reqExpiryDates.clear();

    for (const item of sampleFiles) {
      try {
        const resp = await fetch(item.file);
        const buf = await resp.arrayBuffer();
        const docObj = await PDFService.processPDFFile(buf, item.name);
        this.uploadedFiles.push(docObj);
      } catch (e) {
        console.warn('Sample fetch fallback:', item.file, e);
      }
    }

    const findDoc = name => this.uploadedFiles.find(d => d.name === name);

    if (scenarioType === 'defects') {
      const docR01 = findDoc('01_trade_license_expired.pdf');
      if (docR01) {
        this.reqToDocMap.set('R01', docR01.id);
        this.docToReqMap.set(docR01.id, 'R01');
        this.reqExpiryDates.set('R01', '2026-06-30');
      }
      const docR02 = findDoc('02_tin_certificate.pdf');
      if (docR02) {
        this.reqToDocMap.set('R02', docR02.id);
        this.docToReqMap.set(docR02.id, 'R02');
      }
      const docR03 = findDoc('03_vat_bin_certificate.pdf');
      if (docR03) {
        this.reqToDocMap.set('R03', docR03.id);
        this.docToReqMap.set(docR03.id, 'R03');
      }
      const docR06 = findDoc('06_maf_cisco_dell.pdf');
      if (docR06) {
        this.reqToDocMap.set('R06', docR06.id);
        this.docToReqMap.set(docR06.id, 'R06');
      }
      const docR07 = findDoc('07_technical_proposal.pdf');
      if (docR07) {
        this.reqToDocMap.set('R07', docR07.id);
        this.docToReqMap.set(docR07.id, 'R07');
      }
      const docR08 = findDoc('08_financial_proposal_and_letter.pdf');
      if (docR08) {
        this.reqToDocMap.set('R08', docR08.id);
        this.docToReqMap.set(docR08.id, 'R08');
      }
      this.showToast('Loaded defect demo with real-life compliance issues.', 'warning');
    } else if (scenarioType === 'perfect') {
      const validPairs = [
        { req: 'R01', file: '01_trade_license_valid_2027.pdf', exp: '2027-06-30' },
        { req: 'R02', file: '02_tin_certificate.pdf' },
        { req: 'R03', file: '03_vat_bin_certificate.pdf' },
        { req: 'R04', file: '04_bank_solvency_letter.pdf', exp: '2026-12-31' },
        { req: 'R05', file: '05_experience_certificate.pdf' },
        { req: 'R06', file: '06_maf_cisco_dell.pdf', exp: '2027-01-15' },
        { req: 'R07', file: '07_technical_proposal.pdf' },
        { req: 'R08', file: '08_financial_proposal_and_letter.pdf' },
        { req: 'R09', file: '09_power_of_attorney.pdf' }
      ];

      for (const pair of validPairs) {
        const doc = findDoc(pair.file);
        if (doc) {
          this.reqToDocMap.set(pair.req, doc.id);
          this.docToReqMap.set(doc.id, pair.req);
          if (pair.exp) this.reqExpiryDates.set(pair.req, pair.exp);
        }
      }
      this.showToast('Loaded 100% verified state ready for generation.', 'success');
    }

    this.hideLoading();
    this.render();
  }

  exportChecklistCsv() {
    const sortedReqs = [...this.requirements].sort((a, b) => (a.order || 0) - (b.order || 0));
    let csvContent = '\uFEFFOrder,Requirement ID,Document Title (EN),Document Title (BN),Type,File Name,Pages,Expiry Date,Status\n';

    for (const req of sortedReqs) {
      const docId = this.reqToDocMap.get(req.id);
      const doc = docId ? this.uploadedFiles.find(d => d.id === docId) : null;
      const expDate = this.reqExpiryDates.get(req.id) || '';
      const statusRes = Validator.evaluateDocumentStatus(req, doc, expDate, this.tender.submission_deadline);

      const titleEn = `"${(req.title_en || '').replace(/"/g, '""')}"`;
      const titleBn = `"${(req.title_bn || '').replace(/"/g, '""')}"`;
      const fileName = doc ? `"${doc.name.replace(/"/g, '""')}"` : '""';
      const pages = doc ? doc.pageCount : 0;
      const exp = expDate ? `"${expDate}"` : (req.has_expiry ? '"Not set"' : '"N/A"');
      const type = req.mandatory ? 'Mandatory' : 'Optional';
      const st = `"${statusRes.status}"`;

      csvContent += `${req.order || ''},${req.id || ''},${titleEn},${titleBn},${type},${fileName},${pages},${exp},${st}\n`;
    }

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${this.tender.tender_id || 'Tender'}_Checklist.csv`;
    a.click();
    this.showToast('Checklist exported as CSV.', 'success');
  }

  exportProjectFile() {
    const projectData = {
      version: '2.0',
      exportedAt: new Date().toISOString(),
      tender: this.tender,
      requirements: this.requirements,
      reqToDocMap: Array.from(this.reqToDocMap.entries()),
      reqExpiryDates: Array.from(this.reqExpiryDates.entries()),
      sealSettings: this.sealSettings
    };

    const blob = new Blob([JSON.stringify(projectData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${this.tender.tender_id || 'Tender'}_Workspace.tenderpack`;
    a.click();
    this.showToast('Project workspace saved as .tenderpack file.', 'success');
  }

  async handleProjectFileUpload(file) {
    if (!file) return;
    try {
      const text = await file.text();
      const data = JSON.parse(text);
      this.restoreProjectFromJson(data);
      this.showToast('Project workspace restored successfully!', 'success');
    } catch (e) {
      this.showToast('Invalid project file: ' + e.message, 'error');
    }
  }

  restoreProjectFromJson(data) {
    if (data.tender) this.tender = data.tender;
    if (Array.isArray(data.requirements)) this.requirements = data.requirements;
    if (Array.isArray(data.reqToDocMap)) this.reqToDocMap = new Map(data.reqToDocMap);
    if (Array.isArray(data.reqExpiryDates)) this.reqExpiryDates = new Map(data.reqExpiryDates);
    if (data.sealSettings) this.sealSettings = data.sealSettings;
    this.render();
  }

  handleSealImageUpload(file) {
    if (!file) return;
    if (!file.type.includes('png')) {
      this.showToast('Please upload a transparent PNG image for the seal.', 'warning');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      this.sealSettings.imageBase64 = e.target.result;
      const previewImg = document.getElementById('seal-preview-img');
      if (previewImg) {
        previewImg.src = e.target.result;
        previewImg.style.display = 'block';
      }
      this.showToast('Seal / Signature PNG loaded.', 'success');
    };
    reader.readAsDataURL(file);
  }

  openAiCopilotModal() {
    document.getElementById('ai-api-key-input').value = AIService.getApiKey();
    this.openModal('modal-ai-copilot');
  }

  saveAiApiKey() {
    const key = document.getElementById('ai-api-key-input').value.trim();
    AIService.setApiKey(key);
    this.showToast('Google Gemini API Key saved locally.', 'success');
  }

  async runAiDocInspection() {
    const { doc, req } = this.previewState;
    if (!doc) return;

    this.showLoading('AI Copilot analyzing document content...');
    try {
      const analysis = await AIService.analyzeDocument(
        doc.name,
        doc.extractedText || '',
        req?.title_en || 'Document',
        this.tender.submission_deadline
      );
      document.getElementById('pdf-extracted-text-preview').textContent = `=== AI COPILOT AUDIT ===\n${analysis}\n\n=== EXTRACTED OCR TEXT ===\n${doc.extractedText}`;
      this.showToast('AI analysis complete.', 'success');
    } catch (e) {
      this.showToast('AI analysis failed: ' + e.message, 'error');
    } finally {
      this.hideLoading();
    }
  }

  async runAiFullAudit() {
    this.showLoading('AI Copilot conducting full tender compliance review...');
    try {
      const summary = {
        tender: this.tender,
        requirements: this.requirements.map(r => {
          const docId = this.reqToDocMap.get(r.id);
          const doc = docId ? this.uploadedFiles.find(d => d.id === docId) : null;
          const exp = this.reqExpiryDates.get(r.id);
          const st = Validator.evaluateDocumentStatus(r, doc, exp, this.tender.submission_deadline);
          return {
            id: r.id,
            order: r.order,
            title: r.title_en,
            mandatory: r.mandatory,
            has_expiry: r.has_expiry,
            status: st.status,
            reason: st.reason,
            file: doc?.name || null
          };
        })
      };

      const result = await AIService.auditTenderDossier(this.tender, summary);
      document.getElementById('ai-audit-output').textContent = result;
      this.showToast('AI Full Audit complete.', 'success');
    } catch (e) {
      this.showToast('AI Audit error: ' + e.message, 'error');
    } finally {
      this.hideLoading();
    }
  }

  /**
   * Main Render Method
   */
  render() {
    this.renderTenderOverview();
    this.renderValidationSummary();
    this.renderUploadedFilesPool();
    this.renderRequirementsChecklist();
    this.autoSaveToLocalStorage();

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  renderTenderOverview() {
    document.getElementById('tender-id-val').textContent = this.tender.tender_id || 'N/A';
    document.getElementById('tender-title-val').textContent = this.tender.title || 'N/A';
    document.getElementById('tender-entity-val').textContent = this.tender.procuring_entity || 'N/A';
    document.getElementById('tender-bidder-val').textContent = this.tender.bidder || 'N/A';
    document.getElementById('tender-deadline-val').textContent = this.tender.submission_deadline || 'N/A';
  }

  renderValidationSummary() {
    const bannerWrap = document.getElementById('readiness-banner-wrap');
    const countsRow = document.getElementById('readiness-counts-row');
    const alertBox = document.getElementById('blocking-issues-box');
    const alertUl = document.getElementById('blocking-issues-ul');
    const genBtn = document.getElementById('btn-generate-package');
    const progressBar = document.getElementById('readiness-progress-fill');
    const progressText = document.getElementById('readiness-pct-text');

    let totalDocs = this.requirements.length;
    let okCount = 0;
    let missingCount = 0;
    let expiredCount = 0;
    let neededCount = 0;
    const blockingIssues = [];

    const sortedReqs = [...this.requirements].sort((a, b) => (a.order || 0) - (b.order || 0));

    for (const req of sortedReqs) {
      const docId = this.reqToDocMap.get(req.id);
      const doc = docId ? this.uploadedFiles.find(d => d.id === docId) : null;
      const expDate = this.reqExpiryDates.get(req.id) || '';
      const st = Validator.evaluateDocumentStatus(req, doc, expDate, this.tender.submission_deadline);

      if (st.status === 'OK') okCount++;
      else if (st.status === 'Missing') missingCount++;
      else if (st.status === 'Expired') expiredCount++;
      else if (st.status === 'Expiry date needed') neededCount++;

      if (st.isBlocking) {
        const title = this.currentLang === 'bn' ? (req.title_bn || req.title_en) : req.title_en;
        blockingIssues.push(`[#${req.order} ${title}]: ${st.status} — ${st.reason}`);
      }
    }

    const isReady = blockingIssues.length === 0 && totalDocs > 0;
    const progressPct = totalDocs > 0 ? Math.round((okCount / totalDocs) * 100) : 0;

    if (progressBar) {
      progressBar.style.width = `${progressPct}%`;
      progressBar.className = 'readiness-progress-bar';
      if (isReady) progressBar.classList.add('progress-complete');
      else if (blockingIssues.length > 0) progressBar.classList.add('progress-blocked');
    }

    if (progressText) {
      progressText.textContent = `${progressPct}% Ready (${okCount}/${totalDocs} OK)`;
    }

    if (isReady) {
      bannerWrap.innerHTML = `
        <span class="readiness-badge-main badge-ready">
          <i data-lucide="check-circle-2" style="width: 18px; height: 18px;"></i>
          ${this.t('packageReady')}
        </span>
      `;
      if (alertBox) alertBox.style.display = 'none';

      if (genBtn) {
        genBtn.disabled = false;
        genBtn.classList.remove('btn-disabled');
        genBtn.title = this.t('packageReady');
      }
    } else {
      bannerWrap.innerHTML = `
        <span class="readiness-badge-main badge-blocked">
          <i data-lucide="alert-triangle" style="width: 18px; height: 18px;"></i>
          ${this.t('packageBlocked')}
        </span>
      `;

      if (alertBox && alertUl) {
        alertBox.style.display = 'block';
        alertUl.innerHTML = blockingIssues.map(iss => `<li>• ${iss}</li>`).join('');
      }

      if (genBtn) {
        genBtn.disabled = true;
        genBtn.classList.add('btn-disabled');
        genBtn.title = `${this.t('packageBlocked')} (${blockingIssues.length} issues)`;
      }
    }

    countsRow.innerHTML = `
      <span class="count-pill" style="background: var(--bg-card); border: 1px solid var(--border-light);">
        ${this.t('totalDocs')}: <strong>${totalDocs}</strong>
      </span>
      <span class="count-pill count-pill-ok">
        ✓ OK: <strong>${okCount}</strong>
      </span>
      ${missingCount > 0 ? `
        <span class="count-pill count-pill-err">
          ✗ Missing: <strong>${missingCount}</strong>
        </span>
      ` : ''}
      ${expiredCount > 0 ? `
        <span class="count-pill count-pill-err">
          ◷ Expired: <strong>${expiredCount}</strong>
        </span>
      ` : ''}
      ${neededCount > 0 ? `
        <span class="count-pill count-pill-warn">
          ⚠ Date Needed: <strong>${neededCount}</strong>
        </span>
      ` : ''}
    `;
  }

  renderUploadedFilesPool() {
    const container = document.getElementById('uploaded-files-container');
    const countEl = document.getElementById('uploaded-files-count');
    const searchInput = document.getElementById('filter-uploaded-files');
    const query = (searchInput?.value || '').trim().toLowerCase();

    if (!container) return;

    countEl.textContent = `${this.uploadedFiles.length} files`;

    if (this.uploadedFiles.length === 0) {
      container.innerHTML = `
        <div style="padding: 16px; text-align: center; color: var(--text-muted); font-size: 0.78rem;">
          ${this.t('noFilesUploaded')}
        </div>
      `;
      return;
    }

    const { duplicateIds, duplicateMap } = Validator.detectDuplicates(this.uploadedFiles);

    const filteredFiles = query
      ? this.uploadedFiles.filter(d => d.name.toLowerCase().includes(query))
      : this.uploadedFiles;

    if (filteredFiles.length === 0) {
      container.innerHTML = `
        <div style="padding: 16px; text-align: center; color: var(--text-muted); font-size: 0.78rem;">
          No matching files found for "${query}".
        </div>
      `;
      return;
    }

    container.innerHTML = filteredFiles.map(doc => {
      const isMatched = this.docToReqMap.has(doc.id);
      const matchedReqId = this.docToReqMap.get(doc.id);
      const matchedReq = matchedReqId ? this.requirements.find(r => r.id === matchedReqId) : null;
      const isDuplicate = duplicateIds.has(doc.id);
      const origDoc = isDuplicate ? duplicateMap.get(doc.id) : null;

      const titleKey = this.currentLang === 'bn' ? 'title_bn' : 'title_en';

      return `
        <div class="file-item-card ${isDuplicate ? 'file-item-duplicate' : ''}">
          <i data-lucide="file-text" style="width: 18px; height: 18px; color: var(--blue-accent); flex-shrink: 0;"></i>
          <div class="file-item-info">
            <div class="file-item-name" title="${doc.name}">${doc.name}</div>
            <div class="file-item-meta">
              <span><strong>${doc.pageCount}</strong> ${this.t('pages')}</span>
              <span>•</span>
              <span>${(doc.size / 1024).toFixed(1)} KB</span>
              ${isDuplicate ? `<span class="badge-tag badge-tag-dup">⚠ ${this.t('duplicate')}</span>` : ''}
              ${isMatched ? `
                <span class="badge-tag badge-tag-matched">
                  #${matchedReq?.order} ${matchedReq ? (matchedReq[titleKey] || matchedReq.title_en).substring(0, 16) : matchedReqId}
                </span>
              ` : `
                <span class="badge-tag" style="background: var(--bg-subtle); color: var(--text-muted); border: 1px solid var(--border-light);">
                  ${this.t('unmatched')}
                </span>
              `}
            </div>
          </div>
          <div style="display: flex; gap: 2px;">
            <button class="btn btn-secondary btn-sm btn-icon" onclick="app.openPdfViewer(null, '${doc.id}')" title="${this.t('preview')}">
              <i data-lucide="eye"></i>
            </button>
            <button class="btn btn-danger btn-sm btn-icon" onclick="app.removeUploadedFile('${doc.id}')" title="${this.t('remove')}">
              <i data-lucide="trash-2"></i>
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  renderRequirementsChecklist() {
    const container = document.getElementById('requirements-checklist-container');
    if (!container) return;

    const sortedReqs = [...this.requirements].sort((a, b) => (a.order || 0) - (b.order || 0));

    container.innerHTML = sortedReqs.map(req => {
      const docId = this.reqToDocMap.get(req.id);
      const matchedDoc = docId ? this.uploadedFiles.find(d => d.id === docId) : null;
      const expiryDate = this.reqExpiryDates.get(req.id) || '';

      const statusResult = Validator.evaluateDocumentStatus(req, matchedDoc, expiryDate, this.tender.submission_deadline);

      const docTitle = (this.currentLang === 'bn' && req.title_bn) ? req.title_bn : req.title_en;
      const altTitle = this.currentLang === 'bn' ? req.title_en : req.title_bn;

      let statusBadgeHtml = '';
      let cardStateClass = '';

      if (statusResult.status === 'OK') {
        statusBadgeHtml = `<span class="status-badge-tag badge-status-ok">🟢 ${this.t('statusOK')}</span>`;
        cardStateClass = 'req-item-ok';
      } else if (statusResult.status === 'Not provided') {
        statusBadgeHtml = `<span class="status-badge-tag badge-status-not-provided">⚪ ${this.t('statusNotProvided')}</span>`;
      } else if (statusResult.status === 'Expiry date needed') {
        statusBadgeHtml = `<span class="status-badge-tag badge-status-needed">🟠 ${this.t('statusExpiryNeeded')}</span>`;
        cardStateClass = 'req-item-warning';
      } else if (statusResult.status === 'Expired') {
        statusBadgeHtml = `<span class="status-badge-tag badge-status-expired">🔴 ${this.t('statusExpired')}</span>`;
        cardStateClass = 'req-item-blocked';
      } else {
        statusBadgeHtml = `<span class="status-badge-tag badge-status-missing">🔴 ${this.t('statusMissing')}</span>`;
        cardStateClass = 'req-item-blocked';
      }

      const fileOptions = this.uploadedFiles.map(d => {
        const isMatchedElsewhere = this.docToReqMap.has(d.id) && this.docToReqMap.get(d.id) !== req.id;
        const isSelected = d.id === docId;
        return `<option value="${d.id}" ${isSelected ? 'selected' : ''}>
          ${d.name} (${d.pageCount} pgs) ${isMatchedElsewhere ? '[Matched elsewhere]' : ''}
        </option>`;
      }).join('');

      return `
        <div class="req-item-card ${cardStateClass}">
          <div class="req-order-num">#${req.order}</div>

          <div class="req-title-wrap">
            <div class="req-title-main">${docTitle}</div>
            ${altTitle ? `<div class="req-title-sub font-bangla">${altTitle}</div>` : ''}
            <div style="display: flex; gap: 4px; margin-top: 2px;">
              <span class="req-type-pill ${req.mandatory ? 'req-type-mandatory' : 'req-type-optional'}">
                ${req.mandatory ? this.t('mandatory') : this.t('optional')}
              </span>
              ${req.has_expiry ? `<span class="req-type-pill" style="background: var(--color-warning-bg); color: var(--color-warning); border: 1px solid var(--color-warning-border);">${this.t('hasExpiry')}</span>` : ''}
            </div>
          </div>

          <div>
            <select class="select-pdf-match" onchange="app.matchFileToRequirement('${req.id}', this.value)">
              <option value="">-- ${this.t('selectFile')} --</option>
              ${fileOptions}
            </select>
            ${matchedDoc ? `
              <div style="display: flex; gap: 4px; margin-top: 4px;">
                <button class="btn btn-secondary btn-sm" onclick="app.openPdfViewer('${req.id}')" style="padding: 2px 6px; font-size: 0.7rem;">
                  <i data-lucide="eye" style="width: 12px; height: 12px;"></i> ${this.t('preview')}
                </button>
                <button class="btn btn-danger btn-sm" onclick="app.matchFileToRequirement('${req.id}', '')" style="padding: 2px 6px; font-size: 0.7rem;">
                  <i data-lucide="x" style="width: 12px; height: 12px;"></i>
                </button>
              </div>
            ` : ''}
          </div>

          <div>
            ${req.has_expiry ? `
              <input 
                type="date" 
                class="input-expiry" 
                value="${expiryDate}" 
                ${!matchedDoc ? 'disabled' : ''}
                onchange="app.setRequirementExpiryDate('${req.id}', this.value)"
              >
            ` : '<span style="color: var(--text-subtle); font-size: 0.75rem; text-align: center; display: block;">—</span>'}
          </div>

          <div style="display: flex; flex-direction: column; align-items: flex-end;">
            ${statusBadgeHtml}
            ${statusResult.isBlocking ? `
              <span style="font-size: 0.65rem; color: var(--color-error); margin-top: 2px; text-align: right;">${statusResult.status}</span>
            ` : ''}
          </div>
        </div>
      `;
    }).join('');
  }

  async generateFinalPackage() {
    this.showLoading('Compiling verified PDF submission package (Cover + Index + Documents + Footers)...');

    try {
      const matchedMap = new Map();
      for (const [reqId, docId] of this.reqToDocMap.entries()) {
        const doc = this.uploadedFiles.find(d => d.id === docId);
        if (doc) matchedMap.set(reqId, doc);
      }

      const packageResult = await PDFService.generateCompleteTenderPackage(
        this.tender,
        this.requirements,
        matchedMap,
        this.reqExpiryDates,
        {
          sealImageBase64: this.sealSettings.imageBase64,
          sealPlacement: this.sealSettings.placement,
          sealScale: this.sealSettings.scale
        }
      );

      const safeId = (this.tender.tender_id || 'Tender').replace(/[^a-zA-Z0-9-_]/g, '_');
      const filename = `${safeId}_Package.pdf`;
      const url = URL.createObjectURL(packageResult.blob);

      document.getElementById('result-total-pages').textContent = `${packageResult.totalPages} Pages`;
      document.getElementById('result-total-docs').textContent = `${packageResult.itemCount} Included Documents`;
      document.getElementById('result-file-size').textContent = `${(packageResult.bytes.byteLength / (1024 * 1024)).toFixed(2)} MB`;

      const dlBtn = document.getElementById('btn-download-pdf-pkg');
      dlBtn.onclick = () => {
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
      };

      const resCanvas = document.getElementById('result-preview-canvas');
      if (resCanvas) {
        await PDFService.renderPageToCanvas(packageResult.bytes.buffer, 1, resCanvas, 0.85);
      }

      this.openModal('modal-package-result');
      this.showToast('Package generated successfully!', 'success');
    } catch (err) {
      console.error('Package generation error:', err);
      this.showToast('Failed to generate package: ' + err.message, 'error');
    } finally {
      this.hideLoading();
    }
  }

  async openPdfViewer(reqId, docId = null) {
    let doc = null;
    let req = null;

    if (reqId) {
      req = this.requirements.find(r => r.id === reqId);
      const attachedDocId = this.reqToDocMap.get(reqId);
      doc = this.uploadedFiles.find(d => d.id === attachedDocId);
    } else if (docId) {
      doc = this.uploadedFiles.find(d => d.id === docId);
    }

    if (!doc) {
      this.showToast('No document file to preview.', 'warning');
      return;
    }

    this.previewState = {
      doc,
      req,
      currentPage: 1,
      totalPages: doc.pageCount || 1,
      scale: 1.2
    };

    document.getElementById('pdf-modal-title').textContent = doc.name;
    document.getElementById('pdf-modal-req-info').textContent = req ? `Requirement: #${req.order} - ${req.title_en}` : 'Unmatched Pool File';

    const expiryInput = document.getElementById('manual-expiry-input');
    const existingExp = req ? (this.reqExpiryDates.get(req.id) || '') : (doc.expiryDate || '');
    expiryInput.value = existingExp;

    document.getElementById('pdf-extracted-text-preview').textContent = doc.extractedText || (doc.errorMessage ? `⚠️ ${doc.errorMessage}` : 'No text content extracted.');

    this.openModal('modal-pdf-viewer');
    await this.renderCurrentPdfPage();
  }

  async renderCurrentPdfPage() {
    const { doc, currentPage, scale } = this.previewState;
    if (!doc || !doc.buffer) return;

    const canvas = document.getElementById('pdf-render-canvas');
    document.getElementById('pdf-page-indicator').textContent = `Page ${currentPage} of ${this.previewState.totalPages}`;

    try {
      await PDFService.renderPageToCanvas(doc.buffer, currentPage, canvas, scale);
    } catch (e) {
      console.error(e);
    }
  }

  async changePreviewPage(delta) {
    const next = this.previewState.currentPage + delta;
    if (next >= 1 && next <= this.previewState.totalPages) {
      this.previewState.currentPage = next;
      await this.renderCurrentPdfPage();
    }
  }

  async changePreviewZoom(delta) {
    this.previewState.scale = Math.max(0.6, Math.min(3.0, this.previewState.scale + delta));
    await this.renderCurrentPdfPage();
  }

  saveManualExpiryFromModal() {
    const { req } = this.previewState;
    const inputVal = document.getElementById('manual-expiry-input').value.trim();
    if (req) {
      this.setRequirementExpiryDate(req.id, inputVal);
      this.showToast('Expiry date updated for ' + req.title_en, 'success');
    }
    this.closeModal('modal-pdf-viewer');
  }

  openTenderEditModal() {
    document.getElementById('edit-tender-id').value = this.tender.tender_id || '';
    document.getElementById('edit-tender-title').value = this.tender.title || '';
    document.getElementById('edit-tender-entity').value = this.tender.procuring_entity || '';
    document.getElementById('edit-tender-bidder').value = this.tender.bidder || '';
    document.getElementById('edit-tender-deadline').value = this.tender.submission_deadline || '';
    this.openModal('modal-edit-tender');
  }

  saveTenderMetadata() {
    this.tender.tender_id = document.getElementById('edit-tender-id').value.trim();
    this.tender.title = document.getElementById('edit-tender-title').value.trim();
    this.tender.procuring_entity = document.getElementById('edit-tender-entity').value.trim();
    this.tender.bidder = document.getElementById('edit-tender-bidder').value.trim();
    this.tender.submission_deadline = document.getElementById('edit-tender-deadline').value.trim();
    this.closeModal('modal-edit-tender');
    this.render();
    this.showToast('Tender details updated.', 'success');
  }
}

window.app = new TenderApp();

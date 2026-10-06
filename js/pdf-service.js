/**
 * PDF Service: Section 6 Compliant Package Builder
 * Features:
 * - Page 1: English Cover Page
 * - Page 2: Dedicated Index / Table of Contents Page (with Bengali & English text rendering)
 * - Pages 3+: Ordered documents with all pages
 * - Running footer: <tender_id> | Page X of Y on every page
 * - PNG Seal / Signature placement on chosen pages
 * - Safe handling of damaged / password-protected PDFs
 */

const PDFService = {
  pdfjsLib: null,
  pdfLib: null,

  init() {
    if (window.pdfjsLib) {
      this.pdfjsLib = window.pdfjsLib;
      if (this.pdfjsLib.GlobalWorkerOptions) {
        this.pdfjsLib.GlobalWorkerOptions.workerSrc = 'assets/vendor/pdf.worker.min.js';
      }
    }
    if (window.PDFLib) {
      this.pdfLib = window.PDFLib;
    }
  },

  /**
   * Helper: Render text (including Bangla text) onto a temporary canvas and return PNG data URL
   */
  async renderTextToPng(text, options = {}) {
    const fontSize = options.fontSize || 16;
    const color = options.color || '#111827';
    const fontFamily = options.fontFamily || "'Hind Siliguri', 'Noto Sans Bengali', sans-serif";
    const width = options.width || 400;
    const height = options.height || 30;

    const canvas = document.createElement('canvas');
    const scale = 2; // High-res
    canvas.width = width * scale;
    canvas.height = height * scale;
    const ctx = canvas.getContext('2d');
    ctx.scale(scale, scale);

    ctx.font = `${options.isBold ? 'bold ' : ''}${fontSize}px ${fontFamily}`;
    ctx.fillStyle = color;
    ctx.textBaseline = 'middle';
    ctx.fillText(text, 0, height / 2);

    return canvas.toDataURL('image/png');
  },

  /**
   * Safely process a PDF file. Handles damaged, encrypted, or password-protected files gracefully.
   */
  async processPDFFile(fileOrBuffer, filename = 'document.pdf') {
    let arrayBuffer;
    if (fileOrBuffer instanceof File || fileOrBuffer instanceof Blob) {
      arrayBuffer = await fileOrBuffer.arrayBuffer();
    } else {
      arrayBuffer = fileOrBuffer;
    }

    const hash = await Validator.computeFileHash(arrayBuffer);
    let pageCount = 1;
    let extractedText = '';
    let isEncrypted = false;
    let isDamaged = false;
    let errorMessage = null;

    try {
      if (this.pdfjsLib) {
        const loadingTask = this.pdfjsLib.getDocument({
          data: arrayBuffer.slice(0),
          password: '' // try empty
        });

        // Handle password protected PDFs
        loadingTask.onPassword = (callback, reason) => {
          isEncrypted = true;
          errorMessage = 'PDF is password protected.';
          callback(''); // abort
        };

        const pdfDoc = await loadingTask.promise;
        pageCount = pdfDoc.numPages;

        const maxPagesToExtract = Math.min(pageCount, 5);
        for (let pageNum = 1; pageNum <= maxPagesToExtract; pageNum++) {
          try {
            const page = await pdfDoc.getPage(pageNum);
            const textContent = await page.getTextContent();
            const pageStr = textContent.items.map(item => item.str).join(' ');
            extractedText += ` [P${pageNum}]: ` + pageStr;
          } catch (pe) {
            console.warn(`Error reading page ${pageNum} in ${filename}:`, pe);
          }
        }
      }
    } catch (err) {
      console.warn(`Handled bad PDF safely for ${filename}:`, err);
      if (err.name === 'PasswordException' || isEncrypted) {
        isEncrypted = true;
        errorMessage = 'Password protected PDF. Please remove password encryption before submitting.';
      } else {
        isDamaged = true;
        errorMessage = 'Damaged or corrupted PDF file. Please re-upload a valid PDF.';
      }
      pageCount = 0;
    }

    const detectedExpiry = Validator.extractExpiryDateFromText(extractedText);

    return {
      id: 'doc_' + Math.random().toString(36).substring(2, 9),
      name: filename,
      size: arrayBuffer.byteLength,
      pageCount,
      extractedText,
      expiryDate: detectedExpiry,
      manualExpiryDate: null,
      hash,
      isEncrypted,
      isDamaged,
      errorMessage,
      buffer: arrayBuffer
    };
  },

  /**
   * Render PDF page onto Canvas for live preview
   */
  async renderPageToCanvas(arrayBuffer, pageNumber, canvas, scale = 1.3) {
    if (!this.pdfjsLib) return;

    try {
      const loadingTask = this.pdfjsLib.getDocument({ data: arrayBuffer.slice(0) });
      const pdfDoc = await loadingTask.promise;
      const page = await pdfDoc.getPage(pageNumber);

      const viewport = page.getViewport({ scale });
      const context = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderContext = {
        canvasContext: context,
        viewport: viewport
      };

      await page.render(renderContext).promise;
      return { numPages: pdfDoc.numPages };
    } catch (err) {
      console.error('Canvas render error:', err);
    }
  },

  /**
   * Generate Full Submission Package (Cover + Index Page + Ordered Documents + Footers + Seal/Signature)
   */
  async generateCompleteTenderPackage(tenderData, sortedRequirements, matchedDocsMap, expiryDatesMap, options = {}) {
    if (!window.PDFLib) {
      throw new Error('PDFLib is not loaded');
    }

    const { PDFDocument, rgb, StandardFonts } = window.PDFLib;
    const mergedPdf = await PDFDocument.create();

    const fontRegular = await mergedPdf.embedFont(StandardFonts.Helvetica);
    const fontBold = await mergedPdf.embedFont(StandardFonts.HelveticaBold);

    // Color definitions
    const primaryColor = rgb(0.08, 0.25, 0.45);
    const darkSlate = rgb(0.12, 0.16, 0.22);
    const textGray = rgb(0.40, 0.45, 0.52);
    const lightBg = rgb(0.96, 0.97, 0.98);
    const lineBorder = rgb(0.80, 0.84, 0.88);
    const emeraldColor = rgb(0.06, 0.65, 0.42);

    // 1. Collect included documents in exact order
    const includedItems = [];
    const orderedReqs = [...sortedRequirements].sort((a, b) => (a.order || 0) - (b.order || 0));

    for (const req of orderedReqs) {
      const doc = matchedDocsMap.get(req.id);
      if (doc && doc.buffer && !doc.isDamaged && !doc.isEncrypted) {
        includedItems.push({
          req,
          doc,
          expiryDate: expiryDatesMap.get(req.id) || doc.manualExpiryDate || doc.expiryDate || 'N/A',
          pageStart: 0,
          pageEnd: 0
        });
      }
    }

    if (includedItems.length === 0) {
      throw new Error('No valid matched documents to include in package.');
    }

    // 2. Pre-calculate page counts to determine exact page numbers
    const docPageCounts = [];
    for (const item of includedItems) {
      try {
        const srcDoc = await PDFDocument.load(item.doc.buffer, { ignoreEncryption: true });
        docPageCounts.push(srcDoc.getPageCount());
      } catch (e) {
        docPageCounts.push(item.doc.pageCount || 1);
      }
    }

    // Structure:
    // Page 1: Cover Page
    // Page 2: Dedicated Index / Table of Contents Page
    // Pages 3+: Included Documents
    const coverPageCount = 1;
    const indexPageCount = 1;
    let currentStartPage = coverPageCount + indexPageCount + 1; // starts at Page 3

    for (let i = 0; i < includedItems.length; i++) {
      const pCount = docPageCounts[i];
      includedItems[i].pageStart = currentStartPage;
      includedItems[i].pageEnd = currentStartPage + pCount - 1;
      currentStartPage += pCount;
    }

    const totalPagesY = currentStartPage - 1;
    const todayStr = new Date().toISOString().split('T')[0];

    // ==========================================
    // 6.1 PAGE 1: COVER PAGE (IN ENGLISH)
    // ==========================================
    const coverPage = mergedPdf.addPage([595.28, 841.89]);
    const { width: coverW, height: coverH } = coverPage.getSize();

    // Top Header Banner
    coverPage.drawRectangle({
      x: 0,
      y: coverH - 120,
      width: coverW,
      height: 120,
      color: primaryColor
    });

    coverPage.drawText('TENDER SUBMISSION PACKAGE', {
      x: 40,
      y: coverH - 55,
      size: 22,
      font: fontBold,
      color: rgb(1, 1, 1)
    });

    coverPage.drawText('OFFICIAL TENDER DOSSIER & SUBMISSION BUNDLE', {
      x: 40,
      y: coverH - 80,
      size: 10,
      font: fontRegular,
      color: rgb(0.85, 0.92, 1)
    });

    // Metadata Card
    coverPage.drawRectangle({
      x: 40,
      y: coverH - 280,
      width: coverW - 80,
      height: 140,
      color: lightBg,
      borderColor: lineBorder,
      borderWidth: 1
    });

    const metaStartY = coverH - 165;
    const rowGap = 22;

    coverPage.drawText('Tender ID:', { x: 55, y: metaStartY, size: 9.5, font: fontBold, color: textGray });
    coverPage.drawText(tenderData.tender_id || 'N/A', { x: 150, y: metaStartY, size: 10, font: fontBold, color: primaryColor });

    coverPage.drawText('Package Date:', { x: 350, y: metaStartY, size: 9.5, font: fontBold, color: textGray });
    coverPage.drawText(todayStr, { x: 440, y: metaStartY, size: 10, font: fontBold, color: darkSlate });

    coverPage.drawText('Tender Title:', { x: 55, y: metaStartY - rowGap, size: 9.5, font: fontBold, color: textGray });
    const safeTitle = (tenderData.title || 'N/A').substring(0, 60);
    coverPage.drawText(safeTitle, { x: 150, y: metaStartY - rowGap, size: 9.5, font: fontBold, color: darkSlate });

    coverPage.drawText('Procuring Entity:', { x: 55, y: metaStartY - rowGap * 2, size: 9.5, font: fontBold, color: textGray });
    const safeEntity = (tenderData.procuring_entity || 'N/A').substring(0, 50);
    coverPage.drawText(safeEntity, { x: 150, y: metaStartY - rowGap * 2, size: 9.5, font: fontRegular, color: darkSlate });

    coverPage.drawText('Bidder Name:', { x: 55, y: metaStartY - rowGap * 3, size: 9.5, font: fontBold, color: textGray });
    const safeBidder = (tenderData.bidder || 'N/A').substring(0, 50);
    coverPage.drawText(safeBidder, { x: 150, y: metaStartY - rowGap * 3, size: 10, font: fontBold, color: darkSlate });

    coverPage.drawText('Submission Deadline:', { x: 55, y: metaStartY - rowGap * 4, size: 9.5, font: fontBold, color: textGray });
    coverPage.drawText(tenderData.submission_deadline || 'N/A', { x: 180, y: metaStartY - rowGap * 4, size: 10, font: fontBold, color: rgb(0.85, 0.4, 0) });

    // Brief document summary on Cover
    coverPage.drawText('ENCLOSED DOCUMENTS SUMMARY', {
      x: 40,
      y: coverH - 315,
      size: 11,
      font: fontBold,
      color: primaryColor
    });

    let summaryY = coverH - 340;
    for (let i = 0; i < includedItems.length; i++) {
      const itm = includedItems[i];
      coverPage.drawText(`${itm.req.order || i+1}. ${itm.req.title_en} (${itm.doc.name})`, {
        x: 50,
        y: summaryY,
        size: 9,
        font: fontRegular,
        color: darkSlate
      });
      coverPage.drawText(`Starts on Page ${itm.pageStart}`, {
        x: coverW - 140,
        y: summaryY,
        size: 9,
        font: fontBold,
        color: primaryColor
      });
      summaryY -= 20;
    }

    // Cover Page Footer (<tender_id> | Page 1 of Y)
    coverPage.drawText(`${tenderData.tender_id || 'Tender'} | Page 1 of ${totalPagesY}`, {
      x: 40,
      y: 20,
      size: 8.5,
      font: fontBold,
      color: textGray
    });

    // ==========================================
    // PAGE 2: DEDICATED INDEX / TABLE OF CONTENTS PAGE
    // (Shows exact starting page number where each document starts + Bangla/English titles)
    // ==========================================
    const indexPage = mergedPdf.addPage([595.28, 841.89]);
    const { width: idxW, height: idxH } = indexPage.getSize();

    // Index Header
    indexPage.drawRectangle({
      x: 40,
      y: idxH - 85,
      width: idxW - 80,
      height: 45,
      color: primaryColor
    });

    indexPage.drawText('DOCUMENT INDEX & STARTING PAGE DIRECTORY', {
      x: 55,
      y: idxH - 60,
      size: 14,
      font: fontBold,
      color: rgb(1, 1, 1)
    });

    // Table Header
    const idxTableTop = idxH - 110;
    indexPage.drawRectangle({
      x: 40,
      y: idxTableTop - 20,
      width: idxW - 80,
      height: 24,
      color: rgb(0.90, 0.93, 0.96)
    });

    indexPage.drawText('Order', { x: 50, y: idxTableTop - 12, size: 8.5, font: fontBold, color: textGray });
    indexPage.drawText('Document Title (English / Bangla)', { x: 95, y: idxTableTop - 12, size: 8.5, font: fontBold, color: textGray });
    indexPage.drawText('Attached File', { x: 290, y: idxTableTop - 12, size: 8.5, font: fontBold, color: textGray });
    indexPage.drawText('Validity', { x: 415, y: idxTableTop - 12, size: 8.5, font: fontBold, color: textGray });
    indexPage.drawText('Starts At', { x: 490, y: idxTableTop - 12, size: 8.5, font: fontBold, color: textGray });

    let idxRowY = idxTableTop - 42;
    for (let i = 0; i < includedItems.length; i++) {
      const item = includedItems[i];
      const isAlt = i % 2 === 1;

      if (isAlt) {
        indexPage.drawRectangle({
          x: 40,
          y: idxRowY - 8,
          width: idxW - 80,
          height: 28,
          color: rgb(0.98, 0.98, 0.99)
        });
      }

      indexPage.drawText(String(item.req.order || (i + 1)), { x: 55, y: idxRowY + 4, size: 9, font: fontBold, color: textGray });

      // English Title
      const titleEn = (item.req.title_en || 'Document').substring(0, 30);
      indexPage.drawText(titleEn, { x: 95, y: idxRowY + 5, size: 8.5, font: fontBold, color: darkSlate });

      // Bengali Title rendered cleanly
      if (item.req.title_bn) {
        try {
          const bnPngData = await this.renderTextToPng(item.req.title_bn, { fontSize: 10, color: '#475569', width: 180, height: 16 });
          const bnImage = await mergedPdf.embedPng(bnPngData);
          indexPage.drawImage(bnImage, {
            x: 95,
            y: idxRowY - 7,
            width: 130,
            height: 11
          });
        } catch (be) {
          // fallback
        }
      }

      // Filename
      const fileClean = (item.doc.name || 'document.pdf').substring(0, 20);
      indexPage.drawText(fileClean, { x: 290, y: idxRowY + 4, size: 8, font: fontRegular, color: textGray });

      // Validity / Expiry
      const expStr = item.req.has_expiry ? (item.expiryDate || 'N/A') : 'Permanent';
      indexPage.drawText(expStr, { x: 415, y: idxRowY + 4, size: 8, font: fontRegular, color: darkSlate });

      // Starting Page Number Badge
      indexPage.drawRectangle({
        x: 488,
        y: idxRowY - 4,
        width: 54,
        height: 18,
        color: rgb(0.88, 0.94, 1),
        borderColor: rgb(0.6, 0.8, 1),
        borderWidth: 1
      });

      const pageRangeStr = `Page ${item.pageStart}`;
      indexPage.drawText(pageRangeStr, { x: 494, y: idxRowY + 2, size: 8.5, font: fontBold, color: primaryColor });

      idxRowY -= 32;
    }

    // Index Page Footer: <tender_id> | Page 2 of Y
    indexPage.drawText(`${tenderData.tender_id || 'Tender'} | Page 2 of ${totalPagesY}`, {
      x: 40,
      y: 20,
      size: 8.5,
      font: fontBold,
      color: textGray
    });

    // Optional Seal/Signature Image Embedding
    let sealImage = null;
    if (options.sealImageBase64) {
      try {
        sealImage = await mergedPdf.embedPng(options.sealImageBase64);
      } catch (se) {
        console.warn('Failed to embed seal image:', se);
      }
    }

    // ==========================================
    // PAGES 3+: INCLUDED DOCUMENTS (IN ORDER) + FOOTER & SEALS
    // ==========================================
    let currentPageNum = 3;

    for (let i = 0; i < includedItems.length; i++) {
      const item = includedItems[i];
      try {
        const srcDoc = await PDFDocument.load(item.doc.buffer, { ignoreEncryption: true });
        const copiedPages = await mergedPdf.copyPages(srcDoc, srcDoc.getPageIndices());

        for (let pIdx = 0; pIdx < copiedPages.length; pIdx++) {
          const page = copiedPages[pIdx];
          const { width: pWidth, height: pHeight } = page.getSize();

          // 6.3 & 6.4 Footer: <tender_id> | Page X of Y
          const footerString = `${tenderData.tender_id || 'Tender'} | Page ${currentPageNum} of ${totalPagesY}`;

          // High contrast clean background band for footer
          page.drawRectangle({
            x: 25,
            y: 8,
            width: pWidth - 50,
            height: 18,
            color: rgb(1, 1, 1),
            opacity: 0.88
          });

          page.drawText(footerString, {
            x: 35,
            y: 13,
            size: 8.5,
            font: fontBold,
            color: darkSlate
          });

          // Seal/Signature placement if configured
          if (sealImage) {
            const shouldStamp =
              options.sealPlacement === 'all' ||
              (options.sealPlacement === 'last_page_each_doc' && pIdx === copiedPages.length - 1) ||
              (options.sealPlacement === 'first_page_each_doc' && pIdx === 0);

            if (shouldStamp) {
              const sealDims = sealImage.scale(options.sealScale || 0.35);
              page.drawImage(sealImage, {
                x: pWidth - sealDims.width - 40,
                y: 35,
                width: sealDims.width,
                height: sealDims.height,
                opacity: 0.9
              });
            }
          }

          mergedPdf.addPage(page);
          currentPageNum++;
        }
      } catch (copyErr) {
        console.error(`Error embedding doc ${item.doc.name}:`, copyErr);
      }
    }

    const mergedBytes = await mergedPdf.save();
    return {
      bytes: mergedBytes,
      totalPages: totalPagesY,
      itemCount: includedItems.length,
      blob: new Blob([mergedBytes], { type: 'application/pdf' })
    };
  }
};

window.PDFService = PDFService;

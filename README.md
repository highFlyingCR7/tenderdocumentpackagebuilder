# TenderPack Studio PRO
**Automated Tender Document Compliance & Verified PDF Dossier Compiler**

An enterprise-grade, frontend-only web application designed to help procurement and bidding teams turn disjointed PDF documents into a verified, 100% compliant, and properly sequenced final tender submission PDF dossier.

---

## 🌟 Full Feature Breakdown (AI DevFest Official Problem Statement)

### 1. Core Requirements (Tasks 4.1 – 4.9)
- **Task 4.1: Load the list**: Automatically parses `requirements.json`, displays tender metadata (`tender_id`, `title`, `procuring_entity`, `bidder`, `submission_deadline`), and sorts requirements strictly by `order` ($1, 2, 3 \dots$).
- **Task 4.2: Upload files**: Batch upload multiple PDFs showing filename, page count, and duplicate status. Rejects non-PDF files with clear error feedback. Supports removing files from the pool.
- **Task 4.3: Match files**: Enforces 1:1 match constraint (one document $\le$ 1 file; one file $\le$ 1 document). Allows instant changing and undoing matches.
- **Task 4.4: Enter expiry dates**: Dedicated date input for documents with `has_expiry = true`. Supports auto-detection and manual selection.
- **Task 4.5: Status engine (Section 5)**: Real-time status badge evaluation:
  - `Missing`: Mandatory document, no file matched (Blocking: YES)
  - `Expiry date needed`: `has_expiry = true`, file matched, but no expiry date (Blocking: YES)
  - `Expired`: Expiry date is before `submission_deadline` (Blocking: YES)
  - `Not provided`: Optional document, no file matched (Blocking: NO)
  - `OK`: File matched, expiry date on or after `submission_deadline` (Blocking: NO)
  - *Same-day rule*: Document expiring on the exact submission deadline day is evaluated as `OK`.
- **Task 4.6: Duplicate detection**: Cryptographic SHA-256 hash calculation (`crypto.subtle.digest`). Flags identical files and blocks matching them to different documents.
- **Task 4.7: Generate package**: Keeps the **Generate Package** button disabled while any blocking issue exists, displaying an itemized blocking checklist. Enables when all issues are resolved.
- **Task 4.8: Download**: Downloads the compiled package with exact filename: `<tender_id>_Package.pdf` (e.g. `T-2026-0417_Package.pdf`).
- **Task 4.9: Bilingual switcher (English / Bangla)**: Complete toggle (`[ EN | বাংলা ]`). Switches document names (`title_en` / `title_bn`), status badges, and all UI text.

---

### 2. Section 6 PDF Compilation Rules
- **6.1 Cover Page (Page 1 in English)**: Displays Tender ID, Title, Procuring Entity, Bidder Name, Submission Deadline, Package Date, and ordered Document Manifest.
- **6.2 Document Sequencing**: Documents follow after the cover in strict numerical `order`, retaining all original pages (omits unmatched optional docs).
- **6.3 & 6.4 Running Footer**: Every single page (including the cover) contains the readable footer: `<tender_id> | Page X of Y` placed in the bottom margin without obstructing content.

---

### 3. Advanced / Bonus Features
- **Dedicated Index Page (Page 2)**: Inserted after the cover page, showing the exact starting page number for each included document, along with both English and Bengali titles.
- **Bangla Text Rendering on PDF**: Bengali characters are rendered crisply onto the PDF Cover and Index pages via high-resolution canvas text embedding.
- **PNG Company Seal & Signature Stamper**: Upload a transparent PNG seal/signature and choose placement (`All Pages`, `Last page of each doc`, `First page of each doc`).
- **Export Checklist as Excel / CSV**: Downloads a full `.csv` manifest with UTF-8 BOM encoding for seamless Microsoft Excel compatibility.
- **Save & Reopen Project Workspace**: Save your work as a `.tenderpack` project file or restore it anytime. Background auto-save to browser storage.
- **Auto-Match Engine**: 1-click intelligent heuristic matching of uploaded files to requirements by filename and keywords.
- **Safe Bad File Handling**: Catches damaged or password-protected PDFs gracefully, flagging them with warning badges instead of crashing.
- **AI Tender Compliance Copilot (Rulebook Section 5.5)**: Integrated Google Gemini API assistant for deep document analysis, validation date extraction, and executive compliance audits.

---

## 🛠️ Architecture & Tech Stack

- **Core**: Vanilla HTML5, CSS3, JavaScript (ES6+ Modules).
- **PDF Engine**: `pdf-lib` (v1.17.1) for PDF creation, merging, and stamping; `PDF.js` (v3.11.174) for canvas rendering and OCR text extraction.
- **Archive Ingestion**: `JSZip` (v3.10.1) for client-side ZIP parsing.
- **AI Engine**: Google Gemini API via `AIService` (stores key locally in browser).
- **100% Client-Side**: No backend server required; data stays in local memory.

---

## 🚀 Running Locally

1. Start static server:
   ```bash
   python -m http.server 8080
   ```
2. Open **`http://localhost:8080`** in any modern web browser.

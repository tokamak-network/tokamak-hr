const formState = {
  name: "",
  role: "",
  stage: "screen",
  owner: "",
  risk: "low",
  nextAction: "",
};

const selectors = {
  name: "#candidateName",
  role: "#candidateRole",
  stage: "#candidateStage",
  owner: "#candidateOwner",
  risk: "#candidateRisk",
  nextAction: "#candidateNext",
  addButton: "#addCandidateButton",
  tableBody: "#candidateTable",
  uploadInput: "#resumeInput",
  uploadSelectButton: "#resumeSelectButton",
  dropZone: "#resumeDropZone",
  uploadStatus: "#uploadStatus",
  previewRole: "#previewRole",
  previewClaims: "#previewClaims",
  previewMissing: "#previewMissing",
  previewDebug: "#previewDebug",
  reviewButton: "#reviewSaveButton",
  editForm: "#editForm",
  editTitle: "#editTitle",
  editClear: "#editClearButton",
  editSave: "#editSaveButton",
  editDelete: "#editDeleteButton",
  editModal: "#editModal",
  editModalOverlay: "#editModalOverlay",
  editName: "#editName",
  editRole: "#editRole",
  editStage: "#editStage",
  editRisk: "#editRisk",
  editApplied: "#editApplied",
  editNext: "#editNext",
  editNationality: "#editNationality",
  editEmail: "#editEmail",
  editGithub: "#editGithub",
  editResume: "#editResume",
};

let selectedRow = null;
const storageKey = "hiringIntelligenceCandidates";

const openModal = () => {
  const modal = document.querySelector(selectors.editModal);
  if (modal) {
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
  }
};

const closeModal = () => {
  const modal = document.querySelector(selectors.editModal);
  if (modal) {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
  }
};

if (window.pdfjsLib) {
  window.pdfjsLib.GlobalWorkerOptions.workerSrc =
    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.379/pdf.worker.min.js";
}

const getValue = (selector) => document.querySelector(selector)?.value?.trim() || "";

const updateFormState = () => {
  formState.name = getValue(selectors.name);
  formState.role = getValue(selectors.role);
  formState.stage = document.querySelector(selectors.stage)?.value || "screen";
  formState.owner = getValue(selectors.owner);
  formState.risk = document.querySelector(selectors.risk)?.value || "low";
  formState.nextAction = getValue(selectors.nextAction);
};

const addCandidateRow = ({
  name,
  role,
  stage,
  appliedDate,
  risk,
  nextAction,
  nationality,
  email,
  github,
  resumeUrl,
  id,
}) => {
  const tableBody = document.querySelector(selectors.tableBody);
  if (!tableBody) return;
  const row = document.createElement("tr");
  row.setAttribute("data-candidate", "");
  row.dataset.id = id || createId();
  row.innerHTML = `
    <td><button class="name-link" type="button">${name}</button></td>
    <td>${role}</td>
    <td>${stage}</td>
    <td>${appliedDate || "—"}</td>
    <td><span class="chip ${risk}">${capitalize(risk)}</span></td>
    <td>${nextAction}</td>
    <td>${nationality}</td>
    <td>${email}</td>
    <td>${github ? `<a class="table-link" href="${github}" target="_blank" rel="noopener">${github.replace("https://github.com/", "@")} </a>` : "—"}</td>
    <td>${resumeUrl ? `<a class="table-link" href="${resumeUrl}" target="_blank" rel="noopener">Resume</a>` : "—"}</td>
  `;
  tableBody.prepend(row);
};

const createId = () => {
  if (window.crypto?.randomUUID) return window.crypto.randomUUID();
  return `cand_${Date.now()}_${Math.random().toString(16).slice(2)}`;
};

const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1);

const resetForm = () => {
  document.querySelector(selectors.name).value = "";
  document.querySelector(selectors.role).value = "";
  document.querySelector(selectors.stage).value = "screen";
  document.querySelector(selectors.owner).value = "";
  document.querySelector(selectors.risk).value = "low";
  document.querySelector(selectors.nextAction).value = "";
};

const parseRow = (row) => {
  const cells = row.querySelectorAll("td");
  return {
    id: row.dataset.id || createId(),
    name: cells[0]?.textContent?.trim() || "",
    role: cells[1]?.textContent?.trim() || "",
    stage: cells[2]?.textContent?.trim() || "screen",
    appliedDate: cells[3]?.textContent?.trim() || "",
    risk: cells[4]?.textContent?.trim().toLowerCase() || "low",
    nextAction: cells[5]?.textContent?.trim() || "",
    nationality: cells[6]?.textContent?.trim() || "",
    email: cells[7]?.textContent?.trim() || "",
    github: cells[8]?.querySelector("a")?.getAttribute("href") || "",
    resume: cells[9]?.querySelector("a")?.getAttribute("href") || "",
  };
};

const saveCandidatesFromTable = () => {
  const tableBody = document.querySelector(selectors.tableBody);
  if (!tableBody) return;
  const rows = Array.from(tableBody.querySelectorAll("tr[data-candidate]"));
  const data = rows.map((row) => parseRow(row));
  localStorage.setItem(storageKey, JSON.stringify(data));
};

const renderCandidates = (candidates) => {
  const tableBody = document.querySelector(selectors.tableBody);
  if (!tableBody) return;
  tableBody.innerHTML = "";
  candidates.forEach((candidate) => {
    addCandidateRow({
      id: candidate.id,
      name: candidate.name,
      role: candidate.role,
      stage: candidate.stage,
      appliedDate: candidate.appliedDate,
      risk: candidate.risk,
      nextAction: candidate.nextAction,
      nationality: candidate.nationality,
      email: candidate.email,
      github: candidate.github,
      resumeUrl: candidate.resume,
    });
  });
};

const hydrateCandidates = () => {
  const saved = localStorage.getItem(storageKey);
  if (saved) {
    try {
      const candidates = JSON.parse(saved);
      renderCandidates(candidates);
      return;
    } catch (error) {
      console.warn("Failed to parse saved candidates", error);
    }
  }
  saveCandidatesFromTable();
};

const populateEditForm = (data) => {
  document.querySelector(selectors.editName).value = data.name;
  document.querySelector(selectors.editRole).value = data.role;
  document.querySelector(selectors.editStage).value = data.stage.toLowerCase();
  document.querySelector(selectors.editApplied).value = data.appliedDate
    ? new Date(data.appliedDate).toISOString().slice(0, 10)
    : "";
  document.querySelector(selectors.editRisk).value = data.risk;
  document.querySelector(selectors.editNext).value = data.nextAction;
  document.querySelector(selectors.editNationality).value = data.nationality;
  document.querySelector(selectors.editEmail).value = data.email;
  document.querySelector(selectors.editGithub).value = data.github;
  document.querySelector(selectors.editResume).value = data.resume;
  document.querySelector(selectors.editTitle).textContent = `${data.name} 수정 중`;
};

const clearEditForm = () => {
  selectedRow = null;
  document.querySelector(selectors.editForm).reset();
  document.querySelector(selectors.editTitle).textContent = "선택한 지원자를 수정";
  closeModal();
};

const updateRowFromForm = () => {
  if (!selectedRow) return;
  const cells = selectedRow.querySelectorAll("td");
  const name = document.querySelector(selectors.editName).value.trim();
  const role = document.querySelector(selectors.editRole).value.trim();
  const stage = document.querySelector(selectors.editStage).value;
  const applied = document.querySelector(selectors.editApplied).value;
  const risk = document.querySelector(selectors.editRisk).value;
  const nextAction = document.querySelector(selectors.editNext).value.trim();
  const nationality = document.querySelector(selectors.editNationality).value.trim();
  const email = document.querySelector(selectors.editEmail).value.trim();
  const github = document.querySelector(selectors.editGithub).value.trim();
  const resume = document.querySelector(selectors.editResume).value.trim();

  cells[0].textContent = name || "—";
  cells[1].textContent = role || "—";
  cells[2].textContent = stage;
  cells[3].textContent = applied ? new Date(applied).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }) : "—";
  cells[4].innerHTML = `<span class="chip ${risk}">${capitalize(risk)}</span>`;
  cells[5].textContent = nextAction || "—";
  cells[6].textContent = nationality || "—";
  cells[7].textContent = email || "—";
  cells[8].innerHTML = github
    ? `<a class="table-link" href="${github}" target="_blank" rel="noopener">${github.replace("https://github.com/", "@")} </a>`
    : "—";
  cells[9].innerHTML = resume
    ? `<a class="table-link" href="${resume}" target="_blank" rel="noopener">Resume</a>`
    : "—";
  saveCandidatesFromTable();
  closeModal();
};

const deleteSelectedRow = () => {
  if (!selectedRow) return;
  selectedRow.remove();
  clearEditForm();
  saveCandidatesFromTable();
};

const setupRowSelection = () => {
  const tableBody = document.querySelector(selectors.tableBody);
  if (!tableBody) return;
  tableBody.addEventListener("click", (event) => {
    const nameButton = event.target.closest(".name-link");
    if (!nameButton) return;
    const row = event.target.closest("tr[data-candidate]");
    if (!row) return;
    selectedRow = row;
    const data = parseRow(row);
    populateEditForm(data);
    openModal();
  });
};

const setupEditForm = () => {
  const clearButton = document.querySelector(selectors.editClear);
  const saveButton = document.querySelector(selectors.editSave);
  const deleteButton = document.querySelector(selectors.editDelete);
  const overlay = document.querySelector(selectors.editModalOverlay);
  if (clearButton) clearButton.addEventListener("click", clearEditForm);
  if (saveButton) saveButton.addEventListener("click", updateRowFromForm);
  if (deleteButton) deleteButton.addEventListener("click", deleteSelectedRow);
  if (overlay) overlay.addEventListener("click", closeModal);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeModal();
  });
};

const handleAddCandidate = () => {
  updateFormState();
  if (!formState.name || !formState.role) {
    alert("Name and Role are required.");
    return;
  }

  addCandidateRow({
    name: formState.name,
    role: formState.role,
    stage: formState.stage,
    appliedDate: new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
    risk: formState.risk,
    nextAction: formState.nextAction || "—",
  });
  saveCandidatesFromTable();

  resetForm();
};

const normalizeText = (text) =>
  text
    .replace(/\u00a0/g, " ")
    .replace(/\s+/g, " ")
    .replace(/\s*\n\s*/g, "\n")
    .trim();

const normalizeLine = (line) =>
  line
    .replace(/^#+\s*/, "")
    .replace(/^[-*]\s+/, "")
    .replace(/\s+/g, " ")
    .trim();

const pickName = (lines) => {
  const nameLabel = lines.find((line) => /^name\b/i.test(line));
  if (nameLabel) return nameLabel.replace(/^name\s*[:|-]?/i, "").trim();
  const candidate = lines.find(
    (line) =>
      /^[A-Za-z가-힣][A-Za-z가-힣\s.'-]{1,30}$/.test(line) &&
      !/resume|cv|curriculum|email|phone|github/i.test(line)
  );
  return candidate || "Candidate";
};

const extractRoleFromLine = (line) => {
  const titlePatterns = [
    /(senior|lead|junior|principal|staff)?\s*(software engineer|backend engineer|frontend engineer|full stack engineer|blockchain developer|backend developer|frontend developer|full stack developer|research scientist|product manager|people ops|hr manager|devops engineer|data engineer|qa engineer)/i,
  ];
  for (const pattern of titlePatterns) {
    const match = line.match(pattern);
    if (match) {
      const role = match[0].replace(/\s+/g, " ").trim();
      return role
        .split(/[|,]/)[0]
        .replace(/\s+with\s+.*/i, "")
        .trim();
    }
  }
  return "";
};

const pickRole = (lines) => {
  const header = lines.find((line) => /summary|profile|objective/i.test(line));
  const headerIndex = header ? lines.indexOf(header) : -1;
  const searchPool = headerIndex >= 0 ? lines.slice(headerIndex, headerIndex + 8) : lines;

  for (const line of searchPool) {
    const extracted = extractRoleFromLine(line);
    if (extracted) return extracted;
  }

  for (const line of lines) {
    const extracted = extractRoleFromLine(line);
    if (extracted) return extracted;
  }

  return "Role not detected";
};

const pickClaims = (lines) =>
  lines.filter((line) => /led|built|designed|managed|launched|improved|delivered|optimized/i.test(line));

const extractCountryFromText = (text) => {
  const cityMap = [
    { regex: /\b(delhi|new\s?delhi)\b/i, value: "India" },
    { regex: /\b(ho\s?chi\s?minh|saigon)\b/i, value: "Vietnam" },
    { regex: /\b(hanoi)\b/i, value: "Vietnam" },
    { regex: /\b(tokyo)\b/i, value: "Japan" },
    { regex: /\b(osaka)\b/i, value: "Japan" },
    { regex: /\b(saitama)\b/i, value: "Japan" },
    { regex: /\b(seoul)\b/i, value: "Korea" },
    { regex: /\b(singapore)\b/i, value: "Singapore" },
    { regex: /\b(toronto|vancouver)\b/i, value: "Canada" },
    { regex: /\b(sydney|melbourne)\b/i, value: "Australia" },
    { regex: /\b(london)\b/i, value: "UK" },
    { regex: /\b(paris)\b/i, value: "France" },
    { regex: /\b(berlin)\b/i, value: "Germany" },
  ];
  for (const pattern of cityMap) {
    if (pattern.regex.test(text)) return pattern.value;
  }
  const patterns = [
    { regex: /\b(japan)\b/i, value: "Japan" },
    { regex: /\b(vietnam|viet\s?nam)\b/i, value: "Vietnam" },
    { regex: /\b(south\s?korea|republic of korea|korea)\b/i, value: "Korea" },
    { regex: /\b(united\s?states|u\.s\.|usa)\b/i, value: "USA" },
    { regex: /\b(united\s?kingdom|uk)\b/i, value: "UK" },
    { regex: /\b(canada)\b/i, value: "Canada" },
    { regex: /\b(australia)\b/i, value: "Australia" },
    { regex: /\b(new\s?zealand)\b/i, value: "New Zealand" },
    { regex: /\b(singapore)\b/i, value: "Singapore" },
    { regex: /\b(india)\b/i, value: "India" },
    { regex: /\b(china)\b/i, value: "China" },
    { regex: /\b(taiwan)\b/i, value: "Taiwan" },
    { regex: /\b(hong\s?kong)\b/i, value: "Hong Kong" },
    { regex: /\b(thailand)\b/i, value: "Thailand" },
    { regex: /\b(indonesia)\b/i, value: "Indonesia" },
    { regex: /\b(philippines)\b/i, value: "Philippines" },
    { regex: /\b(malaysia)\b/i, value: "Malaysia" },
    { regex: /\b(germany)\b/i, value: "Germany" },
    { regex: /\b(france)\b/i, value: "France" },
    { regex: /\b(spain)\b/i, value: "Spain" },
    { regex: /\b(italy)\b/i, value: "Italy" },
    { regex: /\b(netherlands)\b/i, value: "Netherlands" },
  ];
  for (const pattern of patterns) {
    if (pattern.regex.test(text)) return pattern.value;
  }
  return "—";
};

const pickNationality = (lines) => {
  const nationalityLine = lines.find((line) => /nationality|citizenship/i.test(line));
  if (!nationalityLine) return "—";
  return nationalityLine.replace(/nationality|citizenship\s*[:|-]?/i, "").trim() || "—";
};

const mockExtractFromText = (rawText) => {
  const text = normalizeText(rawText);
  const lines = rawText
    .split(/\r?\n/)
    .map((line) => normalizeLine(line))
    .filter(Boolean);
  const emailMatch = text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
  const githubMatch = text.match(/https?:\/\/github\.com\/[A-Za-z0-9_-]+/i);
  const githubBareMatch = text.match(/\bgithub\.com\/[A-Za-z0-9_-]+/i);
  const githubHandleMatch = text.match(/\bgithub\s*[:|-]?\s*@?([A-Za-z0-9_-]{2,})/i) || text.match(/@([A-Za-z0-9_-]{2,})/);
  const countryFromText = extractCountryFromText(text);
  const githubInlineMatch = text.match(/github\s*[:|-]?\s*([A-Za-z0-9_-]{2,})/i);
  const languageNationalityMatch = text.match(/\b(vietnamese|japanese|korean|canadian|american|indian|chinese)\b/i);
  const languageToCountry = {
    vietnamese: "Vietnam",
    japanese: "Japan",
    korean: "Korea",
    canadian: "Canada",
    american: "USA",
    indian: "India",
    chinese: "China",
  };

  return {
    name: pickName(lines),
    role: pickRole(lines),
    claims: pickClaims(lines).slice(0, 4),
    email: emailMatch ? emailMatch[0] : "—",
    nationality:
      pickNationality(lines) !== "—"
        ? pickNationality(lines)
        : languageNationalityMatch
        ? languageToCountry[languageNationalityMatch[1].toLowerCase()]
        : countryFromText,
    github: githubMatch
      ? githubMatch[0]
      : githubBareMatch
      ? `https://${githubBareMatch[0]}`
      : githubHandleMatch
      ? `https://github.com/${githubHandleMatch[1]}`
      : githubInlineMatch
      ? `https://github.com/${githubInlineMatch[1]}`
      : "",
  };
};

const updatePreview = ({ name, role, claims }) => {
  const status = document.querySelector(selectors.uploadStatus);
  const previewRole = document.querySelector(selectors.previewRole);
  const previewClaims = document.querySelector(selectors.previewClaims);
  const previewMissing = document.querySelector(selectors.previewMissing);
  const previewDebug = document.querySelector(selectors.previewDebug);

  if (status) status.textContent = `Extracted summary for ${name}`;
  if (previewRole) previewRole.textContent = role;
  if (previewClaims) {
    previewClaims.innerHTML = claims.length
      ? claims.map((claim) => `<li>${claim}</li>`).join("")
      : "<li>No claims detected. Add manually.</li>";
  }
  if (previewMissing) previewMissing.innerHTML = "";
  if (previewDebug) previewDebug.innerHTML = "";
};

const updateMissingFields = (extracted) => {
  const missing = [];
  if (!extracted.name || extracted.name === "Candidate") missing.push("Name not detected");
  if (!extracted.role || extracted.role === "Role not detected") missing.push("Role not detected");
  if (!extracted.email || extracted.email === "—") missing.push("Email not detected");
  if (!extracted.nationality || extracted.nationality === "—") missing.push("Nationality not detected");
  if (!extracted.github) missing.push("GitHub not detected");

  const previewMissing = document.querySelector(selectors.previewMissing);
  if (previewMissing) {
    previewMissing.innerHTML = missing.length
      ? missing.map((item) => `<li class="warning">${item}</li>`).join("")
      : "<li class=\"success\">All key fields detected</li>";
  }
};

const updateDebugInfo = (items) => {
  const previewDebug = document.querySelector(selectors.previewDebug);
  if (!previewDebug) return;
  previewDebug.innerHTML = items.length
    ? items.map((item) => `<li class="debug">${item}</li>`).join("")
    : "";
};

const fillFormFromExtraction = ({ name, role }) => {
  document.querySelector(selectors.name).value = name;
  document.querySelector(selectors.role).value = role;
};

const extractTextFromPdf = async (file) => {
  if (!window.pdfjsLib) return "";
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await window.pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  let fullText = "";
  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum += 1) {
    const page = await pdf.getPage(pageNum);
    const content = await page.getTextContent();
    const strings = content.items.map((item) => item.str);
    fullText += `${strings.join(" ")}\n`;
  }
  return fullText.trim();
};

const renderPdfFirstPage = async (file, scale = 2) => {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await window.pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  const page = await pdf.getPage(1);
  const viewport = page.getViewport({ scale });
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  canvas.width = viewport.width;
  canvas.height = viewport.height;
  await page.render({ canvasContext: context, viewport }).promise;
  return canvas.toDataURL("image/png");
};

const renderPdfPages = async (file, pageCount = 2, scale = 3) => {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await window.pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  const pages = Math.min(pageCount, pdf.numPages);
  const images = [];
  for (let pageNum = 1; pageNum <= pages; pageNum += 1) {
    const page = await pdf.getPage(pageNum);
    const viewport = page.getViewport({ scale });
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    await page.render({ canvasContext: context, viewport }).promise;
    images.push(canvas.toDataURL("image/png"));
  }
  return images;
};

const extractTextWithOcr = async (dataUrl) => {
  if (!window.Tesseract) return "";
  const result = await window.Tesseract.recognize(dataUrl, "eng");
  return result?.data?.text?.trim() || "";
};

const extractTextFromDocx = async (file) => {
  if (!window.mammoth) return "";
  const arrayBuffer = await file.arrayBuffer();
  const result = await window.mammoth.extractRawText({ arrayBuffer });
  return result.value.trim();
};

const handleFile = async (file) => {
  const status = document.querySelector(selectors.uploadStatus);
  if (status) status.textContent = `Processing ${file.name}...`;
  updateDebugInfo([]);
  const resumeUrl = URL.createObjectURL(file);

  const fileNameFallback = file.name.replace(/\.[^/.]+$/, "");
  const extension = file.name.split(".").pop()?.toLowerCase() || "";

  try {
    if (file.type === "text/plain" || extension === "md") {
      const text = await file.text();
      updateDebugInfo([`Text length: ${text.length}`]);
      const extracted = mockExtractFromText(text);
      updatePreview(extracted);
      updateMissingFields(extracted);
      fillFormFromExtraction(extracted);
      addCandidateRow({
        name: extracted.name,
        role: extracted.role,
        stage: "Screen",
        appliedDate: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
        risk: "medium",
        nextAction: "Resume review",
        nationality: extracted.nationality || "—",
        email: extracted.email || "—",
        github: extracted.github || "",
        resumeUrl,
      });
      saveCandidatesFromTable();
      return;
    }

    if (file.type === "application/pdf") {
      let text = await extractTextFromPdf(file);
      updateDebugInfo([`PDF text length: ${text.length}`]);
      if (!text || text.length < 40) {
        if (!window.Tesseract) {
          updateDebugInfo(["OCR not available (Tesseract missing)"]);
        }
        if (status) status.textContent = "Running OCR on PDF...";
        const images = await renderPdfPages(file, 2, 3);
        let combined = "";
        for (const image of images) {
          const ocrText = await extractTextWithOcr(image);
          combined += `${ocrText}\n`;
        }
        text = combined.trim();
        updateDebugInfo([
          `OCR text length: ${text.length}`,
          text.length < 40 ? "OCR may have failed. Try image-based PDF or higher quality." : "OCR succeeded",
        ]);
      }
      if (text) {
        const extracted = mockExtractFromText(text);
        updatePreview(extracted);
        updateMissingFields(extracted);
        fillFormFromExtraction(extracted);
        addCandidateRow({
          name: extracted.name,
          role: extracted.role,
          stage: "Screen",
          appliedDate: new Date().toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          }),
          risk: "medium",
          nextAction: "Resume review",
          nationality: extracted.nationality || "—",
          email: extracted.email || "—",
          github: extracted.github || "",
          resumeUrl,
        });
        saveCandidatesFromTable();
        return;
      }
    }

    if (file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
      const text = await extractTextFromDocx(file);
      updateDebugInfo([`DOCX text length: ${text.length}`]);
      if (text) {
        const extracted = mockExtractFromText(text);
        updatePreview(extracted);
        updateMissingFields(extracted);
        fillFormFromExtraction(extracted);
        addCandidateRow({
          name: extracted.name,
          role: extracted.role,
          stage: "Screen",
          appliedDate: new Date().toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          }),
          risk: "medium",
          nextAction: "Resume review",
          nationality: extracted.nationality || "—",
          email: extracted.email || "—",
          github: extracted.github || "",
          resumeUrl,
        });
        saveCandidatesFromTable();
        return;
      }
    }

    if (file.type.startsWith("image/")) {
      if (status) status.textContent = "Running OCR on image...";
      const imageUrl = URL.createObjectURL(file);
      const text = await extractTextWithOcr(imageUrl);
      updateDebugInfo([`OCR text length: ${text.length}`]);
      if (text) {
        const extracted = mockExtractFromText(text);
        updatePreview(extracted);
        updateMissingFields(extracted);
        fillFormFromExtraction(extracted);
        addCandidateRow({
          name: extracted.name,
          role: extracted.role,
          stage: "Screen",
          appliedDate: new Date().toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          }),
          risk: "medium",
          nextAction: "Resume review",
          nationality: extracted.nationality || "—",
          email: extracted.email || "—",
          github: extracted.github || "",
          resumeUrl,
        });
        saveCandidatesFromTable();
        return;
      }
    }
  } catch (error) {
    console.error("Resume parse error", error);
  }

  updatePreview({
    name: fileNameFallback,
    role: "Role not detected (manual review)",
    claims: [],
  });
  updateDebugInfo(["Fallback used. Could not extract text from file."]);
  updateMissingFields({
    name: fileNameFallback,
    role: "Role not detected",
    claims: [],
    email: "—",
    nationality: "—",
    github: "",
  });
  addCandidateRow({
    name: fileNameFallback,
    role: "Role not detected",
    stage: "Screen",
    appliedDate: new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
    risk: "medium",
    nextAction: "Manual extraction",
    nationality: "—",
    email: "—",
    github: "",
    resumeUrl,
  });
  saveCandidatesFromTable();
};

const setupUpload = () => {
  const uploadInput = document.querySelector(selectors.uploadInput);
  const uploadSelectButton = document.querySelector(selectors.uploadSelectButton);
  const reviewButton = document.querySelector(selectors.reviewButton);
  const dropZone = document.querySelector(selectors.dropZone);

  if (uploadSelectButton && uploadInput) {
    uploadSelectButton.addEventListener("click", () => uploadInput.click());
  }

  if (uploadInput) {
    uploadInput.addEventListener("change", (event) => {
      const file = event.target.files?.[0];
      if (file) handleFile(file);
    });
  }

  if (dropZone) {
    dropZone.addEventListener("dragover", (event) => {
      event.preventDefault();
      dropZone.classList.add("dragover");
    });

    dropZone.addEventListener("dragleave", () => {
      dropZone.classList.remove("dragover");
    });

    dropZone.addEventListener("drop", (event) => {
      event.preventDefault();
      dropZone.classList.remove("dragover");
      const file = event.dataTransfer?.files?.[0];
      if (file) handleFile(file);
    });
  }

  if (reviewButton) {
    reviewButton.addEventListener("click", () => {
      updateFormState();
      alert("Extracted info applied. Review and add the candidate.");
    });
  }
};

const setupAddButton = () => {
  const addButton = document.querySelector(selectors.addButton);
  if (addButton) addButton.addEventListener("click", handleAddCandidate);
};

document.addEventListener("DOMContentLoaded", () => {
  hydrateCandidates();
  setupUpload();
  setupAddButton();
  setupRowSelection();
  setupEditForm();
});

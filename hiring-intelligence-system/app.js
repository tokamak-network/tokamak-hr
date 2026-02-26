const selectors = {
  tableBody: "#candidateTable",
  uploadInput: "#resumeInput",
  uploadSelectButton: "#resumeSelectButton",
  dropZone: "#resumeDropZone",
  uploadStatus: "#uploadStatus",
  previewRole: "#previewRole",
  previewClaims: "#previewClaims",
  previewMissing: "#previewMissing",
  previewDebug: "#previewDebug",
  editForm: "#editForm",
  editTitle: "#editTitle",
  editClear: "#editClearButton",
  editSave: "#editSaveButton",
  editDelete: "#editDeleteButton",
  editModal: "#editModal",
  editModalOverlay: "#editModalOverlay",
  summaryModal: "#summaryModal",
  summaryOverlay: "#summaryModalOverlay",
  summaryClose: "#summaryCloseButton",
  summaryContent: "#summaryContent",
  llmButton: "#llmSettingsButton",
  llmModal: "#llmModal",
  llmOverlay: "#llmModalOverlay",
  llmClose: "#llmCloseButton",
  llmSave: "#llmSaveButton",
  llmUrl: "#llmUrl",
  llmToken: "#llmToken",
  llmModel: "#llmModel",
  llmChatId: "#llmChatId",
  llmSessionId: "#llmSessionId",
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
const llmSettingsKey = "hiringIntelligenceLlmSettings";

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

const openLlmModal = () => {
  const modal = document.querySelector(selectors.llmModal);
  if (modal) {
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
  }
};

const closeLlmModal = () => {
  const modal = document.querySelector(selectors.llmModal);
  if (modal) {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
  }
};

const defaultLlmSettings = {
  url: "https://chat.ai.tokamak.network/api/chat/completions",
  model: "gpt-5.2",
  token: "",
  chatId: "",
  sessionId: "",
};

const loadLlmSettings = () => {
  const raw = localStorage.getItem(llmSettingsKey);
  if (!raw) return { ...defaultLlmSettings };
  try {
    return { ...defaultLlmSettings, ...JSON.parse(raw) };
  } catch {
    return { ...defaultLlmSettings };
  }
};

const saveLlmSettings = (settings) => {
  localStorage.setItem(llmSettingsKey, JSON.stringify(settings));
};

const hydrateLlmSettings = () => {
  const settings = loadLlmSettings();
  if (!settings) return;
  const urlInput = document.querySelector(selectors.llmUrl);
  const tokenInput = document.querySelector(selectors.llmToken);
  const modelInput = document.querySelector(selectors.llmModel);
  const chatIdInput = document.querySelector(selectors.llmChatId);
  const sessionIdInput = document.querySelector(selectors.llmSessionId);
  if (urlInput) urlInput.value = settings.url || "";
  if (tokenInput) tokenInput.value = settings.token || "";
  if (modelInput) modelInput.value = settings.model || "gpt-5.2";
  if (chatIdInput) chatIdInput.value = settings.chatId || "";
  if (sessionIdInput) sessionIdInput.value = settings.sessionId || "";
};

const extractAssistantContent = (data) => {
  if (!data) return "";
  const direct =
    data?.choices?.[0]?.message?.content ||
    data?.choices?.[0]?.delta?.content ||
    data?.content;
  if (direct) return String(direct).trim();
  const messages = data?.messages || data?.data?.messages;
  if (Array.isArray(messages)) {
    for (let i = messages.length - 1; i >= 0; i -= 1) {
      const message = messages[i];
      if (message?.role === "assistant" && message?.content) {
        return String(message.content).trim();
      }
    }
  }
  return "";
};

const buildCompletedUrl = (url) => {
  if (!url) return "";
  if (url.includes("/completed")) return url;
  if (url.includes("/completions")) return url.replace(/\/completions(\?.*)?$/, "/completed");
  return `${url.replace(/\/$/, "")}/completed`;
};

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const requestSummaryFromLlm = async (text) => {
  const settings = loadLlmSettings();
  if (!settings || !settings.url || !settings.token) return null;

  const payload = {
    stream: false,
    model: settings.model || "gpt-5.2",
    chat_id: settings.chatId || undefined,
    session_id: settings.sessionId || undefined,
    messages: [
      {
        role: "user",
        content:
          "You are an HR analyst. Summarize the resume into:\n" +
          "1) 핵심 경력 요약\n2) 회사별 주요 업무 및 성과\n3) 개인 프로젝트\n4) 핵심 기술 스택\n5) 강점 요약\n6) 한줄 요약.\n" +
          "Respond in Korean, concise bullet points.\n\nResume:\n" +
          text,
      },
    ],
    params: {},
    tool_servers: [],
    features: {
      voice: false,
      image_generation: false,
      code_interpreter: false,
      web_search: false,
    },
    variables: {},
  };

  const response = await fetch(settings.url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${settings.token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) return null;
  const data = await response.json();
  const directContent = extractAssistantContent(data);
  if (directContent) return directContent;

  const taskId = data?.task_id;
  if (!taskId) return null;

  const completedUrl = buildCompletedUrl(settings.url);
  const completedPayload = {
    task_id: taskId,
    chat_id: settings.chatId || undefined,
    session_id: settings.sessionId || undefined,
    model: settings.model || "gpt-5.2",
  };

  for (let attempt = 0; attempt < 12; attempt += 1) {
    await wait(1000);
    const completedResponse = await fetch(completedUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${settings.token}`,
      },
      body: JSON.stringify(completedPayload),
    });
    if (!completedResponse.ok) continue;
    const completedData = await completedResponse.json();
    const completedContent = extractAssistantContent(completedData);
    if (completedContent) return completedContent;
  }

  return null;
};

const openSummaryModal = (content) => {
  const modal = document.querySelector(selectors.summaryModal);
  const box = document.querySelector(selectors.summaryContent);
  if (box) box.textContent = content || "추출된 요약이 없습니다.";
  if (modal) {
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
  }
};

const closeSummaryModal = () => {
  const modal = document.querySelector(selectors.summaryModal);
  if (modal) {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
  }
};

if (window.pdfjsLib) {
  window.pdfjsLib.GlobalWorkerOptions.workerSrc =
    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.379/pdf.worker.min.js";
}


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
  summary,
  resumeUrl,
  id,
  rowIndex,
}) => {
  const tableBody = document.querySelector(selectors.tableBody);
  if (!tableBody) return;
  const row = document.createElement("tr");
  row.setAttribute("data-candidate", "");
  row.dataset.id = id || createId();
  row.dataset.summary = summary || "";
  const displayIndex = rowIndex || tableBody.querySelectorAll("tr[data-candidate]").length + 1;
  row.innerHTML = `
    <td>${displayIndex}</td>
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
    <td><button class="summary-link" type="button">${summary ? "View" : "Add"}</button></td>
  `;
  tableBody.append(row);
  return row;
};

const normalizeName = (value) => value.toLowerCase().replace(/\s+/g, " ").trim();

const createId = () => {
  if (window.crypto?.randomUUID) return window.crypto.randomUUID();
  return `cand_${Date.now()}_${Math.random().toString(16).slice(2)}`;
};

const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1);

const parseRow = (row) => {
  const cells = row.querySelectorAll("td");
  return {
    id: row.dataset.id || createId(),
    name: cells[1]?.querySelector(".name-link")?.textContent?.trim() || cells[1]?.textContent?.trim() || "",
    role: cells[2]?.textContent?.trim() || "",
    stage: cells[3]?.textContent?.trim() || "screen",
    appliedDate: cells[4]?.textContent?.trim() || "",
    risk: cells[5]?.textContent?.trim().toLowerCase() || "low",
    nextAction: cells[6]?.textContent?.trim() || "",
    nationality: cells[7]?.textContent?.trim() || "",
    email: cells[8]?.textContent?.trim() || "",
    github: cells[9]?.querySelector("a")?.getAttribute("href") || "",
    summary: row.dataset.summary || "",
    resume: cells[10]?.querySelector("a")?.getAttribute("href") || "",
  };
};

const saveCandidatesFromTable = () => {
  const tableBody = document.querySelector(selectors.tableBody);
  if (!tableBody) return;
  const rows = Array.from(tableBody.querySelectorAll("tr[data-candidate]"));
  const data = rows.map((row) => parseRow(row));
  localStorage.setItem(storageKey, JSON.stringify(data));
};

const saveAndFilter = () => {
  saveCandidatesFromTable();
  refreshRowNumbers();
};

const refreshRowNumbers = () => {
  const tableBody = document.querySelector(selectors.tableBody);
  if (!tableBody) return;
  const rows = Array.from(tableBody.querySelectorAll("tr[data-candidate]"));
  rows.forEach((row, index) => {
    const cell = row.querySelector("td");
    if (cell) cell.textContent = String(index + 1);
  });
};

const renderCandidates = (candidates) => {
  const tableBody = document.querySelector(selectors.tableBody);
  if (!tableBody) return;
  tableBody.innerHTML = "";
  candidates.forEach((candidate, index) => {
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
      summary: candidate.summary,
      resumeUrl: candidate.resume,
      rowIndex: index + 1,
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
  if (!data) return;
  document.querySelector(selectors.editName).value = data.name;
  document.querySelector(selectors.editRole).value = data.role;
  document.querySelector(selectors.editStage).value = data.stage.toLowerCase();
  const appliedInput = document.querySelector(selectors.editApplied);
  if (appliedInput) {
    const parsed = data.appliedDate ? new Date(data.appliedDate) : null;
    appliedInput.value = parsed && !Number.isNaN(parsed.valueOf())
      ? parsed.toISOString().slice(0, 10)
      : "";
  }
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

  cells[1].innerHTML = `<button class="name-link" type="button">${name || "—"}</button>`;
  cells[2].textContent = role || "—";
  cells[3].textContent = stage;
  cells[4].textContent = applied ? new Date(applied).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }) : "—";
  cells[5].innerHTML = `<span class="chip ${risk}">${capitalize(risk)}</span>`;
  cells[6].textContent = nextAction || "—";
  cells[7].textContent = nationality || "—";
  cells[8].textContent = email || "—";
  cells[9].innerHTML = github
    ? `<a class="table-link" href="${github}" target="_blank" rel="noopener">${github.replace("https://github.com/", "@")} </a>`
    : "—";
  cells[10].innerHTML = resume
    ? `<a class="table-link" href="${resume}" target="_blank" rel="noopener">Resume</a>`
    : "—";
  cells[11].innerHTML = `<button class="summary-link" type="button">${selectedRow.dataset.summary ? "View" : "Add"}</button>`;
  saveAndFilter();
  closeModal();
};

const deleteSelectedRow = () => {
  if (!selectedRow) return;
  selectedRow.remove();
  clearEditForm();
  saveAndFilter();
};

const setupRowSelection = () => {
  const tableBody = document.querySelector(selectors.tableBody);
  if (!tableBody) return;
  tableBody.addEventListener("click", (event) => {
    const nameButton = event.target.closest(".name-link");
    const summaryButton = event.target.closest(".summary-link");
    if (!nameButton && !summaryButton) return;
    const row = event.target.closest("tr[data-candidate]");
    if (!row) return;
    if (summaryButton) {
      const summary = row.dataset.summary || "";
      openSummaryModal(summary);
      return;
    }
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
  const summaryOverlay = document.querySelector(selectors.summaryOverlay);
  const summaryClose = document.querySelector(selectors.summaryClose);
  const llmOverlay = document.querySelector(selectors.llmOverlay);
  const llmClose = document.querySelector(selectors.llmClose);
  const llmSave = document.querySelector(selectors.llmSave);
  const llmButton = document.querySelector(selectors.llmButton);
  if (clearButton) clearButton.addEventListener("click", clearEditForm);
  if (saveButton) saveButton.addEventListener("click", updateRowFromForm);
  if (deleteButton) deleteButton.addEventListener("click", deleteSelectedRow);
  if (overlay) overlay.addEventListener("click", closeModal);
  if (summaryOverlay) summaryOverlay.addEventListener("click", closeSummaryModal);
  if (summaryClose) summaryClose.addEventListener("click", closeSummaryModal);
  if (llmOverlay) llmOverlay.addEventListener("click", closeLlmModal);
  if (llmClose) llmClose.addEventListener("click", closeLlmModal);
  if (llmButton) llmButton.addEventListener("click", () => {
    hydrateLlmSettings();
    openLlmModal();
  });
  if (llmSave) {
    llmSave.addEventListener("click", () => {
      const url = document.querySelector(selectors.llmUrl)?.value.trim();
      const token = document.querySelector(selectors.llmToken)?.value.trim();
      const model = document.querySelector(selectors.llmModel)?.value.trim() || "gpt-5.2";
      const chatId = document.querySelector(selectors.llmChatId)?.value.trim();
      const sessionId = document.querySelector(selectors.llmSessionId)?.value.trim();
      saveLlmSettings({ url, token, model, chatId, sessionId });
      closeLlmModal();
    });
  }
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeModal();
      closeSummaryModal();
      closeLlmModal();
    }
  });
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

const fillFormFromExtraction = () => {};

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

const extractSection = (lines, headerRegex) => {
  const startIndex = lines.findIndex((line) => headerRegex.test(line));
  if (startIndex < 0) return [];
  const section = [];
  for (let i = startIndex + 1; i < lines.length; i += 1) {
    const line = lines[i];
    if (/^#{1,3}\s|^[A-Z\s]{3,}$/.test(line)) break;
    if (/(summary|work experience|experience|skills|projects|education|certification)/i.test(line)) break;
    section.push(line);
  }
  return section.filter(Boolean);
};

const extractBullets = (lines, limit = 4) =>
  lines
    .filter((line) => /^[-*•]/.test(line) || /\b(achieved|built|developed|designed|optimized|improved|managed)\b/i.test(line))
    .map((line) => line.replace(/^[-*•]\s*/, "").trim())
    .filter(Boolean)
    .slice(0, limit);

const extractSkills = (lines) => {
  const skillLine = lines.find((line) => /skills|technologies|stack|tool|language/i.test(line));
  if (skillLine && skillLine.includes(":")) {
    return skillLine.split(":")[1].trim();
  }
  const skillSection = extractSection(lines, /skills|technologies/i);
  const flat = skillSection.join(" ");
  return flat ? flat.replace(/\s+/g, " ").trim() : "";
};

const extractSummaryFromText = (rawText) => {
  const lines = rawText
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const summaryLines = extractSection(lines, /summary|about me|profile/i);
  const summaryText = summaryLines.slice(0, 3).join(" ").trim();

  const experienceLines = extractSection(lines, /work experience|experience/i);
  const experienceHighlights = extractBullets(experienceLines, 3);

  const projectLines = extractSection(lines, /projects|personal projects/i);
  const projectHighlights = extractBullets(projectLines, 2);

  const skills = extractSkills(lines);

  const output = [];
  if (summaryText) output.push(`Summary: ${summaryText}`);
  if (experienceHighlights.length) {
    output.push(`Experience Highlights: ${experienceHighlights.join(" · ")}`);
  }
  if (projectHighlights.length) {
    output.push(`Projects: ${projectHighlights.join(" · ")}`);
  }
  if (skills) output.push(`Skills: ${skills}`);

  if (!output.length) {
    const sentences = rawText
      .split(/\.(\s|$)/)
      .map((s) => s.trim())
      .filter(Boolean);
    return sentences.slice(0, 2).join(". ").slice(0, 240);
  }

  return output.join("\n").slice(0, 800);
};

const handleFile = async (file) => {
  const status = document.querySelector(selectors.uploadStatus);
  if (status) status.textContent = `Processing ${file.name}...`;
  updateDebugInfo([]);
  const resumeUrl = URL.createObjectURL(file);

  const fileNameFallback = file.name.replace(/\.[^/.]+$/, "");
  const extension = file.name.split(".").pop()?.toLowerCase() || "";
  const isMarkdown = extension === "md";
  const isPdf = file.type === "application/pdf" || extension === "pdf";
  const isDocx =
    file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    extension === "docx";
  const isText = file.type === "text/plain" || extension === "txt" || isMarkdown;
  const isImage = file.type.startsWith("image/");

  updateDebugInfo([`Type: ${file.type || "(empty)"}`, `Ext: .${extension}`]);

  try {
    if (isText) {
      updateDebugInfo([`Branch: text`, `Type: ${file.type || "(empty)"}`, `Ext: .${extension}`]);
      const text = await file.text();
      updateDebugInfo([`Branch: text`, `Type: ${file.type || "(empty)"}`, `Ext: .${extension}`, `Text length: ${text.length}`]);
      const extracted = mockExtractFromText(text);
      let summary = await requestSummaryFromLlm(text);
      if (!summary) summary = extractSummaryFromText(text);
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
        summary,
        resumeUrl,
      });
      saveAndFilter();
      return;
    }

    if (isPdf) {
      updateDebugInfo([`Branch: pdf`, `Type: ${file.type || "(empty)"}`, `Ext: .${extension}`]);
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
        let summary = await requestSummaryFromLlm(text);
        if (!summary) summary = extractSummaryFromText(text);
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
          summary,
          resumeUrl,
        });
        saveAndFilter();
        return;
      }
    }

    if (isDocx) {
      updateDebugInfo([`Branch: docx`, `Type: ${file.type || "(empty)"}`, `Ext: .${extension}`]);
      const text = await extractTextFromDocx(file);
      updateDebugInfo([`DOCX text length: ${text.length}`]);
      if (text) {
        const extracted = mockExtractFromText(text);
        let summary = await requestSummaryFromLlm(text);
        if (!summary) summary = extractSummaryFromText(text);
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
          summary,
          resumeUrl,
        });
        saveAndFilter();
        return;
      }
    }

    if (isImage) {
      updateDebugInfo([`Branch: image`, `Type: ${file.type || "(empty)"}`, `Ext: .${extension}`]);
      if (status) status.textContent = "Running OCR on image...";
      const imageUrl = URL.createObjectURL(file);
      const text = await extractTextWithOcr(imageUrl);
      updateDebugInfo([`OCR text length: ${text.length}`]);
      if (text) {
        const extracted = mockExtractFromText(text);
        let summary = await requestSummaryFromLlm(text);
        if (!summary) summary = extractSummaryFromText(text);
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
          summary,
          resumeUrl,
        });
        saveAndFilter();
        return;
      }
    }
  } catch (error) {
    console.error("Resume parse error", error);
    updateDebugInfo(["Error during parse", error?.message || String(error)]);
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
    summary: "",
    resumeUrl,
  });
  saveCandidatesFromTable();
};

const setupUpload = () => {
  const uploadInput = document.querySelector(selectors.uploadInput);
  const uploadSelectButton = document.querySelector(selectors.uploadSelectButton);
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

};


document.addEventListener("DOMContentLoaded", () => {
  hydrateCandidates();
  setupUpload();
  setupRowSelection();
  setupEditForm();
});

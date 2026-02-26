const storageKey = "hiringIntelligenceCandidates";

const roleTemplates = {
  backend: [
    "최근에 성능 병목을 해결한 사례를 설명해 주세요.",
    "데이터 정합성과 확장성 중 무엇을 우선했고, 왜 그렇게 결정했나요?",
    "트레이드오프가 컸던 설계 결정 하나를 설명해 주세요.",
  ],
  frontend: [
    "복잡한 UI 상태를 어떻게 구조화했는지 설명해 주세요.",
    "성능 최적화를 위해 어떤 지표를 사용했나요?",
    "디자인 변경 요청이 잦을 때 어떻게 협업하나요?",
  ],
  blockchain: [
    "스마트 컨트랙트 보안 리스크를 어떻게 식별하고 줄였나요?",
    "온체인/오프체인 경계를 어디에 두었나요?",
    "가스 비용 최적화 경험을 구체적으로 설명해 주세요.",
  ],
  research: [
    "가설 설정과 검증 과정을 어떻게 설계했나요?",
    "결과가 기대와 달랐던 사례와 조정 과정을 설명해 주세요.",
    "연구 결과를 제품 또는 운영에 반영한 경험이 있나요?",
  ],
  ops: [
    "프로세스 개선으로 측정 가능한 성과를 만든 사례는?",
    "여러 이해관계자 충돌 상황에서 어떻게 조율했나요?",
    "업무 자동화를 위해 어떤 기준으로 우선순위를 정했나요?",
  ],
};

const cultureQuestions = [
  "최근 받은 피드백 중 가장 어려웠던 것은 무엇이었나요?",
  "팀 내 갈등 상황에서 본인 역할은 무엇이었나요?",
  "실패한 경험을 공유해 주세요. 무엇을 배웠나요?",
];

const resumeProbes = [
  "이력서에 적힌 프로젝트 중 본인 책임 범위를 명확히 설명해 주세요.",
  "성과를 수치로 표현한다면 어떤 지표를 쓸 수 있나요?",
  "예상치 못한 리스크가 있었나요? 어떻게 대응했나요?",
];

const riskQuestions = [
  "초기 30일 내 어려움을 겪었던 경험이 있나요?",
  "피드백을 빠르게 반영했던 사례를 설명해 주세요.",
  "커뮤니케이션 병목이 발생했을 때 어떻게 해결했나요?",
];

const normalize = (value) => value.toLowerCase();

const getRoleKey = (role) => {
  const roleValue = normalize(role);
  if (roleValue.includes("backend")) return "backend";
  if (roleValue.includes("frontend")) return "frontend";
  if (roleValue.includes("blockchain")) return "blockchain";
  if (roleValue.includes("research")) return "research";
  if (roleValue.includes("ops") || roleValue.includes("people")) return "ops";
  return "backend";
};

const cleanSummaryLine = (line) =>
  line
    .replace(/[*_`]/g, "")
    .replace(/^\d+[\).]\s*/g, "")
    .replace(/^[-•]\s*/g, "")
    .replace(/^#+\s*/g, "")
    .trim();

const extractSummaryLines = (summary) => {
  if (!summary) return [];
  return summary
    .split(/\n|•/g)
    .map((item) => cleanSummaryLine(item))
    .filter((item) => item.length > 6)
    .slice(0, 4);
};

const buildResumeValidationGroups = (candidate) => {
  const lines = extractSummaryLines(candidate.summary || "");
  if (!lines.length) {
    return {
      role: [
        "최근 근무한 회사/프로젝트 이름을 말하고, 본인 역할과 책임 범위를 구체적으로 설명해 주세요.",
      ],
      outcome: [
        "최근 프로젝트에서 본인이 만든 결과(성능/안정성/비용/속도 등)를 수치 포함해 설명해 주세요.",
      ],
      risk: [
        "최근 프로젝트에서 발생한 문제/리스크와 본인이 어떻게 해결했는지 구체적으로 설명해 주세요.",
      ],
    };
  }
  const role = [];
  const outcome = [];
  const risk = [];
  lines.forEach((line) => {
    const snippet = line.length > 90 ? `${line.slice(0, 90)}…` : line;
    role.push(`"${snippet}"에 해당하는 회사/프로젝트 이름을 말하고, 본인 역할과 책임 범위를 구체적으로 설명해 주세요.`);
    outcome.push(`"${snippet}"에서 본인이 만든 결과를 수치 포함해 설명해 주세요. (예: 지연 시간, 처리량, 비용 절감, 오류율)`);
    risk.push(`"${snippet}"에서 발생한 문제/리스크와 본인의 대응 과정을 구체적으로 설명해 주세요.`);
  });
  return {
    role: role.slice(0, 3),
    outcome: outcome.slice(0, 3),
    risk: risk.slice(0, 3),
  };
};

const buildQuestions = (candidate) => {
  const roleKey = getRoleKey(candidate.role || "");
  const resumeGroups = buildResumeValidationGroups(candidate);
  return [
    {
      title: "Resume Validation · Role Ownership",
      items: resumeGroups.role,
    },
    {
      title: "Resume Validation · Outcomes",
      items: resumeGroups.outcome,
    },
    {
      title: "Resume Validation · Risk & Failure",
      items: resumeGroups.risk,
    },
    {
      title: "Role Depth",
      items: roleTemplates[roleKey] || roleTemplates.backend,
    },
    {
      title: "Culture & Behavior",
      items: cultureQuestions,
    },
    {
      title: "Risk Probes",
      items: riskQuestions,
    },
  ];
};

const buildHighlights = (candidate) => {
  if (candidate.summary) {
    return candidate.summary.trim();
  }
  const roleKey = getRoleKey(candidate.role || "");
  const highlights = [];

  if (roleKey === "backend") {
    highlights.push("API/DB 설계 및 성능 최적화 경험");
    highlights.push("확장성·정합성 트레이드오프 설명 필요");
  }
  if (roleKey === "frontend") {
    highlights.push("UI 상태 관리 및 성능 최적화 사례");
    highlights.push("디자인 협업 경험 및 컴포넌트화 방식");
  }
  if (roleKey === "blockchain") {
    highlights.push("스마트 컨트랙트 보안/가스 최적화 경험");
    highlights.push("온체인/오프체인 경계 설계 사례");
  }
  if (roleKey === "research") {
    highlights.push("가설 수립 → 검증 → 제품화 흐름 경험");
    highlights.push("실험 실패 후 개선한 사례");
  }
  if (roleKey === "ops") {
    highlights.push("프로세스 개선으로 측정된 임팩트");
    highlights.push("이해관계자 조율 및 커뮤니케이션 방식");
  }

  if (candidate.github && candidate.github !== "—") {
    highlights.push(`GitHub 활동 확인: ${candidate.github}`);
  }
  if (candidate.nextAction && candidate.nextAction !== "—") {
    highlights.push(`Next Action: ${candidate.nextAction}`);
  }

  return highlights.length ? highlights.join("\n") : "이력서 핵심 요약을 수동으로 추가하세요.";
};

const renderCandidateList = (candidates, onSelect) => {
  const list = document.querySelector("#candidateList");
  if (!list) return;
  list.innerHTML = "";

  if (!candidates.length) {
    list.innerHTML = `<div class="kit-empty"><h3>No candidates</h3><p>Add candidates first.</p></div>`;
    return;
  }

  candidates.forEach((candidate, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "kit-candidate";
    button.innerHTML = `
      <strong>${candidate.name}</strong>
      <span>${candidate.role || "Role not detected"}</span>
      <span class="pill">Stage: ${candidate.stage || "Screen"}</span>
    `;
    button.addEventListener("click", () => onSelect(candidate, index));
    list.appendChild(button);
  });
};

const renderKit = (candidate) => {
  const panel = document.querySelector("#kitPanel");
  const summaryPanel = document.querySelector("#kitSummaryPanel");
  const subtitle = document.querySelector("#kitSubtitle");
  const status = document.querySelector("#kitStatus");
  if (!panel) return;

  const sections = buildQuestions(candidate);
  if (summaryPanel) {
    const highlights = buildHighlights(candidate);
    summaryPanel.innerHTML = `
      <div class="kit-header">
        <h3>${candidate.name}</h3>
        <p>${candidate.role || "Role not detected"} · ${candidate.stage || "Screen"}</p>
      </div>
      <div class="summary-grid">
        <div>
          <p class="summary-label">Key Focus</p>
          <p class="summary-value">${candidate.role || "Role not detected"}</p>
        </div>
        <div>
          <p class="summary-label">Next Action</p>
          <p class="summary-value">${candidate.nextAction || "—"}</p>
        </div>
        <div>
          <p class="summary-label">Nationality</p>
          <p class="summary-value">${candidate.nationality || "—"}</p>
        </div>
        <div>
          <p class="summary-label">Email</p>
          <p class="summary-value">${candidate.email || "—"}</p>
        </div>
      </div>
      <div class="summary-block">
        <h4>Resume Highlights</h4>
        <p class="summary-text">${highlights}</p>
      </div>
    `;
  }

  panel.innerHTML = sections
    .map(
      (section) => `
    <div class="kit-section">
      <h4>${section.title}</h4>
      <div class="kit-questions">
        ${section.items
          .map(
            (question) => `
          <details>
            <summary>${question}</summary>
            <p>기대하는 답변 구조와 리스크 신호를 체크하세요.</p>
          </details>
        `
          )
          .join("")}
      </div>
    </div>
  `
    )
    .join("");

  if (subtitle) subtitle.textContent = `${candidate.name} · ${candidate.role}`;
  if (status) status.textContent = "Ready";
};

const loadCandidates = () => {
  const raw = localStorage.getItem(storageKey);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
};

const setupCopy = () => {
  const button = document.querySelector("#copyKitButton");
  if (!button) return;
  button.addEventListener("click", async () => {
    const panel = document.querySelector("#kitPanel");
    if (!panel) return;
    const text = panel.innerText.trim();
    if (!text) return;
    await navigator.clipboard.writeText(text);
    button.textContent = "Copied";
    setTimeout(() => {
      button.textContent = "Copy Questions";
    }, 1200);
  });
};

const init = () => {
  const candidates = loadCandidates();
  renderCandidateList(candidates, (candidate) => renderKit(candidate));
  setupCopy();
};

document.addEventListener("DOMContentLoaded", init);

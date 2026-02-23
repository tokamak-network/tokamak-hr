const state = {
  members: [],
  filtered: [],
  view: "active",
  page: "overview",
  statusOverrides: {},
  projectOverrides: {},
  projectOptions: [],
  onboardings: [],
  addedMembers: [],
  memberEdits: {},
};

const elements = {
  table: document.getElementById("teamTable"),
  searchInput: document.getElementById("searchInput"),
  teamFilter: document.getElementById("teamFilter"),
  statusFilter: document.getElementById("statusFilter"),
  rndFilter: document.getElementById("rndFilter"),
  pageButtons: document.querySelectorAll(".page-btn"),
  statTotal: document.getElementById("statTotal"),
  statUpcoming: document.getElementById("statUpcoming"),
  statRnD: document.getElementById("statRnD"),
  statIntl: document.getElementById("statIntl"),
  lastSynced: document.getElementById("lastSynced"),
  refreshButton: document.getElementById("refreshButton"),
  overviewSection: document.getElementById("overviewSection"),
  directorySection: document.getElementById("directorySection"),
  directoryTitle: document.getElementById("directoryTitle"),
  projectInput: document.getElementById("projectInput"),
  addProjectButton: document.getElementById("addProjectButton"),
  projectList: document.getElementById("projectList"),
  onboardingSection: document.getElementById("onboardingSection"),
  onboardingList: document.getElementById("onboardingList"),
  onboardName: document.getElementById("onboardName"),
  onboardStart: document.getElementById("onboardStart"),
  onboardEmail: document.getElementById("onboardEmail"),
  onboardRole: document.getElementById("onboardRole"),
  onboardPersonalEmail: document.getElementById("onboardPersonalEmail"),
  onboardPhone: document.getElementById("onboardPhone"),
  onboardAddress: document.getElementById("onboardAddress"),
  addOnboardButton: document.getElementById("addOnboardButton"),
  modal: document.getElementById("detailModal"),
  modalTitle: document.getElementById("modalTitle"),
  modalBody: document.getElementById("modalBody"),
  modalEyebrow: document.getElementById("modalEyebrow"),
  closeModal: document.getElementById("closeModal"),
};

const MS_IN_DAY = 1000 * 60 * 60 * 24;
const STATUS_KEY = "tokamak_team_status_overrides_v1";
const PROJECT_KEY = "tokamak_team_project_overrides_v1";
const PROJECT_LIST_KEY = "tokamak_team_project_list_v1";
const ONBOARDING_KEY = "tokamak_team_onboarding_v1";
const ADDED_MEMBERS_KEY = "tokamak_team_added_members_v1";
const MEMBER_EDITS_KEY = "tokamak_team_member_edits_v1";

const ONBOARDING_TEMPLATE = [
  { label: "임직원 정보 추가", mode: "auto" },
  { label: "회사 계정 생성", mode: "auto" },
  { label: "근로계약서/연봉계약서/보안서약서 발송", mode: "auto" },
  {
    label: "HR 캘린더 반영1: 수습시작일 / 수습종료일(3개월-1일) 일정 설정",
    mode: "auto",
  },
  {
    label: "캘린더 반영2: HR General OT(입사자이름)_Irene,입사자 -> Tokamak call로 반영",
    mode: "auto",
  },
  {
    label: "개인별 폴더 생성 (구글 드라이브 -> Personal folder / Recording folder)",
    mode: "auto",
  },
  { label: "Tokamak 폴더 권한 부여", mode: "auto" },
  { label: "슬랙 채널 초대", mode: "auto" },
  { label: "토카막 캘린더 수락(메일함)", mode: "auto" },
  {
    label:
      "구글 드라이브 내 '공유 문서함' 클릭 -> 내 드라이브로 바로가기 클릭(메일함_공유)",
    mode: "auto",
  },
  { label: "레코딩 셋업(입사자 계정으로 구글 로그인하여 진행)", mode: "manual" },
  { label: "HR 공지 채널에 입사 안내 슬랙 공지", mode: "auto" },
  { label: "온보딩 메일 발송 (2개) -> 굿즈 발송 관련도 안내", mode: "auto" },
  { label: "필수 제출 서류 제출 F/U", mode: "auto" },
  {
    label:
      "수습 종료 프로세스 일정 세팅 (서치펌 -> 6주째 때로 일정 생성) * 8주 이내로 평가 필요",
    mode: "auto",
  },
  { label: "All thing eye 신규 입사자 추가", mode: "auto" },
  { label: "All thing eye > Welcome package 발송", mode: "auto" },
  { label: "굿즈 발송 및 인증", mode: "auto" },
];

const LEGACY_REGISTRATION =
  "등록절차(회사 계정생성, 툴 초대, 레코딩셋업)";

const TEMPLATE_MODE_MAP = ONBOARDING_TEMPLATE.reduce((acc, item) => {
  acc[item.label] = item.mode;
  return acc;
}, {});

const parseDate = (value) => {
  if (!value) return null;
  const parts = value
    .replace(/\s/g, "")
    .replace(/\.$/, "")
    .split(".")
    .filter(Boolean)
    .map((item) => parseInt(item, 10));
  if (parts.length < 3 || parts.some((item) => Number.isNaN(item))) {
    const fallback = new Date(value);
    return Number.isNaN(fallback.getTime()) ? null : fallback;
  }
  const [year, month, day] = parts;
  return new Date(year, month - 1, day);
};

const sortByStartDate = (list) => {
  return [...list].sort((a, b) => {
    const aDate = parseDate(a.start_date);
    const bDate = parseDate(b.start_date);
    if (!aDate && !bDate) return 0;
    if (!aDate) return 1;
    if (!bDate) return -1;
    return aDate - bDate;
  });
};

const getStatus = (member) => {
  if (state.statusOverrides[member.no] === "inactive") return "inactive";
  const startDate = parseDate(member.start_date);
  if (!startDate) return "active";
  const now = new Date();
  const diffDays = Math.round((startDate - now) / MS_IN_DAY);
  if (diffDays >= 0 && diffDays <= 14) return "upcoming";
  return "active";
};

const getProjectList = (member) => {
  const override = state.projectOverrides[member.no];
  if (Array.isArray(override) && override.length) return override;
  if (typeof override === "string" && override.trim()) return [override];
  return member.organization ? [member.organization] : [];
};

const getProjectLabel = (member) => {
  const list = getProjectList(member);
  return list.length ? list.join(", ") : "";
};

const applyMemberEdits = (member) => {
  const edits = state.memberEdits[member.no] || {};
  return { ...member, ...edits };
};

const formatDate = (date) => {
  if (!date) return "—";
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
};

const updateStats = () => {
  elements.statTotal.textContent = state.members.length.toString();

  const upcoming = state.members.filter((member) => getStatus(member) === "upcoming");
  elements.statUpcoming.textContent = upcoming.length.toString();

  const rnd = state.members.filter((member) =>
    (member.r_and_d_flag || "").toLowerCase().includes("연구")
  );
  elements.statRnD.textContent = rnd.length.toString();

  const intl = state.members.filter((member) =>
    (member.nationality || "").includes("비")
  );
  elements.statIntl.textContent = intl.length.toString();
};

const setPage = (nextPage) => {
  state.page = nextPage;
  elements.pageButtons.forEach((btn) =>
    btn.classList.toggle("active", btn.dataset.page === nextPage)
  );

  const onOverview = nextPage === "overview";
  const onOnboarding = nextPage === "onboarding";
  elements.overviewSection.hidden = !onOverview;
  elements.directorySection.hidden = onOverview || onOnboarding;
  elements.onboardingSection.hidden = !onOnboarding;

  if (!onOverview && !onOnboarding) {
    state.view = nextPage === "inactive" ? "inactive" : "active";
    elements.directoryTitle.textContent =
      state.view === "inactive" ? "Inactive Members" : "Team Members";
    elements.statusFilter.value = "all";
    applyFilters();
  }
};

const renderTeamFilter = () => {
  const teams = Array.from(new Set(state.projectOptions.filter(Boolean))).sort();

  elements.teamFilter.innerHTML =
    `<option value="all">All</option>` +
    teams.map((team) => `<option value="${team}">${team}</option>`).join("");
};

const getSearchHaystack = (member) => {
  return [
    member.name_en,
    member.name_ko,
    member.name_en_full,
    getProjectLabel(member),
    member.title,
    member.address,
    member.email_work,
    member.email_personal,
    member.phone,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
};

const applyFilters = () => {
  const query = elements.searchInput.value.trim().toLowerCase();
  const team = elements.teamFilter.value;
  const status = elements.statusFilter.value;
  const rnd = elements.rndFilter.value;

  state.filtered = state.members.filter((member) => {
    if (query && !getSearchHaystack(member).includes(query)) return false;
    if (team !== "all" && !getProjectList(member).includes(team)) return false;

    const memberStatus = getStatus(member);
    if (state.view === "inactive" && memberStatus !== "inactive") return false;
    if (state.view === "active" && memberStatus === "inactive") return false;
    if (status !== "all" && memberStatus !== status) return false;

    const isRnD = (member.r_and_d_flag || "").toLowerCase().includes("연구");
    if (rnd === "yes" && !isRnD) return false;
    if (rnd === "no" && isRnD) return false;

    return true;
  });

  renderTable();
};

const renderTable = () => {
  if (!state.filtered.length) {
    elements.table.innerHTML =
      '<tr><td colspan="10">No matching team members.</td></tr>';
    return;
  }

  elements.table.innerHTML = state.filtered
    .map((member, index) => {
      const status = getStatus(member);
      return `
        <tr data-no="${member.no}">
          <td>${index + 1}</td>
          <td>
            <strong>${member.name_en || "—"}</strong><br />
            <span class="muted">${member.name_ko || ""}</span>
          </td>
          <td>${member.title || "—"}</td>
          <td>${getProjectLabel(member) || "—"}</td>
          <td>${member.start_date || "—"}</td>
          <td><span class="badge ${status}">${status}</span></td>
          <td>${member.email_work || "—"}</td>
          <td>${member.email_personal || "—"}</td>
          <td>${member.phone || "—"}</td>
          <td>${member.address || "—"}</td>
        </tr>
      `;
    })
    .join("");
};

const openModal = (member) => {
  elements.modalTitle.textContent = member.name_en || member.name_ko || "Member";
  elements.modalEyebrow.textContent = member.title || "Team member";
  const status = getStatus(member);
  const actionLabel = status === "inactive" ? "Mark Active" : "Mark Inactive";
  const projectValue = getProjectList(member);

  elements.modalBody.innerHTML = `
    <div class="modal-row">
      <div class="modal-label">English name</div>
      <div><input id="editNameEn" type="text" value="${member.name_en || ""}" /></div>
    </div>
    <div class="modal-row">
      <div class="modal-label">Korean name</div>
      <div><input id="editNameKo" type="text" value="${member.name_ko || ""}" /></div>
    </div>
    <div class="modal-row">
      <div class="modal-label">Role</div>
      <div><input id="editRole" type="text" value="${member.title || ""}" /></div>
    </div>
    <div class="modal-row">
      <div class="modal-label">Start date</div>
      <div><input id="editStart" type="text" value="${member.start_date || ""}" /></div>
    </div>
    <div class="modal-row">
      <div class="modal-label">Work email</div>
      <div><input id="editWorkEmail" type="email" value="${member.email_work || ""}" /></div>
    </div>
    <div class="modal-row">
      <div class="modal-label">Personal email</div>
      <div><input id="editPersonalEmail" type="email" value="${member.email_personal || ""}" /></div>
    </div>
    <div class="modal-row">
      <div class="modal-label">Phone</div>
      <div><input id="editPhone" type="text" value="${member.phone || ""}" /></div>
    </div>
    <div class="modal-row">
      <div class="modal-label">Address</div>
      <div><input id="editAddress" type="text" value="${member.address || ""}" /></div>
    </div>
  `;

  const actionRow = document.createElement("div");
  actionRow.className = "modal-row";
  actionRow.innerHTML = `
    <div class="modal-label">Status</div>
    <div>
      <button class="primary" id="statusToggle">${actionLabel}</button>
    </div>
  `;
  elements.modalBody.appendChild(actionRow);

  const projectRow = document.createElement("div");
  projectRow.className = "modal-row";
  const options = state.projectOptions
    .map(
      (project) => `
      <label class="project-checkbox">
        <input
          type="checkbox"
          value="${project}"
          ${projectValue.includes(project) ? "checked" : ""}
        />
        <span>${project}</span>
      </label>
    `
    )
    .join("");
  projectRow.innerHTML = `
    <div class="modal-label">Project</div>
    <div class="project-checkboxes" id="projectSelect">${options}</div>
  `;
  elements.modalBody.appendChild(projectRow);

  const saveRow = document.createElement("div");
  saveRow.className = "modal-row";
  saveRow.innerHTML = `
    <div class="modal-label">Update</div>
    <div>
      <button class="primary" id="saveMember">Save changes</button>
    </div>
  `;
  elements.modalBody.appendChild(saveRow);

  const projectSelect = elements.modalBody.querySelector("#projectSelect");
  projectSelect.addEventListener("change", () => {
    const selected = Array.from(
      projectSelect.querySelectorAll("input[type=\"checkbox\"]:checked")
    ).map((checkbox) => checkbox.value);
    state.projectOverrides[member.no] = selected;
    localStorage.setItem(PROJECT_KEY, JSON.stringify(state.projectOverrides));
    renderTeamFilter();
    applyFilters();
  });

  const button = elements.modalBody.querySelector("#statusToggle");
  button.addEventListener("click", () => {
    if (getStatus(member) === "inactive") {
      delete state.statusOverrides[member.no];
    } else {
      state.statusOverrides[member.no] = "inactive";
    }
    localStorage.setItem(STATUS_KEY, JSON.stringify(state.statusOverrides));
    updateStats();
    applyFilters();
    elements.modal.close();
  });

  const saveButton = elements.modalBody.querySelector("#saveMember");
  saveButton.addEventListener("click", () => {
    const edits = {
      name_en: elements.modalBody.querySelector("#editNameEn").value.trim(),
      name_ko: elements.modalBody.querySelector("#editNameKo").value.trim(),
      title: elements.modalBody.querySelector("#editRole").value.trim(),
      start_date: elements.modalBody.querySelector("#editStart").value.trim(),
      email_work: elements.modalBody.querySelector("#editWorkEmail").value.trim(),
      email_personal: elements.modalBody.querySelector("#editPersonalEmail").value.trim(),
      phone: elements.modalBody.querySelector("#editPhone").value.trim(),
      address: elements.modalBody.querySelector("#editAddress").value.trim(),
    };
    state.memberEdits[member.no] = edits;
    Object.assign(member, edits);
    localStorage.setItem(MEMBER_EDITS_KEY, JSON.stringify(state.memberEdits));
    updateStats();
    applyFilters();
    elements.modal.close();
  });

  elements.modal.showModal();
};

const renderProjectList = () => {
  if (!state.projectOptions.length) {
    elements.projectList.innerHTML = "<span>No projects yet.</span>";
    return;
  }

  elements.projectList.innerHTML = state.projectOptions
    .map(
      (project) => `
      <span class="project-pill">
        ${project}
        <button type="button" data-project="${project}">×</button>
      </span>
    `
    )
    .join("");
};

const syncProjectOptions = () => {
  const base = state.members.map((member) => member.organization).filter(Boolean);
  const custom = state.projectOptions || [];
  const merged = Array.from(new Set([...base, ...custom])).sort();
  state.projectOptions = merged;
  localStorage.setItem(PROJECT_LIST_KEY, JSON.stringify(state.projectOptions));
  renderTeamFilter();
  renderProjectList();
};

const addProject = (value) => {
  const name = value.trim();
  if (!name) return;
  if (!state.projectOptions.includes(name)) {
    state.projectOptions.push(name);
    syncProjectOptions();
  }
  elements.projectInput.value = "";
};

const removeProject = (name) => {
  state.projectOptions = state.projectOptions.filter((project) => project !== name);
  Object.keys(state.projectOverrides).forEach((key) => {
    if (state.projectOverrides[key] === name) {
      delete state.projectOverrides[key];
    }
  });
  localStorage.setItem(PROJECT_KEY, JSON.stringify(state.projectOverrides));
  syncProjectOptions();
  applyFilters();
};

const renderOnboarding = () => {
  if (!state.onboardings.length) {
    elements.onboardingList.innerHTML = "<p>No onboarding checklists yet.</p>";
    return;
  }

  elements.onboardingList.innerHTML = state.onboardings
    .map((item) => {
      const total = item.checklist.length;
      const done = item.checklist.filter((task) => task.done).length;
      const percent = total ? Math.round((done / total) * 100) : 0;
      return `
        <div class="onboarding-card" data-id="${item.id}">
          <div class="onboarding-head">
            <div>
              <div class="onboarding-title">${item.name || "New hire"}</div>
              <div class="onboarding-meta">
                ${item.startDate || "—"} · ${item.email || "—"}
              </div>
            </div>
            <div class="progress">
              ${percent}% complete
              <span class="progress-bar"><span style="width:${percent}%"></span></span>
            </div>
          </div>
          <div class="checklist">
            ${item.checklist
              .map(
                (task, index) => `
                <label class="checklist-item ${task.done ? "done" : ""}">
                  <input type="checkbox" data-index="${index}" ${
                    task.done ? "checked" : ""
                  } />
                  <span>${task.label}</span>
                  <span class="task-tag ${task.mode || "auto"}">${
                    (task.mode || "auto").toUpperCase()
                  }</span>
                  ${
                    (task.mode || "auto") === "auto"
                      ? `<button class="run-btn" type="button" data-action="run" data-index="${index}" title="Run automation">⚡</button>`
                      : ""
                  }
                </label>
              `
              )
              .join("")}
          </div>
          <div class="onboarding-actions">
            <button class="ghost" data-action="remove">Remove</button>
          </div>
        </div>
      `;
    })
    .join("");
};

const saveOnboarding = () => {
  localStorage.setItem(ONBOARDING_KEY, JSON.stringify(state.onboardings));
};

const normalizeChecklist = (checklist = []) => {
  const expanded = [];
  checklist.forEach((task) => {
    if (typeof task === "string") {
      if (task === LEGACY_REGISTRATION) {
        const legacyTasks = [
          "토카막 캘린더 수락(메일함)",
          "구글 드라이브 내 '공유 문서함' 클릭 -> 내 드라이브로 바로가기 클릭(메일함_공유)",
          "레코딩 셋업(입사자 계정으로 구글 로그인하여 진행)",
        ];
        legacyTasks.forEach((label) => {
          expanded.push({
            label,
            mode: TEMPLATE_MODE_MAP[label] || "auto",
            done: false,
          });
        });
      } else {
        expanded.push({
          label: task,
          mode: TEMPLATE_MODE_MAP[task] || "auto",
          done: false,
        });
      }
      return;
    }

    if (task && task.label === LEGACY_REGISTRATION) {
      const legacyTasks = [
        "토카막 캘린더 수락(메일함)",
        "구글 드라이브 내 '공유 문서함' 클릭 -> 내 드라이브로 바로가기 클릭(메일함_공유)",
        "레코딩 셋업(입사자 계정으로 구글 로그인하여 진행)",
      ];
      legacyTasks.forEach((label) => {
        expanded.push({
          label,
          mode: TEMPLATE_MODE_MAP[label] || "auto",
          done: Boolean(task.done),
        });
      });
      return;
    }

    if (task && task.label) {
      expanded.push({
        label: task.label,
        mode: task.mode || TEMPLATE_MODE_MAP[task.label] || "auto",
        done: Boolean(task.done),
      });
    }
  });

  return expanded;
};

const normalizeOnboarding = (items = []) => {
  return items.map((item) => ({
    ...item,
    checklist: normalizeChecklist(item.checklist),
  }));
};

const addOnboarding = () => {
  const name = elements.onboardName.value.trim();
  const startDate = elements.onboardStart.value;
  const email = elements.onboardEmail.value.trim();
  const role = elements.onboardRole.value.trim();
  const personalEmail = elements.onboardPersonalEmail.value.trim();
  const phone = elements.onboardPhone.value.trim();
  const address = elements.onboardAddress.value.trim();
  if (!name) return;

  const newMember = {
    no: `local-${Date.now()}`,
    start_date: startDate,
    name_en: name,
    name_ko: "",
    organization: "",
    title: role,
    email_work: email,
    email_personal: personalEmail,
    phone,
    address,
  };

  state.addedMembers.push(newMember);
  localStorage.setItem(ADDED_MEMBERS_KEY, JSON.stringify(state.addedMembers));
  state.members = sortByStartDate([...state.members, newMember]);

  state.onboardings.unshift({
    id: `${Date.now()}`,
    name,
    startDate,
    email,
    checklist: ONBOARDING_TEMPLATE.map((task) => ({
      label: task.label,
      mode: task.mode,
      done: false,
    })),
  });

  elements.onboardName.value = "";
  elements.onboardStart.value = "";
  elements.onboardEmail.value = "";
  elements.onboardRole.value = "";
  elements.onboardPersonalEmail.value = "";
  elements.onboardPhone.value = "";
  elements.onboardAddress.value = "";
  saveOnboarding();
  updateStats();
  syncProjectOptions();
  applyFilters();
  renderOnboarding();
};

const attachRowHandlers = () => {
  elements.table.addEventListener("click", (event) => {
    const row = event.target.closest("tr");
    if (!row) return;
    const member = state.filtered.find((item) => item.no === row.dataset.no);
    if (member) openModal(member);
  });
};

const loadData = async () => {
  const response = await fetch("data/team_members.json");
  const payload = await response.json();
  state.members = payload.members || [];
  state.memberEdits = JSON.parse(
    localStorage.getItem(MEMBER_EDITS_KEY) || "{}"
  );
  state.statusOverrides = JSON.parse(
    localStorage.getItem(STATUS_KEY) || "{}"
  );
  state.projectOverrides = JSON.parse(
    localStorage.getItem(PROJECT_KEY) || "{}"
  );
  state.projectOptions = JSON.parse(
    localStorage.getItem(PROJECT_LIST_KEY) || "[]"
  );
  state.onboardings = JSON.parse(
    localStorage.getItem(ONBOARDING_KEY) || "[]"
  );
  state.onboardings = normalizeOnboarding(state.onboardings);
  state.addedMembers = JSON.parse(
    localStorage.getItem(ADDED_MEMBERS_KEY) || "[]"
  );
  state.members = sortByStartDate([...state.members, ...state.addedMembers]).map(
    applyMemberEdits
  );
  state.filtered = [...state.members];

  elements.lastSynced.textContent = payload.generated_at
    ? formatDate(new Date(payload.generated_at))
    : formatDate(new Date());

  updateStats();
  syncProjectOptions();
  applyFilters();
  renderOnboarding();
};

const init = () => {
  loadData();
  attachRowHandlers();
  elements.searchInput.addEventListener("input", applyFilters);
  [elements.teamFilter, elements.statusFilter, elements.rndFilter].forEach((input) =>
    input.addEventListener("change", applyFilters)
  );
  elements.pageButtons.forEach((btn) =>
    btn.addEventListener("click", () => setPage(btn.dataset.page))
  );
  elements.refreshButton.addEventListener("click", loadData);
  elements.closeModal.addEventListener("click", () => elements.modal.close());
  elements.addProjectButton.addEventListener("click", () =>
    addProject(elements.projectInput.value)
  );
  elements.projectInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") addProject(elements.projectInput.value);
  });
  elements.projectList.addEventListener("click", (event) => {
    const btn = event.target.closest("button[data-project]");
    if (!btn) return;
    removeProject(btn.dataset.project);
  });
  elements.addOnboardButton.addEventListener("click", addOnboarding);
  elements.onboardingList.addEventListener("change", (event) => {
    const card = event.target.closest(".onboarding-card");
    if (!card) return;
    const id = card.dataset.id;
    const index = Number(event.target.dataset.index);
    const item = state.onboardings.find((entry) => entry.id === id);
    if (!item || Number.isNaN(index)) return;
    item.checklist[index].done = event.target.checked;
    saveOnboarding();
    renderOnboarding();
  });
  elements.onboardingList.addEventListener("click", (event) => {
    const card = event.target.closest(".onboarding-card");
    if (!card) return;
    const action = event.target.dataset.action;
    if (action === "remove") {
      state.onboardings = state.onboardings.filter((item) => item.id !== card.dataset.id);
      saveOnboarding();
      renderOnboarding();
      return;
    }
    if (action === "run") {
      const id = card.dataset.id;
      const index = Number(event.target.dataset.index);
      const item = state.onboardings.find((entry) => entry.id === id);
      if (!item || Number.isNaN(index)) return;
      item.checklist[index].done = true;
      saveOnboarding();
      renderOnboarding();
    }
  });
  setPage("overview");
};

init();

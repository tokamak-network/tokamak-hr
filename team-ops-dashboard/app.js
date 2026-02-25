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
  activationSelectedId: null,
};

const elements = {
  table: document.getElementById("teamTable"),
  searchInput: document.getElementById("searchInput"),
  teamFilter: document.getElementById("teamFilter"),
  statusFilter: document.getElementById("statusFilter"),
  rndFilter: document.getElementById("rndFilter"),
  pageButtons: document.querySelectorAll(".page-btn"),
  statActive: document.getElementById("statActive"),
  statUpcoming: document.getElementById("statUpcoming"),
  statOnboarding: document.getElementById("statOnboarding"),
  statInactive: document.getElementById("statInactive"),
  lastSynced: document.getElementById("lastSynced"),
  refreshButton: document.getElementById("refreshButton"),
  overviewSection: document.getElementById("overviewSection"),
  directorySection: document.getElementById("directorySection"),
  directoryTitle: document.getElementById("directoryTitle"),
  activationSection: document.getElementById("activationSection"),
  activationList: document.getElementById("activationList"),
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
  emailModal: document.getElementById("emailModal"),
  emailModalBody: document.getElementById("emailModalBody"),
  closeEmailModal: document.getElementById("closeEmailModal"),
  markEmailsSent: document.getElementById("markEmailsSent"),
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
  { label: "회사 계정 생성", mode: "manual" },
  { label: "근로계약서/연봉계약서/보안서약서 발송", mode: "manual" },
  {
    label: "HR 캘린더 반영 1: 입사일/수습종료일 일정 생성",
    mode: "manual",
  },
  {
    label: "개인별 폴더 생성 (구글 드라이브 -> Personal folder / Recording folder)",
    mode: "manual",
  },
  { label: "Tokamak 폴더 권한 부여", mode: "manual" },
  { label: "슬랙 채널 초대", mode: "manual" },
  { label: "토카막 캘린더 수락(메일함)", mode: "manual" },
  {
    label:
      "구글 드라이브 내 '공유 문서함' 클릭 -> 내 드라이브로 바로가기 클릭(메일함_공유)",
    mode: "manual",
  },
  { label: "레코딩 셋업(입사자 계정으로 구글 로그인하여 진행)", mode: "manual" },
  { label: "HR 공지 채널에 입사 안내 슬랙 공지", mode: "manual" },
  { label: "온보딩 메일 발송(3개)", mode: "auto" },
  { label: "필수 제출 서류 제출 F/U", mode: "manual" },
  {
    label:
      "수습 종료 프로세스 일정 세팅 (서치펌 -> 6주째 때로 일정 생성) * 8주 이내로 평가 필요",
    mode: "manual",
  },
  { label: "All thing eye 신규 입사자 추가", mode: "manual" },
  { label: "All thing eye > Welcome package 발송", mode: "manual" },
  { label: "굿즈 발송 및 인증", mode: "manual" },
];

const LEGACY_REGISTRATION =
  "등록절차(회사 계정생성, 툴 초대, 레코딩셋업)";

const TEMPLATE_MODE_MAP = ONBOARDING_TEMPLATE.reduce((acc, item) => {
  acc[item.label] = item.mode;
  return acc;
}, {});

const SENDER_EMAIL = "irene@tokamak.network";
const EMAIL_TASK_LABEL = "온보딩 메일 발송(3개)";
const EMAIL_TEMPLATES = [
  {
    subject: "[Tokamak Network] 1. Onboarding Documents",
    body: `Dear {Name},
This is HR from Tokamak Network :)

Now, there are some documents you need to share with us in advance before we proceed with the contract process.

1. Personal Information Collection and Usage Agreement (attached)
- Please sign it through the drawing function in PDF

2. Certificate of graduation(or Certificate of the expectant graduation)

3. Attestation of qualifications and awards you included on your resume

4. Passport scan copy(Passport(ID) photo(.png))

5. First Name / Last(Family) Name

6. Nationality

7. Date of birth

8. Telephone number 

9. Emergency Contact

10. Personal Email

11. Address of living + Postal code

12. Metamask Erc 20 address


Could you prepare these within 1week? (But the sooner the better.)

Best Regards,
Tokamak Network.`,
  },
  {
    subject: "[Tokamak Network] 2. Onboarding Process",
    body: `Hi  {Name},

Welcome to the team! The entire team of Tokamak Network is thrilled to welcome you on board.
The procedure for working contracts and employee registration is as follows.


[Following Step]

1. Information related company tools and To do list
* Your ID is: {WorkEmail}
* Your PW is : hellotokamak


1-1). Please download Chrome(*All crews always  work with Google Chrome) 
: Please Check your Google emails. Login with your company account


1-2). Google Drive and Google Calendar: Please sign in to Gmail with your company account
: We always use Google Drive & Google Calendars as working tools
- Please check calendar invitations in the mailbox and add all calendars on your Google calendar by accepting all.


1-3). Please download the Slack and login with your company account ID
- We always use slack as a communication app with team members.
- You can check the invitation mail from Slack(Jaden&Irene) in your mailbox 
- Please accept and join all channels that we invited you to.


2. Onboarding day
2-1). Start date: {StartDate}
2-2). Your working hours : It's up to you (Regular working hours : 9/10am-6/7pm)


See you on onboarding day! :)


Best Regards,
Tokamak Network.`,
  },
  {
    subject: "[Tokamak Network] 3. Welcome package",
    body: `Dear {Name},

We are delighted to welcome you to the team and look forward to working with you soon. 
As part of your onboarding, our HR team will be preparing and sending your Tokamak welcome package.

To ensure smooth delivery, kindly provide the following information at your earliest convenience:
Name : 
Passport Name : 
Full Address (including country and city) : 
Postal Code (Zip Code) : 
Phone Number : 
Personal Email Address : 
Your T-shirt size : 

Please double-check each detail to ensure accurate delivery.

Once you receive the welcome package, we would appreciate it if you could notify the HR team to confirm receipt.

Should you have any questions during this process, feel free to reach out at any time. 
We are here to support you every step of the way, and we are excited to have you with us soon.

Warm regards,
Tokamak Network.`,
  },
];

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

const formatDateInput = (date) => {
  if (!date) return "";
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const normalizeDateOnly = (date) => {
  if (!date) return null;
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

const getDueDate = (startDate, days) => {
  const parsed = parseDate(startDate);
  if (!parsed) return "";
  const due = new Date(parsed.getTime() + days * MS_IN_DAY);
  return formatDateInput(due);
};

const getDdayLabel = (dateValue) => {
  const parsed = parseDate(dateValue);
  if (!parsed) return "—";
  const today = normalizeDateOnly(new Date());
  const due = normalizeDateOnly(parsed);
  const diff = Math.round((due - today) / MS_IN_DAY);
  if (diff === 0) return "D-0";
  if (diff > 0) return `D-${diff}`;
  return `D+${Math.abs(diff)}`;
};

const getDayDiff = (startValue, endValue) => {
  const start = normalizeDateOnly(parseDate(startValue));
  const end = normalizeDateOnly(parseDate(endValue));
  if (!start || !end) return null;
  return Math.round((end - start) / MS_IN_DAY);
};

const updateStats = () => {
  const activeCount = state.members.filter(
    (member) => getStatus(member) !== "inactive"
  ).length;
  elements.statActive.textContent = activeCount.toString();

  const upcoming = state.members.filter((member) => getStatus(member) === "upcoming");
  elements.statUpcoming.textContent = upcoming.length.toString();

  elements.statOnboarding.textContent = state.onboardings.length.toString();

  const activationInProgress = state.onboardings.filter((item) => {
    const mini = item.mini_os || {};
    return !(mini.deliverable_done && mini.share_done);
  }).length;
  elements.statInactive.textContent = activationInProgress.toString();
};

const setPage = (nextPage) => {
  state.page = nextPage;
  elements.pageButtons.forEach((btn) =>
    btn.classList.toggle("active", btn.dataset.page === nextPage)
  );

  const onOverview = nextPage === "overview";
  const onOnboarding = nextPage === "onboarding";
  const onActivation = nextPage === "activation";
  elements.overviewSection.hidden = !onOverview;
  elements.directorySection.hidden = onOverview || onOnboarding || onActivation;
  elements.onboardingSection.hidden = !onOnboarding;
  elements.activationSection.hidden = !onActivation;

  if (!onOverview && !onOnboarding && !onActivation) {
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
      '<tr><td colspan="11">No matching team members.</td></tr>';
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
          <td>${
            member.github_username
              ? `<a class="link" href="https://github.com/${member.github_username}" target="_blank" rel="noreferrer">${member.github_username}</a>`
              : "—"
          }</td>
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
      <div class="modal-label">GitHub username</div>
      <div><input id="editGithub" type="text" value="${member.github_username || ""}" /></div>
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
      github_username: elements.modalBody.querySelector("#editGithub").value.trim(),
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
                  <span>${index + 1}. ${task.label}</span>
                  <span class="task-tag ${task.mode || "manual"}">${
                    (task.mode || "manual").toUpperCase()
                  }</span>
                  ${
                    (task.mode || "manual") === "auto"
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

const escapeHtml = (value) => {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
};

const fillTemplate = (text, data) => {
  return text
    .replace(/\{Name\}/g, data.name || "")
    .replace(/\{name\}/g, (data.name || "").toLowerCase().replace(/\s+/g, ""))
    .replace(/\{StartDate\}/g, data.startDate || "")
    .replace(/\{WorkEmail\}/g, data.workEmail || "");
};

const buildMailto = (subject, body, recipients) => {
  const to = encodeURIComponent(recipients.join(","));
  const params = new URLSearchParams({
    subject,
    body,
    from: SENDER_EMAIL,
  });
  return `mailto:${to}?${params.toString()}`;
};

const openEmailModal = (onboarding, taskIndex) => {
  const recipients = [onboarding.email, onboarding.personalEmail].filter(Boolean);
  const data = {
    name: onboarding.name,
    startDate: onboarding.startDate,
    workEmail: onboarding.email,
  };

  elements.emailModalBody.innerHTML = EMAIL_TEMPLATES.map((template, idx) => {
    const subject = fillTemplate(template.subject, data);
    const body = fillTemplate(template.body, data);
    return `
      <div class="email-card" data-email-index="${idx}">
        <h3>Email ${idx + 1}</h3>
        <div class="email-meta">From: ${escapeHtml(
          SENDER_EMAIL
        )} · To: ${escapeHtml(recipients.join(", "))}</div>
        <div class="email-meta">Subject</div>
        <input class="email-subject" type="text" value="${escapeHtml(subject)}" />
        <div class="email-meta">Body</div>
        <textarea class="email-body-input" rows="8">${escapeHtml(body)}</textarea>
        <div class="email-actions">
          <button class="email-link" type="button" data-action="open-draft">
            Open draft
          </button>
        </div>
      </div>
    `;
  }).join("");

  elements.markEmailsSent.dataset.id = onboarding.id;
  elements.markEmailsSent.dataset.index = String(taskIndex);
  elements.emailModal.showModal();
};

const normalizeChecklist = (checklist = []) => {
  const expanded = [];
  checklist.forEach((task) => {
    const normalizeLabel = (label) => {
      if (
        label ===
        "캘린더 반영2: HR General OT(입사자이름)_Irene,입사자 -> Tokamak call로 반영"
      ) {
        return null;
      }
      if (
        label ===
        "HR 캘린더 반영1: 수습시작일 / 수습종료일(3개월-1일) 일정 설정"
      ) {
        return "HR 캘린더 반영 1: 입사일/수습종료일 일정 생성";
      }
      if (label === "온보딩 메일 발송 (2개) -> 굿즈 발송 관련도 안내") {
        return "온보딩 메일 발송(3개)";
      }
      return label;
    };

    if (typeof task === "string") {
      if (task === LEGACY_REGISTRATION) {
        const legacyTasks = [
          "토카막 캘린더 수락(메일함)",
          "구글 드라이브 내 '공유 문서함' 클릭 -> 내 드라이브로 바로가기 클릭(메일함_공유)",
          "레코딩 셋업(입사자 계정으로 구글 로그인하여 진행)",
        ];
        legacyTasks.forEach((label) => {
          const normalized = normalizeLabel(label);
          if (!normalized) return;
          expanded.push({
            label: normalized,
            mode: TEMPLATE_MODE_MAP[normalized] || "manual",
            done: false,
          });
        });
      } else {
        const normalized = normalizeLabel(task);
        if (!normalized) return;
        expanded.push({
          label: normalized,
          mode: TEMPLATE_MODE_MAP[normalized] || "manual",
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
        const normalized = normalizeLabel(label);
        if (!normalized) return;
        expanded.push({
          label: normalized,
          mode: TEMPLATE_MODE_MAP[normalized] || "manual",
          done: Boolean(task.done),
        });
      });
      return;
    }

    if (task && task.label) {
      const normalized = normalizeLabel(task.label);
      if (!normalized) return;
        expanded.push({
          label: normalized,
          mode: TEMPLATE_MODE_MAP[normalized] || task.mode || "manual",
          done: Boolean(task.done),
        });
    }
  });

  return expanded;
};

const normalizeOnboarding = (items = []) => {
  return items.map((item) => {
    const startDate = item.startDate || item.start_date || "";
    const miniData = item.mini_os || {};
    const improvData = item.improvement || {};
    const miniDue = miniData.due_date || getDueDate(startDate, 14);
    const improvDue = improvData.due_date || getDueDate(startDate, 30);
    const memoLink = improvData.memo_link || improvData.memo || "";
    return {
      ...item,
      checklist: normalizeChecklist(item.checklist),
      mini_os: {
        due_date: miniDue,
        deliverable_type: "",
        deliverable_link: "",
        share_link: "",
        deliverable_done: false,
        share_done: false,
        pr_merged: false,
        activity_suggestions: [],
        pr_summary: "",
        pr_title: "",
        pr_status: "",
        pr_files: "",
        pr_last_analyzed: "",
        note: "",
        ...miniData,
        due_date: miniDue,
        pr_merged: typeof miniData.pr_merged === "boolean" ? miniData.pr_merged : false,
      },
      improvement: {
        memo_link: memoLink,
        due_date: improvDue,
        issues: "",
        suggestion: "",
        difficulty: "Low",
        impact: "",
        submitted: false,
        ...improvData,
        memo_link: memoLink,
        due_date: improvDue,
      },
    };
  });
};

const findMemberForOnboarding = (item) => {
  const email = (item.email || "").toLowerCase();
  const personalEmail = (item.personalEmail || "").toLowerCase();
  const name = (item.name || "").toLowerCase();
  return state.members.find((member) => {
    const work = (member.email_work || "").toLowerCase();
    const personal = (member.email_personal || "").toLowerCase();
    const memberName = (member.name_en || "").toLowerCase();
    return (
      (email && work === email) ||
      (personalEmail && personal === personalEmail) ||
      (name && memberName === name)
    );
  });
};

const syncOnboardingDatesFromMembers = () => {
  let updated = false;
  state.onboardings.forEach((item) => {
    const member = findMemberForOnboarding(item);
    const memberStart = member ? member.start_date : "";
    if (!item.startDate && memberStart) {
      item.startDate = memberStart;
      updated = true;
    }
    if (item.startDate) {
      item.mini_os = item.mini_os || {};
      const miniDue = item.mini_os.due_date;
      const miniDiff = miniDue ? getDayDiff(item.startDate, miniDue) : null;
      if (!miniDue || (miniDiff !== null && miniDiff <= 2)) {
        item.mini_os.due_date = getDueDate(item.startDate, 14);
        updated = true;
      }
      item.improvement = item.improvement || {};
      const improvDue = item.improvement.due_date;
      const improvDiff = improvDue ? getDayDiff(item.startDate, improvDue) : null;
      if (!improvDue || (improvDiff !== null && improvDiff <= 2)) {
        item.improvement.due_date = getDueDate(item.startDate, 30);
        updated = true;
      }
    }
  });
  if (updated) saveOnboarding();
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
    personalEmail,
      mini_os: {
        due_date: getDueDate(startDate, 14),
        deliverable_type: "",
        deliverable_link: "",
        share_link: "",
        deliverable_done: false,
        share_done: false,
        pr_merged: false,
        activity_suggestions: [],
        pr_summary: "",
        pr_title: "",
        pr_status: "",
        pr_files: "",
      pr_last_analyzed: "",
      note: "",
    },
    improvement: {
      memo_link: "",
      due_date: getDueDate(startDate, 30),
      issues: "",
      suggestion: "",
      difficulty: "Low",
      impact: "",
      submitted: false,
    },
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
  renderActivation();
};

const renderActivation = () => {
  if (!state.onboardings.length) {
    elements.activationList.innerHTML = "<p>No onboarding records yet.</p>";
    return;
  }

  syncOnboardingDatesFromMembers();

  if (!state.activationSelectedId) {
    state.activationSelectedId = state.onboardings[0].id;
  }
  const selected = state.onboardings.find(
    (item) => item.id === state.activationSelectedId
  );
  const selectedItem = selected || state.onboardings[0];
  state.activationSelectedId = selectedItem.id;

  const renderDetail = (item) => {
    const member = findMemberForOnboarding(item);
    const github = member?.github_username || "";
    const mini = item.mini_os || {};
    const improv = item.improvement || {};
    const startDate = item.startDate || "";
    const dueDate = mini.due_date || getDueDate(startDate, 14);
    const progressCount = [mini.deliverable_done, mini.share_done].filter(Boolean)
      .length;
    const progressLabel = progressCount === 2 ? "Done" : `${progressCount}/2`;
    const progressClass = progressCount === 2 ? "badge--done" : "badge--open";
    return `
      <div class="activation-card" data-id="${item.id}">
        <div class="activation-head">
          <div>
            <div class="activation-title">${item.name || "New hire"}</div>
            <div class="activation-meta">${item.startDate || "—"} · ${
      item.email || "—"
    }${github ? ` · <a class="link" href="https://github.com/${github}" target="_blank" rel="noreferrer">${github}</a>` : ""}</div>
          </div>
        </div>

        <div class="activation-section">
          <h4 class="activation-title-lg">🧩 Onboarding Mission1 (2weeks)</h4>
          <p class="activation-note">
            Within two weeks of joining, complete one development contribution that benefits the Tokamak ecosystem and share it publicly.
          </p>
          <div class="activation-mission">
            <div class="mission-item">
              <span>Start</span>
              <strong>${startDate || "—"}</strong>
            </div>
            <div class="mission-item">
              <span>Mission due</span>
              <strong>${dueDate || "—"}</strong>
            </div>
            <div class="mission-item">
              <span>D-day</span>
              <strong>${getDdayLabel(dueDate)}</strong>
            </div>
            <div class="mission-item">
              <span>Progress</span>
              <strong class="badge ${progressClass}">${progressLabel}</strong>
            </div>
          </div>
          <div class="activation-grid">
            <div class="activation-field">
              <label>Deliverable type</label>
              <input type="text" class="activation-input" data-field="mini.deliverable_type" placeholder="Code / Doc / Research" value="${escapeHtml(
                mini.deliverable_type || ""
              )}" />
            </div>
            <div class="activation-field">
              <label>Deliverable link (GitHub/Doc)</label>
              <div class="activation-link-row">
                <input type="url" class="activation-input" data-field="mini.deliverable_link" placeholder="PR / Doc / Notion link" value="${escapeHtml(
                  mini.deliverable_link || ""
                )}" />
                <button class="activation-btn" type="button" data-action="analyze-pr">
                  Analyze PR
                </button>
              </div>
            </div>
            <div class="activation-field">
              <label>Public share link (Slack)</label>
              <input type="url" class="activation-input" data-field="mini.share_link" placeholder="Slack thread / public post" value="${escapeHtml(
                mini.share_link || ""
              )}" />
            </div>
          </div>
          <div class="activation-suggest">
            <button class="activation-btn ghost" type="button" data-action="fetch-github">
              Fetch from GitHub
            </button>
            ${
              (mini.activity_suggestions || []).length
                ? `<div class="activation-suggest-list">
                    ${(mini.activity_suggestions || [])
                      .map(
                        (activity, idx) => `
                      <button class="activation-suggest-item" type="button" data-action="use-activity" data-link="${escapeHtml(
                        activity.url
                      )}" data-type="${escapeHtml(activity.type)}">
                        <span>${escapeHtml(activity.type)} ${idx + 1}</span>
                        <strong>${escapeHtml(activity.title || activity.url)}</strong>
                        <em>${escapeHtml(activity.repo || "")}</em>
                      </button>
                    `
                      )
                      .join("")}
                  </div>`
                : `<span class="activation-suggest-hint">No suggestions yet. Fetch recent PRs/commits.</span>`
            }
          </div>
          <div class="activation-status">
            <label>
              <input type="checkbox" data-field="mini.deliverable_done" ${
                mini.deliverable_done ? "checked" : ""
              } />
              Deliverable done
            </label>
            <label>
              <input type="checkbox" data-field="mini.share_done" ${
                mini.share_done ? "checked" : ""
              } />
              Public share done
            </label>
          </div>
          <div class="activation-summary">
            <div class="activation-summary-head">
              <strong>PR Summary</strong>
              <span>${escapeHtml(mini.pr_last_analyzed || "")}</span>
            </div>
            <p class="activation-summary-meta">${escapeHtml(mini.pr_title || "")}</p>
            <p class="activation-summary-meta">${escapeHtml(mini.pr_status || "")}</p>
            <p class="activation-summary-meta">Merge: ${mini.pr_merged ? "Merged" : "Not merged"}</p>
            <p class="activation-summary-meta">${escapeHtml(mini.pr_files || "")}</p>
            <p class="activation-summary-body">${escapeHtml(mini.pr_summary || "")}</p>
          </div>
        </div>

        <div class="activation-section">
          <h4>🔧 Improvement Incubator (30-day memo)</h4>
          <p class="activation-note">
            1-page Improvement Memo within 30 days. HR aggregates for the quarterly
            Newcomer Insight Report.
          </p>
          <div class="activation-grid">
            <div class="activation-field">
              <label>Due date</label>
              <input type="date" class="activation-input" data-field="improv.due_date" value="${improv.due_date || ""}" />
            </div>
            <div class="activation-field">
              <label>Memo link</label>
              <input type="url" class="activation-input" data-field="improv.memo_link" placeholder="Notion/Doc link" value="${escapeHtml(
                improv.memo_link || ""
              )}" />
            </div>
            <div class="activation-field">
              <label>Inefficiencies (2)</label>
              <textarea class="activation-textarea" data-field="improv.issues" placeholder="Two inefficiencies noticed">${escapeHtml(
                improv.issues || ""
              )}</textarea>
            </div>
            <div class="activation-field">
              <label>Suggestion</label>
              <textarea class="activation-textarea" data-field="improv.suggestion" placeholder="Proposed improvements">${escapeHtml(
                improv.suggestion || ""
              )}</textarea>
            </div>
            <div class="activation-field">
              <label>Difficulty</label>
              <select class="activation-select" data-field="improv.difficulty">
                ${["Low", "Mid", "High"]
                  .map(
                    (level) =>
                      `<option value="${level}" ${
                        level === (improv.difficulty || "Low") ? "selected" : ""
                      }>${level}</option>`
                  )
                  .join("")}
              </select>
            </div>
            <div class="activation-field">
              <label>Expected impact</label>
              <textarea class="activation-textarea" data-field="improv.impact" placeholder="Expected effect">${escapeHtml(
                improv.impact || ""
              )}</textarea>
            </div>
          </div>
          <div class="activation-status">
            <label>
              <input type="checkbox" data-field="improv.submitted" ${
                improv.submitted ? "checked" : ""
              } />
              Memo submitted
            </label>
          </div>
        </div>
      </div>
    `;
  };

  const listMarkup = state.onboardings
    .map((item) => {
      const member = findMemberForOnboarding(item);
      const github = member?.github_username || "";
      const mini = item.mini_os || {};
      const progressCount = [mini.deliverable_done, mini.share_done].filter(Boolean)
        .length;
      const progressLabel = progressCount === 2 ? "Done" : `${progressCount}/2`;
      const isActive = item.id === selectedItem.id;
      return `
        <button class="activation-person ${isActive ? "active" : ""}" type="button" data-action="select-activation" data-id="${item.id}">
          <div class="activation-person-name">${item.name || "New hire"}</div>
          <div class="activation-person-meta">${item.startDate || "—"}${
        github ? ` · ${github}` : ""
      }</div>
          <div class="activation-person-progress">${progressLabel}</div>
        </button>
      `;
    })
    .join("");

  elements.activationList.innerHTML = `
    <div class="activation-layout">
      <div class="activation-sidebar">
        <p class="activation-sidebar-title">New hires</p>
        <div class="activation-person-list">
          ${listMarkup}
        </div>
      </div>
      <div class="activation-detail">
        ${renderDetail(selectedItem)}
      </div>
    </div>
  `;
};

const attachRowHandlers = () => {
  elements.table.addEventListener("click", (event) => {
    if (event.target.closest("a")) return;
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
  renderActivation();
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
      const task = item.checklist[index];
      if (task.label === EMAIL_TASK_LABEL) {
        const payload = {
          name: item.name,
          start_date: item.startDate || "",
          work_email: item.email || "",
          personal_email: item.personalEmail || "",
        };
        fetch("http://127.0.0.1:8787/send-onboarding-emails", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
          .then(async (response) => {
            if (!response.ok) {
              const data = await response.json().catch(() => ({}));
              throw new Error(data.error || "Failed to send emails.");
            }
            return response.json();
          })
          .then(() => {
            item.checklist[index].done = true;
            saveOnboarding();
            renderOnboarding();
          })
          .catch((error) => {
            alert(error.message);
          });
        return;
      }
      item.checklist[index].done = true;
      saveOnboarding();
      renderOnboarding();
    }
  });
  elements.closeEmailModal.addEventListener("click", () => elements.emailModal.close());
  elements.emailModalBody.addEventListener("click", (event) => {
    const action = event.target.dataset.action;
    if (action !== "open-draft") return;
    const card = event.target.closest(".email-card");
    if (!card) return;
    const subject = card.querySelector(".email-subject").value;
    const body = card.querySelector(".email-body-input").value;
    const id = elements.markEmailsSent.dataset.id;
    const item = state.onboardings.find((entry) => entry.id === id);
    if (!item) return;
    const recipients = [item.email, item.personalEmail].filter(Boolean);
    const mailto = buildMailto(subject, body, recipients);
    window.location.href = mailto;
  });
  elements.markEmailsSent.addEventListener("click", () => {
    const id = elements.markEmailsSent.dataset.id;
    const index = Number(elements.markEmailsSent.dataset.index);
    const item = state.onboardings.find((entry) => entry.id === id);
    if (!item || Number.isNaN(index)) return;
    item.checklist[index].done = true;
    saveOnboarding();
    renderOnboarding();
    elements.emailModal.close();
  });
  elements.activationList.addEventListener("input", (event) => {
    const card = event.target.closest(".activation-card");
    if (!card) return;
    const id = card.dataset.id;
    const field = event.target.dataset.field;
    const item = state.onboardings.find((entry) => entry.id === id);
    if (!item || !field) return;

    if (field.startsWith("mini.")) {
      const key = field.replace("mini.", "");
      if (event.target.type === "checkbox") {
        item.mini_os[key] = event.target.checked;
      } else {
        item.mini_os[key] = event.target.value;
      }
    }

    if (field.startsWith("improv.")) {
      const key = field.replace("improv.", "");
      if (event.target.type === "checkbox") {
        item.improvement[key] = event.target.checked;
      } else {
        item.improvement[key] = event.target.value;
      }
    }

    saveOnboarding();
  });
  elements.activationList.addEventListener("click", (event) => {
    const actionTarget = event.target.closest("[data-action]");
    const action = actionTarget ? actionTarget.dataset.action : "";
    if (action === "select-activation") {
      const button = event.target.closest("button[data-id]");
      if (!button) return;
      state.activationSelectedId = button.dataset.id;
      renderActivation();
      return;
    }
    if (action === "use-activity") {
      const card = event.target.closest(".activation-card");
      if (!card) return;
      const id = card.dataset.id;
      const item = state.onboardings.find((entry) => entry.id === id);
      if (!item) return;
      const link = actionTarget.dataset.link || "";
      const type = actionTarget.dataset.type || "";
      item.mini_os.deliverable_link = link;
      if (!item.mini_os.deliverable_type && type) {
        item.mini_os.deliverable_type = type;
      }
      saveOnboarding();
      renderActivation();
      return;
    }
    if (action === "fetch-github") {
      const card = event.target.closest(".activation-card");
      if (!card) return;
      const id = card.dataset.id;
      const item = state.onboardings.find((entry) => entry.id === id);
      if (!item) return;
      const member = findMemberForOnboarding(item);
      const username = member?.github_username;
      if (!username) {
        alert("No GitHub username found for this member.");
        return;
      }
      actionTarget.disabled = true;
      actionTarget.textContent = "Fetching...";
      fetch("http://127.0.0.1:8787/github-activity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, days: 14 }),
      })
        .then(async (response) => {
          if (!response.ok) {
            const data = await response.json().catch(() => ({}));
            throw new Error(data.error || "Failed to fetch GitHub activity.");
          }
          return response.json();
        })
        .then((data) => {
          item.mini_os.activity_suggestions = data.items || [];
          saveOnboarding();
          renderActivation();
        })
        .catch((error) => {
          alert(error.message);
        })
        .finally(() => {
          actionTarget.disabled = false;
          actionTarget.textContent = "Fetch from GitHub";
        });
      return;
    }
    if (action !== "analyze-pr") return;
    const card = event.target.closest(".activation-card");
    if (!card) return;
    const id = card.dataset.id;
    const item = state.onboardings.find((entry) => entry.id === id);
    if (!item) return;
    const linkInput = card.querySelector("input[data-field=\"mini.deliverable_link\"]");
    const prUrl = linkInput ? linkInput.value.trim() : "";
    if (!prUrl) {
      alert("Please enter a GitHub PR link first.");
      return;
    }
    actionTarget.disabled = true;
    actionTarget.textContent = "Analyzing...";
    fetch("http://127.0.0.1:8787/summarize-github", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: prUrl }),
    })
      .then(async (response) => {
        if (!response.ok) {
          const data = await response.json().catch(() => ({}));
          throw new Error(data.error || "Failed to summarize PR.");
        }
        return response.json();
      })
      .then((data) => {
        const statusText = data.status || "";
        const isMerged = statusText.toLowerCase() === "merged";
        item.mini_os.pr_summary = data.summary || "";
        item.mini_os.pr_title = data.title || "";
        item.mini_os.pr_status = statusText;
        item.mini_os.pr_files = data.files || "";
        item.mini_os.pr_last_analyzed = data.analyzed_at || "";
        item.mini_os.pr_merged = isMerged;
        if (isMerged) {
          item.mini_os.deliverable_done = true;
        }
        saveOnboarding();
        renderActivation();
      })
      .catch((error) => {
        alert(error.message);
      })
      .finally(() => {
        actionTarget.disabled = false;
        actionTarget.textContent = "Analyze PR";
      });
  });
  setPage("overview");
};

init();

"use strict";
// State
const state = {
  query: "",
  status: "",
  sortKey: "id",
  sortDir: "asc", // 'asc' | 'desc'
  page: 1,
  pageSize: 10,
};

// Elements
const searchInput = document.getElementById("searchInput");
const statusFilter = document.getElementById("statusFilter");
const pageSizeSelect = document.getElementById("pageSize");
const resetFiltersBtn = document.getElementById("resetFilters");

const table = document.getElementById("dataTable");
const tableBody = document.getElementById("tableBody");
const emptyState = document.getElementById("emptyState");
const rangeInfo = document.getElementById("rangeInfo");
const pagination = document.getElementById("pagination");

// Data Generation
const roles = ["مدیر", "کارشناس", "پشتیبانی", "مهمان"];
const statuses = ["فعال", "غیرفعال", "در انتظار"];

function randomItem(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function pad(num) {
  return String(num).padStart(2, "0");
}

function formatDate(date) {
  const d = new Date(date);
  const yyyy = d.getFullYear();
  const mm = pad(d.getMonth() + 1);
  const dd = pad(d.getDate());
  return `${yyyy}/${mm}/${dd}`;
}

function generateUsers(count = 120) {
  const firstNames = [
    "حسین",
    "مریم",
    "رضا",
    "فاطمه",
    "سارا",
    "حمید",
    "الهه",
    "حامد",
    "محمد",
    "نفیسه",
    "هدی",
    "سینا",
    "سهیل",
    "آزاده",
    "پوریا",
    "کیمیا",
    "فرید",
    "رویا",
    "شقایق",
    "سامان",
  ];
  const lastNames = [
    "کاظمی",
    "مرادی",
    "موسوی",
    "قاسمی",
    "کریمی",
    "کاشانی",
    "هاشمی",
    "رستمی",
    "رشیدی",
    "احمدی",
    "نجفی",
    "محمدی",
    "حسینی",
    "اسدی",
    "نوری",
    "خسروی",
    "عابدی",
    "اکبری",
    "جباری",
    "رضایی",
  ];
  const users = [];
  for (let i = 1; i <= count; i++) {
    const first = randomItem(firstNames);
    const last = randomItem(lastNames);
    const name = `${first} ${last}`;
    const email =
      `${first}.${last}.${i}`.replace(/\s/g, "").toLowerCase() + "@example.com";
    const role = randomItem(roles);
    const status = randomItem(statuses);
    const createdAt = new Date(
      Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 365
    );
    users.push({
      id: i,
      name,
      email,
      role,
      status,
      createdAt: createdAt.toISOString(),
    });
  }
  return users;
}

const allData = generateUsers();

// Filtering
function applyFilters(data) {
  const q = state.query.trim().toLowerCase();
  const st = state.status;
  return data.filter((row) => {
    const matchesStatus = st ? row.status === st : true;
    if (!q) return matchesStatus;
    const text =
      `${row.name} ${row.email} ${row.role} ${row.status}`.toLowerCase();
    return matchesStatus && text.includes(q);
  });
}

// Sorting
function compareValues(a, b, key) {
  const va = a[key];
  const vb = b[key];
  if (key === "createdAt") {
    return new Date(va) - new Date(vb);
  }
  if (typeof va === "number" && typeof vb === "number") {
    return va - vb;
  }
  return String(va).localeCompare(String(vb), "fa");
}

function applySort(data) {
  const sorted = [...data].sort((a, b) => compareValues(a, b, state.sortKey));
  if (state.sortDir === "desc") sorted.reverse();
  return sorted;
}

// Pagination helpers
function getTotalPages(total, size) {
  return Math.max(1, Math.ceil(total / size));
}

function getPaged(data) {
  const start = (state.page - 1) * state.pageSize;
  const end = start + state.pageSize;
  return data.slice(start, end);
}

// Rendering
function renderRows(rows) {
  tableBody.innerHTML = rows
    .map((r) => {
      const statusClass =
        r.status === "فعال"
          ? "status-active"
          : r.status === "غیرفعال"
          ? "status-inactive"
          : "status-pending";
      return `
        <tr>
          <td>${r.id}</td>
          <td>${r.name}</td>
          <td>${r.email}</td>
          <td>${r.role}</td>
          <td><span class="status-pill ${statusClass}">${r.status}</span></td>
          <td>${formatDate(r.createdAt)}</td>
        </tr>
      `;
    })
    .join("");
}

function renderPagination(total) {
  const totalPages = getTotalPages(total, state.pageSize);
  state.page = Math.min(state.page, totalPages);

  const buttons = [];
  const createBtn = (label, page, disabled = false, active = false) => `
    <button class="page-btn${active ? " active" : ""}" data-page="${page}" ${
    disabled ? "disabled" : ""
  }>${label}</button>
  `;

  buttons.push(
    createBtn("قبلی", Math.max(1, state.page - 1), state.page === 1)
  );

  const windowSize = 2;
  const start = Math.max(1, state.page - windowSize);
  const end = Math.min(totalPages, state.page + windowSize);

  if (start > 1) {
    buttons.push(createBtn("1", 1, false, state.page === 1));
    if (start > 2) buttons.push(`<span class="page-btn" disabled>…</span>`);
  }

  for (let p = start; p <= end; p++) {
    buttons.push(createBtn(String(p), p, false, p === state.page));
  }

  if (end < totalPages) {
    if (end < totalPages - 1)
      buttons.push(`<span class="page-btn" disabled>…</span>`);
    buttons.push(
      createBtn(
        String(totalPages),
        totalPages,
        false,
        state.page === totalPages
      )
    );
  }

  buttons.push(
    createBtn(
      "بعدی",
      Math.min(totalPages, state.page + 1),
      state.page === totalPages
    )
  );

  pagination.innerHTML = buttons.join("");
}

function render() {
  const filtered = applyFilters(allData);
  const sorted = applySort(filtered);
  const paged = getPaged(sorted);

  emptyState.hidden = filtered.length !== 0;
  table.hidden = filtered.length === 0;

  renderRows(paged);
  renderPagination(filtered.length);

  const from =
    filtered.length === 0 ? 0 : (state.page - 1) * state.pageSize + 1;
  const to = Math.min(filtered.length, state.page * state.pageSize);
  rangeInfo.textContent = `${from} تا ${to} از ${filtered.length}`;

  // Update sort indicators
  document.querySelectorAll("th.sortable").forEach((th) => {
    th.classList.remove("sorted-asc", "sorted-desc");
    const key = th.getAttribute("data-key");
    if (key === state.sortKey) {
      th.classList.add(state.sortDir === "asc" ? "sorted-asc" : "sorted-desc");
    }
  });
}

// Events
function debounce(fn, ms = 300) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(null, args), ms);
  };
}

searchInput.addEventListener(
  "input",
  debounce((e) => {
    state.query = e.target.value;
    state.page = 1;
    render();
  }, 250)
);

statusFilter.addEventListener("change", (e) => {
  state.status = e.target.value;
  state.page = 1;
  render();
});

pageSizeSelect.addEventListener("change", (e) => {
  state.pageSize = Number(e.target.value);
  state.page = 1;
  render();
});

resetFiltersBtn.addEventListener("click", () => {
  state.query = "";
  state.status = "";
  state.page = 1;
  state.sortKey = "id";
  state.sortDir = "asc";
  searchInput.value = "";
  statusFilter.value = "";
  pageSizeSelect.value = String(state.pageSize);
  render();
});

document.querySelectorAll("th.sortable").forEach((th) => {
  th.addEventListener("click", () => {
    const key = th.getAttribute("data-key");
    if (state.sortKey === key) {
      state.sortDir = state.sortDir === "asc" ? "desc" : "asc";
    } else {
      state.sortKey = key;
      state.sortDir = "asc";
    }
    render();
  });
});

pagination.addEventListener("click", (e) => {
  const btn = e.target.closest(".page-btn");
  if (!btn || btn.hasAttribute("disabled")) return;
  const page = Number(btn.getAttribute("data-page"));
  if (!Number.isNaN(page)) {
    state.page = page;
    render();
  }
});

// Initial render
render();

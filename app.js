const loginScreen = document.getElementById("login-screen");
const dashboard = document.getElementById("dashboard");
const loginForm = document.getElementById("login-form");
const loginError = document.getElementById("login-error");
const logoutBtn = document.getElementById("logout");
const listEl = document.getElementById("installation-list");
const doneCount = document.getElementById("done-count");
const progressCount = document.getElementById("progress-count");
const pendingCount = document.getElementById("pending-count");
const lastUpdate = document.getElementById("last-update");

const installations = [
  { id: 1, cliente: "Condomínio Aurora", tecnico: "Equipe Norte", coords: [-23.5505, -46.6333], status: "Pendente" },
  { id: 2, cliente: "Hospital Central", tecnico: "Equipe Sul", coords: [-22.9068, -43.1729], status: "Em andamento" },
  { id: 3, cliente: "Shopping Atlântico", tecnico: "Equipe Leste", coords: [-19.9167, -43.9345], status: "Concluída" },
  { id: 4, cliente: "Parque Industrial", tecnico: "Equipe Oeste", coords: [-25.4284, -49.2733], status: "Pendente" },
];

const statusOptions = ["Pendente", "Em andamento", "Concluída"];
const markerById = new Map();
let map;
let timer;

function setScreen(isLoggedIn) {
  loginScreen.className = isLoggedIn ? "hidden" : "card visible";
  dashboard.className = isLoggedIn ? "visible" : "hidden";

  if (isLoggedIn) {
    if (!map) {
      startMap();
    }
    render();
    startRealtime();
  } else {
    stopRealtime();
  }
}

function auth(username, password) {
  return username === "admin" && password === "1234";
}

function startMap() {
  map = L.map("map").setView([-22.6, -46.6], 5);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  installations.forEach((item) => {
    const marker = L.marker(item.coords).addTo(map);
    markerById.set(item.id, marker);
  });
}

function render() {
  let done = 0;
  let progress = 0;
  let pending = 0;

  listEl.innerHTML = "";

  installations.forEach((item) => {
    if (item.status === "Concluída") done += 1;
    if (item.status === "Em andamento") progress += 1;
    if (item.status === "Pendente") pending += 1;

    const marker = markerById.get(item.id);
    marker.bindPopup(
      `<strong>${item.cliente}</strong><br/>${item.tecnico}<br/>Status: ${item.status}`
    );

    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${item.cliente}</strong><br>
      ${item.tecnico}<br>
      <span class="status ${normalizeStatus(item.status)}">${item.status}</span>
    `;
    listEl.appendChild(li);
  });

  doneCount.textContent = String(done);
  progressCount.textContent = String(progress);
  pendingCount.textContent = String(pending);
  lastUpdate.textContent = `Última atualização: ${new Date().toLocaleTimeString("pt-BR")}`;
}

function normalizeStatus(status) {
  return status
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(" ", "");
}

function startRealtime() {
  stopRealtime();
  timer = setInterval(() => {
    const index = Math.floor(Math.random() * installations.length);
    const nextStatus = statusOptions[Math.floor(Math.random() * statusOptions.length)];
    installations[index].status = nextStatus;
    render();
  }, 3000);
}

function stopRealtime() {
  if (timer) {
    clearInterval(timer);
  }
}

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!auth(username, password)) {
    loginError.textContent = "Usuário ou senha inválidos.";
    return;
  }

  loginError.textContent = "";
  localStorage.setItem("loggedIn", "1");
  setScreen(true);
});

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("loggedIn");
  setScreen(false);
});

setScreen(localStorage.getItem("loggedIn") === "1");

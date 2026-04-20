// Selected Elements
const addBtn = document.querySelector(".add-btn");
const removeBtn = document.querySelector(".remove-btn");
const modalCont = document.querySelector(".modal-cont");
const modalTaskArea = document.querySelector(".textArea-cont");
const mainTicketContainer = document.querySelector(".main-cont");
const allPriorityColors = document.querySelectorAll(".priority-color");
const filterColors = document.querySelectorAll(".toolbox-priority-cont .color");
const dueDateInput = document.querySelector(".due-date-input");

const alertSound = document.getElementById("alertSound");

const colors = ["lightpink", "lightgreen", "lightblue", "black"];

// Tickets array from localStorage (with fallback)
let ticketsArr = JSON.parse(localStorage.getItem("myTickets")) || [];

// default priority for new ticket
let ticketColor = "lightpink";

// lock Classes
let openedLock = "fa-lock-open";
let closedLock = "fa-lock";

// flags
let modalFlag = false;
let deleteMode = false;

// Initialize tickets from localStorage
function init() {
  ticketsArr.forEach(function (ticket) {
    generateTicket(ticket.ticketTask, ticket.ticketId, ticket.ticketColor, ticket.dueDate);
  });
}
init();

// Open/Close Modal
addBtn.addEventListener("click", function () {
  modalFlag = !modalFlag;
  modalCont.style.display = modalFlag ? "flex" : "none";
});

// Delete Mode
removeBtn.addEventListener("click", function () {
  deleteMode = !deleteMode;
  removeBtn.classList.toggle("active", deleteMode);
});

// Create ticket - ticket Generation on Shift key
document.addEventListener("keydown", function (e) {
  if (!modalFlag) return;

  if (e.key === "Shift") {
    const task = modalTaskArea.value.trim();
    const id = shortid();
    const color = ticketColor;
    const dueDate = dueDateInput.value;

    if (task.length === 0) return;

    generateTicket(task, id, color, dueDate);

    ticketsArr.push({
      ticketId: id,
      ticketTask: task,
      ticketColor: color,
      dueDate: dueDate
    });

    localStorage.setItem("myTickets", JSON.stringify(ticketsArr));

    modalTaskArea.value = "";
    dueDateInput.value = "";
    modalCont.style.display = "none";
    modalFlag = false;
  }
});

// Priority selection
allPriorityColors.forEach(function (colorItem) {
  colorItem.addEventListener("click", function () {
    allPriorityColors.forEach((p) => p.classList.remove("active"));
    colorItem.classList.add("active");
    ticketColor = colorItem.classList[0];
  });
});

// Create Ticket function
function generateTicket(task, id, color, dueDate) {
  const ticketCont = document.createElement("div");
  ticketCont.className = "ticket-cont";

  ticketCont.innerHTML = `
    <div class="ticket-color" style="background-color: ${color};"></div>
    <div class="ticket-id">${id}</div>
    <div class="task-area" contenteditable="false">${task}</div>

    <div class="ticket-due">
      <span class="due-label">Due:</span>
      <span class="due-value">${dueDate ? dueDate : "Not set"}</span>
    </div>

    <div class="ticket-countdown">${dueDate ? formatCountdown(dueDate) : ""}</div>

    <div class="ticket-lock">
      <i class="fa-solid fa-lock"></i>
    </div>
  `;

  mainTicketContainer.appendChild(ticketCont);

  handleLock(ticketCont);
  handleColor(ticketCont);
  handleDelete(ticketCont);
  startCountdown(ticketCont, task, dueDate);
}

// ----------------- COUNTDOWN SYSTEM (WITH NOTIFICATION + SOUND) -----------------

function startCountdown(ticketCont, task, dueDate) {
  if (!dueDate) return;

  const countdownElem = ticketCont.querySelector(".ticket-countdown");

  // REAL FIX → SAME exact date logic as formatCountdown()
  const parts = dueDate.split("-");
  const target = new Date(parts[0], parts[1] - 1, parts[2], 23, 59, 59).getTime();

  const interval = setInterval(() => {
    const now = Date.now();
    const diff = target - now;

    // EXPIRE CONDITION (plays beep)
    if (diff <= 0) {
      countdownElem.textContent = "Expired";
      clearInterval(interval);

      // 🔔 SOUND
      alertSound.play();

      // 🔔 NOTIFICATION
      if (Notification.permission === "granted") {
        new Notification("⏰ Task Due!", {
          body: `Your task "${task}" is now due!`,
        });
      }

      return;
    }

    countdownElem.textContent = formatCountdown(dueDate);
  }, 1000);
}


// Countdown text
function formatCountdown(dueDateStr) {
  const parts = dueDateStr.split("-");
  const target = new Date(parts[0], parts[1] - 1, parts[2], 23, 59, 59).getTime();
  const now = Date.now();

  const diff = target - now;
  if (diff <= 0) return "Expired";

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}



// ----------------- LOCK / EDIT -----------------
function handleLock(ticket) {
  const lockIcon = ticket.querySelector(".ticket-lock i");
  const taskArea = ticket.querySelector(".task-area");
  const id = ticket.querySelector(".ticket-id").textContent;

  lockIcon.addEventListener("click", () => {
    const unlocked = lockIcon.classList.contains(closedLock);

    lockIcon.classList.toggle(closedLock);
    lockIcon.classList.toggle(openedLock);

    taskArea.contentEditable = unlocked;
    if (!unlocked) {
      const obj = ticketsArr.find((t) => t.ticketId === id);
      obj.ticketTask = taskArea.textContent;
      localStorage.setItem("myTickets", JSON.stringify(ticketsArr));
    }
  });
}

// ----------------- TICKET COLOR CHANGE -----------------
function handleColor(ticket) {
  const colorBand = ticket.querySelector(".ticket-color");
  const id = ticket.querySelector(".ticket-id").textContent;

  colorBand.addEventListener("click", () => {
    let idx = colors.indexOf(colorBand.style.backgroundColor);
    if (idx < 0) idx = 0;

    const newColor = colors[(idx + 1) % colors.length];
    colorBand.style.backgroundColor = newColor;

    const obj = ticketsArr.find((t) => t.ticketId === id);
    obj.ticketColor = newColor;
    localStorage.setItem("myTickets", JSON.stringify(ticketsArr));
  });
}

// ----------------- DELETE MODE -----------------
function handleDelete(ticket) {
  ticket.addEventListener("click", () => {
    if (!deleteMode) return;

    const id = ticket.querySelector(".ticket-id").textContent;

    ticketsArr = ticketsArr.filter((t) => t.ticketId !== id);
    localStorage.setItem("myTickets", JSON.stringify(ticketsArr));

    ticket.remove();
  });
}

// ----------------- FILTER BY COLOR -----------------
filterColors.forEach((colorBox) => {
  colorBox.addEventListener("click", () => {
    const color = colorBox.classList[0];

    filterColors.forEach((c) => c.classList.remove("active-filter"));
    colorBox.classList.add("active-filter");

    const filtered = ticketsArr.filter((t) => t.ticketColor === color);

    mainTicketContainer.innerHTML = "";
    filtered.forEach((t) =>
      generateTicket(t.ticketTask, t.ticketId, t.ticketColor, t.dueDate)
    );
  });
});

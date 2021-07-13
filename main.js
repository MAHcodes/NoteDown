import {icons as icons} from "./icons.js";

const pinnedContainer = document.querySelector(".pinned-container");
const otherContainer = document.querySelector(".other-container");

const addBtn = document.getElementById("add");
addBtn.addEventListener("click", createRipple);

window.onload = () => updateEvents();

const markedBtn = document.getElementById("marked");
markedBtn.onclick = () => toggleView();

const searchInput = document.getElementById("search");
searchInput.oninput = () => filterNotes();

const inputTitle = document.getElementById("input-title");
inputTitle.onfocus = () => inputTitle.setSelectionRange(0, inputTitle.value.length);

function updateEvents() {
    const pinBtns = document.querySelectorAll(".pin-toggle");
    pinBtns.forEach(pinBtn => pinBtn.addEventListener("click", pinNote));

    const noteCards = document.querySelectorAll(".note-card");
    noteCards.forEach(card => {
        card.addEventListener("click", openNote);
    });

    if (!pinnedContainer.classList.contains("hidden") && (!otherContainer.classList.contains("hidden"))) {
        pinnedContainer.style.flexGrow = 0;
    } else {
        pinnedContainer.style.flexGrow = 1;
    };
};

function pinNote(e) {
    const note = this.parentElement;
    const pinBtn = this;
    
    if (pinBtn.classList.contains("pin")) {
        pinBtn.classList.remove("pin");
        otherContainer.insertAdjacentElement("afterbegin", note); 
    } else {
        pinBtn.classList.add("pin");
        pinnedContainer.insertAdjacentElement("afterbegin", note); 
    };

    if (pinnedContainer.childElementCount === 0) {
        pinnedContainer.classList.add('hidden');
    } else {
        pinnedContainer.classList.remove("hidden");
    };
    if (otherContainer.childElementCount === 0) {
        otherContainer.classList.add("hidden");
    } else {
        otherContainer.classList.remove("hidden");
    };
    updateEvents();
};

function openNote(e) {
    const noteCards = document.querySelectorAll(".note-card");
    noteCards.forEach(card => card.classList.remove("active"));
    this.classList.add("active");
};

function changeIcon() {
    icons.forEach(icon => {
        const ico = document.createElement("i");
        ico.classList.add(icon[0]);
        ico.classList.add(icon[1]);
        document.body.appendChild(ico);
    });
};

function createNewNote() {
    const currentDate = new Date();
    const currentTime = `Last edit ${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()} at ${currentDate.getHours()}:${currentDate.getMinutes()}`
    const noteCardHtml = `<div class="note-card">
                            <i class="las la-thumbtack pin-toggle"></i>
                            <div class="title">
                                <i class="lar la-sticky-note"></i>
                                <h3 class="card-title">Untitled Note</h3>
                            </div>
                            <p class="card-text"></p>
                            <div class="info-container">
                                <div class="tags">
                                    <span class="tag"></span>
                                </div>
                                <div class="date-container">
                                    <h6 class="card-date">${currentTime}</h6>
                                </div>
                            </div>
                        </div>`;

    otherContainer.classList.remove("hidden");
    otherContainer.insertAdjacentHTML("afterbegin", noteCardHtml);

    updateEvents();
    otherContainer.firstElementChild.click();
};

function createRipple(e) {
    const button = e.currentTarget;
    const span = document.createElement("span");
    const radius = (Math.max(button.clientWidth, button.clientHeight)) / 2;
    span.style.width = span.style.height = `${radius * 2}px`;
    span.style.left = `${e.clientX - (button.offsetLeft + radius)}px`;
    span.style.top = `${e.clientY - (button.offsetTop + radius)}px`;
    span.classList.add("ripple"); 
    const ripple = button.getElementsByClassName("ripple")[0];
    if (ripple) {
    ripple.remove();
    };
    button.appendChild(span);
    createNewNote();
    updateEvents();
};

function toggleView() {
    const txtArea = document.getElementById("text-input");
    const txtView = document.querySelector(".text-view");
    const markedBtnIcon = document.querySelector("#marked i");
    const markText = document.querySelector(".mark-text");

    if (txtView.classList.contains("hidden")) {
        markedBtnIcon.classList.remove("la-eye");
        markedBtnIcon.classList.add("la-edit");
        markText.innerText = "Edit";
        
        txtView.innerHTML = marked(txtArea.value);
        txtView.classList.remove("hidden");
        txtArea.classList.add("hidden")
    } else {
        markedBtnIcon.classList.add("la-eye");
        markedBtnIcon.classList.remove("la-edit")
        txtView.classList.add("hidden");
        txtArea.classList.remove("hidden");
        markText.innerText = "MarkDown";
    };
};

function filterNotes() {
    const timesIco = document.getElementById("times");
    timesIco.addEventListener("click", () => {
        searchInput.value = "";
        timesIco.classList.add("hidden")});
    if (searchInput.value !== "") {
        timesIco.classList.remove("hidden");
        searchInput.style.padding = ".7em calc(30px + 1em) .7em calc(30px + 1em)";
    } else {
        timesIco.classList.add("hidden");
        searchInput.style.padding = ".7em 1em .7em calc(30px + 1em)";
    };
};
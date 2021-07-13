import {icons as icons} from "./icons.js";

const addBtn = document.getElementById("add");
addBtn.addEventListener("click", createRipple);

const pinBtn = document.getElementById("pin");
pinBtn.addEventListener("click", pinNote);

const markedBtn = document.getElementById("marked");
markedBtn.addEventListener("click", toggleView);

const searchInput = document.getElementById("search");
searchInput.addEventListener("input", filterNotes);

const noteCards = document.querySelectorAll(".note-card");
noteCards.forEach(card => {
    card.addEventListener("click", openNote);
});

function pinNote(e) {
    const pinnedContainer = document.querySelector(".pinned-container");
    const otherContainer = document.querySelector(".other-container");
    const note = this.parentElement;
    
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
};

function openNote(e) {
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
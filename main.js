import {icons as icons} from "./icons.js";

const pinnedContainer = document.querySelector(".pinned-container");
const otherContainer = document.querySelector(".other-container");

const addBtn = document.getElementById("add");
addBtn.addEventListener("click", createRipple);

window.onload = () => {
    changeIcon();
    updateEvents();
};

const markedBtn = document.getElementById("marked");
markedBtn.onclick = () => toggleView();

const searchInput = document.getElementById("search");
searchInput.oninput = () => filterNotes();

const searchIcon = document.getElementById("search-icons");
searchIcon.oninput = () => filterIcons();

const inputTitle = document.getElementById("input-title");
inputTitle.onfocus = () => inputTitle.setSelectionRange(0, inputTitle.value.length);
inputTitle.onblur = () => updateNoteTitle();
inputTitle.onchange = () => updateDate();

const textAreaInput = document.getElementById("text-input");
textAreaInput.onblur = () => updateNoteText();
textAreaInput.onchange = () => updateDate();

const dateTitle = document.getElementById("main-date");

const addTagBtn = document.getElementById("add-tag");
addTagBtn.onclick = () => addTag();

const themeToggle = document.getElementById("theme-toggle");
themeToggle.onclick = () => changeTheme();

const deleteNote = document.getElementById("delete-note");
deleteNote.onclick = () => deleteTheNote();

const noteColor = document.getElementById("note-color");
const noteColorsContainer = document.querySelector(".colors");
noteColor.onmouseenter = () => {
    noteColorsContainer.style.display = "block";
    document.documentElement.addEventListener("click", hideColorsContainer);

    function hideColorsContainer(e) {
        if (e.target.classList[1] == "la-palette") return;
        noteColorsContainer.style.display = "none";
    };

    const colors = document.querySelectorAll(".colors span");
    colors.forEach(color => color.addEventListener("click", (e) => {
        const activeNote = document.querySelector(".note-card.active");
        activeNote.style.backgroundColor = e.target.dataset.color;
    }));
};

function updateDate() {
    dateTitle.innerText = getCurrentTime();
};

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

function openNote() {
    if (markedBtn.children[0].classList[1] === "la-edit") {markedBtn.click()};
    const noteCards = document.querySelectorAll(".note-card");
    const iconTitle = document.querySelector("#icon-btn > i");
    noteCards.forEach(card => card.classList.remove("active"));
    this.classList.add("active");
    textAreaInput.value = this.children[2].innerText;
    iconTitle.classList = this.children[1].children[0].classList;
    inputTitle.value = this.children[1].children[1].innerText;
    dateTitle.innerText = this.children[3].children[1].firstElementChild.innerText;
};

function updateNoteTitle() {
    const activeNote = document.querySelector(".active");
    const cardTitle = activeNote.querySelector(".title .card-title");
    cardTitle.innerText = inputTitle.value;
    updateNoteDate();
};

function updateNoteText() {
    const activeNote = document.querySelector(".active");
    const cardText = activeNote.querySelector(".card-text");
    cardText.innerText = textAreaInput.value;
    updateNoteDate();
};

function updateNoteIcon() {
    const activeNote = document.querySelector(".active");
    const cardIcon = activeNote.querySelector(".title i");
    const iconTitle = document.querySelector("#icon-btn > i");
    cardIcon.classList = iconTitle.classList;
    updateNoteDate();
};

function updateNoteDate() {
    const activeNote = document.querySelector(".active");
    const cardDate = activeNote.querySelector(".date-container .card-date");
    cardDate.innerText = dateTitle.innerText;
};

function changeIcon() {
    const allIconsContainer = document.getElementById("all-icons");
    const iconTitle = document.querySelector("#icon-btn > i");
    icons.forEach(icon => {
        const ico = document.createElement("i");
        ico.addEventListener("click", (e) => {
            iconTitle.classList = [];
            iconTitle.classList.add(e.target.classList[0]);
            iconTitle.classList.add(e.target.classList[1]);
            updateNoteIcon();
            dateTitle.innerText = getCurrentTime();
        });
        ico.classList.add(icon[0]);
        ico.classList.add(icon[1]);
        ico.setAttribute("title", icon[1].split("-").slice(1).join(" "));
        allIconsContainer.appendChild(ico);
    });
};

function createNewNote() {
    const currentTime = getCurrentTime();
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

function getCurrentTime() {
    const currentDate = new Date();
    return `Last edit ${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()} at ${currentDate.getHours()}:${currentDate.getMinutes()}` 
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
    const txtView = document.querySelector(".text-view");
    const markedBtnIcon = document.querySelector("#marked i");
    const markText = document.querySelector(".mark-text");
    const toolsContainer = document.querySelector(".tools-container");

    if (txtView.classList.contains("hidden")) {
        markedBtnIcon.classList.remove("la-eye");
        markedBtnIcon.classList.add("la-edit");
        markText.innerText = "Edit";
        txtView.innerHTML = marked(textAreaInput.value);
        txtView.classList.remove("hidden");
        textAreaInput.classList.add("hidden");
        toolsContainer.classList.add("hidden");
    } else {
        markedBtnIcon.classList.add("la-eye");
        markedBtnIcon.classList.remove("la-edit");
        txtView.classList.add("hidden");
        textAreaInput.classList.remove("hidden");
        markText.innerText = "MarkDown";
        toolsContainer.classList.remove("hidden");
    };
};

function filterNotes() {
    const timesIco = document.getElementById("times");
    timesIco.addEventListener("click", () => {
        searchInput.value = "";
        timesIco.classList.add("hidden");
        document.querySelectorAll(".note-card").forEach(n => n.style.display = "block");
    });
    if (searchInput.value !== "") {
        timesIco.classList.remove("hidden");
        searchInput.style.padding = ".7em calc(30px + 1em) .7em calc(30px + 1em)";
    } else {
        timesIco.classList.add("hidden");
        searchInput.style.padding = ".7em 1em .7em calc(30px + 1em)";
    }; 

    const noteCards = document.querySelectorAll(".note-card");
    noteCards.forEach(card => {
        const cardTitle = card.querySelector(".card-title");
        if (cardTitle.innerText.toLowerCase().includes(searchInput.value.toLowerCase())) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        };
    });
};

function filterIcons() {
    const timesIcons = document.getElementById("times-icons");
    const allIcons = document.querySelectorAll("#all-icons > i");
    timesIcons.addEventListener("click", () => {
        searchIcon.value = "";
        timesIcons.classList.add("hidden");
        allIcons.forEach(icon => icon.style.display = "inline-block");
    });
    if (searchIcon.value !== "") {
        timesIcons.classList.remove("hidden");
        searchIcon.style.padding = ".7em calc(30px + 1em) .7em calc(30px + 1em)";
    } else {
        timesIcons.classList.add("hidden");
        searchIcon.style.padding = ".7em 1em .7em calc(30px + 1em)";
    }; 
    allIcons.forEach(icon => {
        if (icon.classList[1].toLowerCase().split("-").join(" ").includes(searchIcon.value.toLowerCase())) {
            icon.style.display = "inline-block";
        } else {
            icon.style.display = "none";
        };
    });
};

function addTag() {
    const tagsContainer = document.querySelector(".tags-container");
    const span = document.createElement("span");
    span.classList.add("tag");
    span.innerText = "hello";
    tagsContainer.insertAdjacentElement("afterbegin", span)
};

function changeTheme() {
    document.documentElement.classList.toggle("dark-theme");
};

function deleteTheNote() {
    if (confirm("Are You Sure To Delete This Note?")) {
        const activeNote = document.querySelector(".note-card.active");
        activeNote.remove();
        try {
            document.querySelector(".note-card").click();
        } 
        catch {
            createNewNote();
        }
    };
};
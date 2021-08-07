import {icons as icons} from "./icons.js";

const pinnedContainer = document.querySelector(".pinned-container");
const otherContainer = document.querySelector(".other-container");

const addBtn = document.getElementById("add");
addBtn.addEventListener("click", createRipple);

window.onload = () => {
    changeIcon();
    updateEvents();
    restoreTheme();
    restoreNotes();
    new Sortable(pinnedContainer);
    new Sortable(otherContainer);
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

document.addEventListener("keyup", (e) => {
    if (e.target.localName === "body" && e.key === "Delete") deleteTheNote();
}); 

const deleteNote = document.getElementById("delete-note");
deleteNote.onclick = () => deleteTheNote();

const noteColor = document.getElementById("note-color");
const noteColorsContainer = document.querySelector(".colors");
noteColor.onmouseenter = () => {
    noteColorsContainer.style.display = "flex";
    document.documentElement.addEventListener("click", hideColorsContainer);

    function hideColorsContainer(e) {
        if (e.target.classList[1] === "la-palette") return;
        noteColorsContainer.style.display = "none";
    }

    const colors = document.querySelectorAll(".colors span");
    colors.forEach(color => color.addEventListener("click", (e) => {
        const activeNote = document.querySelector(".note-card.active");
        activeNote.style.backgroundColor = e.target.dataset.color;
        saveNote2LocalStorage();
    }));
};

function updateDate() {
    dateTitle.innerText = getCurrentTime();
}

function updateEvents() {
    const tags = document.querySelectorAll(".tag");
    tags.forEach(tag => tag.addEventListener("click", deleteTag));

    const pinBtns = document.querySelectorAll(".pin-toggle");
    pinBtns.forEach(pinBtn => pinBtn.addEventListener("click", pinNote));

    const noteCards = document.querySelectorAll(".note-card");
    noteCards.forEach(card => {
        card.addEventListener("click", openNote);
        card.addEventListener("touchstart", openNote);
    });

    if (!pinnedContainer.classList.contains("hidden") && (!otherContainer.classList.contains("hidden"))) {
        pinnedContainer.style.flexGrow = "0";
    } else {
        pinnedContainer.style.flexGrow = "1";
    }
}

function pinNote() {
    const note = this.parentElement;
    const pinBtn = this;
    
    if (pinBtn.classList.contains("pin")) {
        pinBtn.classList.remove("pin");
        otherContainer.insertAdjacentElement("afterbegin", note); 
    } else {
        pinBtn.classList.add("pin");
        pinnedContainer.insertAdjacentElement("afterbegin", note); 
    }
    updateNotesContainers();
    updateEvents();
    saveNote2LocalStorage();
}

function updateNotesContainers() {
    if (pinnedContainer.childElementCount === 0) {
        pinnedContainer.classList.add('hidden');
    } else {
        pinnedContainer.classList.remove("hidden");
    }
    if (otherContainer.childElementCount === 0) {
        otherContainer.classList.add("hidden");
    } else {
        otherContainer.classList.remove("hidden");
    }
}

function openNote() {
    if (markedBtn.children[0].classList[1] === "la-edit") {markedBtn.click()}
    const noteCards = document.querySelectorAll(".note-card");
    const iconTitle = document.querySelector("#icon-btn > i");
    const tagsWrapper = document.querySelector(".tags-wrapper");
    noteCards.forEach(card => card.classList.remove("active"));
    this.classList.add("active");
    textAreaInput.value = this.children[2].innerText;
    iconTitle.classList = this.children[1].children[0].classList;
    inputTitle.value = this.children[1].children[1].innerText;
    dateTitle.innerText = this.children[3].children[1].firstElementChild.innerText;
    tagsWrapper.innerHTML = this.children[3].children[0].innerHTML;
}

function updateNoteTitle() {
    const activeNote = document.querySelector(".active");
    const cardTitle = activeNote.querySelector(".title .card-title");
    cardTitle.innerText = inputTitle.value;
    updateNoteDate();
}

function updateNoteText() {
    const activeNote = document.querySelector(".active");
    const cardText = activeNote.querySelector(".card-text");
    cardText.innerText = textAreaInput.value;
    updateNoteDate();
}

function updateNoteIcon() {
    const activeNote = document.querySelector(".active");
    const cardIcon = activeNote.querySelector(".title i");
    const iconTitle = document.querySelector("#icon-btn > i");
    cardIcon.classList = iconTitle.classList;
    updateNoteDate();
}

function updateNoteDate() {
    const activeNote = document.querySelector(".active");
    const cardDate = activeNote.querySelector(".date-container .card-date");
    cardDate.innerText = dateTitle.innerText;
    saveNote2LocalStorage();
}

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
}

function createNewNote(obj) {
    let title, icon, text,date,tags, color, pinned;
    if (obj == null) {
        title = "Untitled Note";
        icon = ["las", "la-sticky-note"];
        text = "";
        date = "Created: " + getCurrentTime().split(":").slice(1).join(":");
        tags = "";
        color = "";
        pinned = "other-container";
    } else {
        title = obj.title;
        icon = obj.icon;
        text = obj.text;
        date = obj.date;
        color = obj.color;
        pinned = obj.pinned;
        tags = obj.tags;
    }

    const noteCard = document.createElement("div");
    noteCard.classList.add("note-card");
    noteCard.innerHTML = `<i class="las la-thumbtack pin-toggle"></i>
                            <div class="title">
                                <i class="${icon[0]} ${icon[1]}"></i>
                                <h3 class="card-title">${title}</h3>
                            </div>
                            <p class="card-text">${text}</p>
                            <div class="info-container">
                                <div class="tags">${tags}</div>
                                <div class="date-container">
                                    <h6 class="card-date">${date}</h6>
                                </div>
                            </div>`;
    noteCard.style.backgroundColor = color;

    if (pinned === "other-container") {
        otherContainer.classList.remove("hidden");
        otherContainer.insertAdjacentElement("afterbegin", noteCard);
    } else {
        pinnedContainer.classList.remove("hidden");
        const pinBtn = noteCard.querySelector(".pin-toggle");
        pinBtn.classList.add("pin");
        pinnedContainer.insertAdjacentElement("afterbegin", noteCard);
    }
    updateEvents();
    try {
        pinnedContainer.firstElementChild.click();
    } catch {
        otherContainer.firstElementChild.click();
    }
    saveNote2LocalStorage();
}

function getCurrentTime() {
    const currentDate = new Date();
    return `Last edit: ${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()} at ${String(currentDate.getHours()).padStart(2, "0")}:${String(currentDate.getMinutes()).padStart(2, "0")}`
}

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
    }
    button.appendChild(span);
    createNewNote();
    updateEvents();
}

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
        markedBtn.title = "Edit Note";
    } else {
        markedBtnIcon.classList.add("la-eye");
        markedBtnIcon.classList.remove("la-edit");
        txtView.classList.add("hidden");
        textAreaInput.classList.remove("hidden");
        markText.innerText = "MarkDown";
        toolsContainer.classList.remove("hidden");
        markedBtn.title = "View MarkDown";
    }
}

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
    }

    const noteCards = document.querySelectorAll(".note-card");
    noteCards.forEach(card => {
        const cardTitle = card.querySelector(".card-title");
        if (cardTitle.innerText.toLowerCase().includes(searchInput.value.toLowerCase())) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}

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
    }
    allIcons.forEach(icon => {
        if (icon.classList[1].toLowerCase().split("-").join(" ").includes(searchIcon.value.toLowerCase())) {
            icon.style.display = "inline-block";
        } else {
            icon.style.display = "none";
        }
    });
}

function addTag() {
    const tagsWrapper = document.querySelector(".tags-wrapper");
    const newTag = prompt("Enter Tag Name: ");
    const activeNote = document.querySelector(".note-card.active .tags");
    if (!newTag) return;
    const span = document.createElement("span");
    span.classList.add("tag");
    span.innerText = newTag;
    tagsWrapper.insertAdjacentElement("afterbegin", span);
    activeNote.insertAdjacentElement("afterbegin", span.cloneNode(true));
    updateEvents();
    saveNote2LocalStorage();
}

function deleteTag(e) {
    const activeNoteTags = document.querySelectorAll(".note-card.active .tags .tag");
    if (e.layerX > e.target.offsetWidth - 25 && e.target.parentElement.classList.contains("tags-wrapper")) {
        activeNoteTags.forEach(tag => {
            if (tag.innerText === e.target.innerText) tag.remove();
        })
        e.target.remove()
        updateEvents()
        saveNote2LocalStorage();
    }
}

function changeTheme() {
    themeToggle.classList.toggle("toggle");
    document.documentElement.classList.toggle("dark-theme");
    if (document.documentElement.classList[0] === "dark-theme") {
        localStorage.setItem("darkTheme", "true");
    } else {
        localStorage.setItem("darkTheme", "false");
    }
}

function restoreTheme() {
    let darkTheme;
    darkTheme = localStorage.getItem("darkTheme");
    if (darkTheme === "true") {
       changeTheme(); 
    }
}

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
    }
    updateNotesContainers();
    saveNote2LocalStorage();
}

function saveNote2LocalStorage() {
    const notes = document.querySelectorAll(".note-card");
    let allNotes = [];
    notes.forEach((note) => {
        note = {
            title: note.querySelector(".card-title").innerText,
            text: note.querySelector(".card-text").innerHTML,
            icon: note.querySelector(".title > i").classList,
            date: note.querySelector(".card-date").innerText,
            color: note.style.backgroundColor,
            pinned: note.parentElement.className,
            tags: note.querySelector(".tags").innerHTML,
        };
        allNotes.push(note)
    });
    localStorage.setItem("cardNotes", JSON.stringify(allNotes));
}

function restoreNotes() {
    const allNotes = JSON.parse(localStorage.getItem("cardNotes"));
    if (allNotes) {
        allNotes.forEach(note => {
            createNewNote(note);
        });
    } else {
        createNewNote();
    }
    updateNotesContainers();
    updateEvents();
}
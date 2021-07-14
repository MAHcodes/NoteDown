
var notesTexts = [];
var notesTitle = [];


function saveNote() {
    let text = document.querySelector("#text-input").value;
    notesTexts[document.querySelector(".active").id] = text;
    let textToDisplay = text.substr(0, 20);
    text.length > 20 ? textToDisplay += "..." : textToDisplay=textToDisplay;
    let title = document.querySelector("#input-title").value;
    notesTitle[document.querySelector(".active").id] = title;
    let titleToDisplay = title.substr(0, 15);
    title.length > 15 ? titleToDisplay += "..." : titleToDisplay=titleToDisplay;
    const note = document.querySelector(".active");
    note.querySelector(".card-text").innerHTML = textToDisplay;
    note.querySelector(".card-title").innerHTML = titleToDisplay;
    note.querySelector(".card-date").innerHTML = getCurrentTime();
}

function getCurrentTime () {
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();
    let hours = today.getHours();
    let minutes = today.getMinutes();
    
    return "Last edit " + day + "/" + month + "/" + year + " at " + hours + ":" + minutes;
}
import {icons as icons} from "./icons.js";
function changeIcon() {
    icons.forEach(icon => {
        const ico = document.createElement("i");
        ico.classList.add(icon[0]);
        ico.classList.add(icon[1]);
        document.body.appendChild(ico);
    });
};
import {icons as icons} from "./icons.js";

const addBtn = document.getElementById("add");
addBtn.addEventListener("click", createRipple);

const markedBtn = document.getElementById("marked");
markedBtn.addEventListener("click", toggleView);


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

    console.log(txtView)

}

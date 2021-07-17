import {icons as icons} from "./icons.js";
let newIcons = []


icons.forEach(icon => {
    if (!(newIcons.some(item => item.includes(icon[1])))) {newIcons.push(icon)}
});

console.log(newIcons);
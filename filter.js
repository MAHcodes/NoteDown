/**
 * NoteDown is an open source note-taking app to capture your ideas with an easy and fast way that supports formatting using Markdown syntax
 * Copyright (C) 2023 MAHcodes
 *
 * This file is part of NoteDown.
 *
 * NoteDown is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * NoteDown is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with NoteDown. If not, see <https://www.gnu.org/licenses/>.
 *
 * Contact information:
 * mahdotcodes@gmail.com
 */

import {icons as icons} from "./icons.js";
let newIcons = []


icons.forEach(icon => {
    if (!(newIcons.some(item => item.includes(icon[1])))) {newIcons.push(icon)}
});

console.log(newIcons);
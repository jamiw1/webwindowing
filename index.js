import { Vector2 } from "./types.js";
import { Window, Windows } from "./window.js";

async function getContentFromUri(uri) {
    return await fetch(uri).then(r => r.text())
}

const desktopIcons = document.querySelectorAll(".desktop_icon");

desktopIcons.forEach(element => {
    element.addEventListener('dblclick', async (event) => {
        var windowPath = element.dataset.windowPath;
        const rawHtml = await getContentFromUri(windowPath);
        const newClassName = windowPath.replaceAll('.','') 
        const parser = new DOMParser();
        const doc = parser.parseFromString(rawHtml, 'text/html');

        const title = doc.querySelector('meta[name="window-title"]')?.content || "default title";
        const width = doc.querySelector('meta[name="window-width"]')?.content || 400;
        const height = doc.querySelector('meta[name="window-height"]')?.content || 300;
        const centerx = window.innerWidth / 2;
        const centery = window.innerHeight / 2;
        const posx = centerx - (width / 2);
        const posy = centery - (height / 2);

        var newWin = new Window(rawHtml, newClassName, new Vector2(posx, posy), new Vector2(width, height), title, 18);
    });
    element.addEventListener('click', (event) => {
        desktopIcons.forEach(icon => icon.classList.remove('selected'));
        
        element.classList.add('selected');
        event.stopPropagation();
    });
});

document.getElementById("desktop_icons").addEventListener('click', () => {
    desktopIcons.forEach(icon => icon.classList.remove('selected'));
});

var taskbarClassOrder = [];

const taskbarWindowButtons = document.getElementById("taskbar_window_buttons");
window.addEventListener("windowsModified", () => {
    taskbarWindowButtons.innerHTML = "";

    Windows.forEach(win => {
        if (!taskbarClassOrder.includes(win.className)) {
            taskbarClassOrder.push(win.className);
        }
    });

    taskbarClassOrder = taskbarClassOrder.filter(className => 
        Windows.some(win => win.className === className)
    );

    taskbarClassOrder.forEach(className => {
        const win = Windows.find(w => w.className === className);
        if (win) {
            const newButton = document.createElement("div");
            newButton.className = (Windows[0] === win) ? "window_button infront" : "window_button";
            
            newButton.innerHTML = `
                <img src="assets/icons/w2k_default_application.ico">
                <p>${win.title}</p>
            `;
            
            newButton.addEventListener("mouseup", () => {
                win.moveToFront();
            });

            taskbarWindowButtons.appendChild(newButton);
        }
    });
});
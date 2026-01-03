import { Vector2 } from "./types.js";
import { Window } from "./window.js";

async function getContentFromUri(uri) {
    return await fetch(uri).then(r => r.text())
}

const desktopIcons = document.querySelectorAll(".desktop_icon");

desktopIcons.forEach(element => {
    element.addEventListener('dblclick', async (event) => {
        var windowPath = element.dataset.windowPath;
        const rawHtml = await getContentFromUri(windowPath);

        const parser = new DOMParser();
        const doc = parser.parseFromString(rawHtml, 'text/html');

        const title = doc.querySelector('meta[name="window-title"]')?.content || "default title";
        const width = doc.querySelector('meta[name="window-width"]')?.content || 400;
        const height = doc.querySelector('meta[name="window-height"]')?.content || 300;

        var newWin = new Window(rawHtml, windowPath, new Vector2(10, 10), new Vector2(width, height), title, 18);
    });
});

var win = new Window(`<p style="background: red;">hi</p>`, "win1", new Vector2(100, 10), new Vector2(300,200), "File Manager", 18);
var win2 = new Window(`<p style="background: green;">this is another window</p>`, "win2", new Vector2(600, 80), new Vector2(350,150), "window 2", 18);

var win3 = new Window(await getContentFromUri("testwindow.html"), "win3", new Vector2(10, 100), new Vector2(400, 200), "Hey there", 18);

win2.setTitle("Mega fail");
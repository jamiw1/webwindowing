import { Vector2 } from "./types.js";
import { Window } from "./window.js";

var win = new Window(`<p style="background: red;">hi</p>`, "win1", new Vector2(100, 10), new Vector2(300,200), "File Manager", 18);
var win2 = new Window(`<p style="background: green;">this is another window</p>`, "win2", new Vector2(600, 80), new Vector2(350,150), "window 2", 18);

var win3 = new Window(await fetch("testwindow.html").then(r => r.text()), "win3", new Vector2(10, 100), new Vector2(400, 200), "Hey there", 18);

win2.setTitle("Mega fail");
import { Vector2 } from "./types.js";
import { Window } from "./window.js";

var win = new Window(`<p style="background: red;">hi</p>`, new Vector2(100, 10), new Vector2(300,200), "window 1", 25);
var win2 = new Window(`<p style="background: green;">this is another window</p>`, new Vector2(600, 80), new Vector2(350,150), "window 2", 25);

win2.setTitle("Mega fail");
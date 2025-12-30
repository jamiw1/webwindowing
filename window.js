import { Vector2 } from "./types.js";

export class Window {
    constructor(content, initPosition, initSize, titlebarHeight) {
        this.content = content;
        this.titlebarHeight = titlebarHeight;

        this.element = document.createElement("div");
        this.element.style.position = "fixed";
        this.setSize(initSize);
        this.setPosition(initPosition);
        this.element.style.display = "flex";
        this.element.style.flexDirection = "column";

        var titlebar = document.createElement("div");
        titlebar.id = "window_titlebar"
        titlebar.style.height = `${this.titlebarHeight}px`;
        titlebar.style.width = "100%";
        titlebar.style.backgroundColor = "black";
        titlebar.onmousedown = this.onTitlebarDown.bind(this);
        this.element.appendChild(titlebar);

        var contentElement = document.createElement("div");
        contentElement.id = "window_content"
        contentElement.innerHTML = content;
        contentElement.style.flex = "1";
        contentElement.style.width = "100%";
        contentElement.style.backgroundColor = "white";
        this.element.appendChild(contentElement);

        document.getElementById("main").appendChild(this.element);

        this.dragging = false;
        addEventListener("mousemove", this.onMouseMove.bind(this));
        addEventListener("mouseup", this.onMouseUp.bind(this));
    }
    setPosition(position) {
        this.position = position;
        this.element.style.left = `${this.position.x}px`;
        this.element.style.top = `${this.position.y}px`;
    }
    setSize(size) {
        this.size = size;
        this.element.style.width = `${this.size.x}px`;
        this.element.style.height = `${this.size.y}px`;
    }
    setContent(content) {
        this.content = content;
        this.element.getElementById("window_content").innerHTML = this.content;
    }
    setTitlebarHeight(height) {
        this.titlebarHeight = height;
        this.element.getElementById("window_titlebar").style.height = `${this.titlebarHeight}px`;
    }

    onTitlebarDown(event) {
        this.dragging = true;
        var x = event.clientX - this.position.x;
        var y = event.clientY - this.position.y;
        this.dragOffset = new Vector2(x, y);
    }
    onMouseUp(event) {
        this.dragging = false;
    }
    onMouseMove(event) {
        if (this.dragging) {
            this.setPosition(new Vector2(event.clientX - this.dragOffset.x, event.clientY - this.dragOffset.y));
        }
    }
}
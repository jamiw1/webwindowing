import { Vector2 } from "./types.js";
export var Windows = [];
const windowsModified = new CustomEvent("windowsModified");

export class Window {
    constructor(content, className, initPosition, initSize, title, titlebarHeight) {
        this.content = content;
        this.title = title;
        this.titlebarHeight = titlebarHeight;
        this.className = className;
        for (let index = 0; index < Windows.length; index++) {
            const win = Windows[index];
            if (win.className == this.className) {
                win.moveToFront();
                return win;
            }
        }

        this.element = document.createElement("div");
        this.element.style.position = "fixed";
        this.element.className = "window";
        this.setSize(initSize);
        this.setPosition(initPosition);
        this.element.style.display = "flex";
        this.element.style.flexDirection = "column";

        var titlebar = document.createElement("div");
        titlebar.className = "window_titlebar";
        titlebar.style.height = `${this.titlebarHeight}px`;
        titlebar.innerHTML = `
            <p class="window_titlebar_text">${this.title}</p>
            <div class="window_titlebar_buttons" onmousedown="event.stopPropagation();">
                <div style="display: flex; flex-direction: row;">
                    <input type="button" id="minimize" class="titlebar_button minimize"></input>
                    <input type="button" id="maximize" class="titlebar_button maximize"></input>
                </div>
                <input type="button" id="close" class="titlebar_button close"></input>
            </div>
        `;
        titlebar.onmousedown = this.onTitlebarDown.bind(this);
        var closeButton = titlebar.getElementsByClassName("close")[0];
        closeButton.onmouseup = this.onCloseButtonPress.bind(this);
        this.element.appendChild(titlebar);

        var contentElement = document.createElement("div");
        contentElement.className = `window_content ${className}`;
        contentElement.innerHTML = content;
        contentElement.style.flex = "1";
        contentElement.style.width = "100%";
        this.element.appendChild(contentElement);

        document.getElementById("main").appendChild(this.element);

        this.dragging = false;
        addEventListener("mousemove", this.onMouseMove.bind(this));
        addEventListener("mouseup", this.onMouseUp.bind(this));

        Windows.unshift(this);
        for (let i = 0; i < Windows.length; i++) {
            const element = Windows[i];
            element.element.style.zIndex = Windows.length - i;
        }

        window.dispatchEvent(windowsModified);
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
        this.element.getElementsByClassName("window_content")[0].innerHTML = this.content;
    }
    setTitle(title) {
        this.title = title;
        var titlebar = this.element.getElementsByClassName("window_titlebar")[0];
        titlebar.getElementsByClassName("window_titlebar_text")[0].textContent = this.title;
        window.dispatchEvent(windowsModified);
    }
    setTitlebarHeight(height) {
        this.titlebarHeight = height;
        this.element.getElementsByClassName("window_titlebar")[0].style.height = `${this.titlebarHeight}px`;
    }
    moveToFront() {
        const index = Windows.indexOf(this);
        if (index > 0) { // neat, optimization! if it's not already the top, make it the top
            Windows.splice(index, 1);
            Windows.unshift(this);
            for (let i = 0; i < Windows.length; i++) {
                const element = Windows[i];
                element.element.style.zIndex = Windows.length - i;
            }
        }
        window.dispatchEvent(windowsModified);
    }
    onTitlebarDown(event) {
        this.dragging = true;
        var x = event.clientX - this.position.x;
        var y = event.clientY - this.position.y;
        this.dragOffset = new Vector2(x, y);

        this.moveToFront();
    }
    onMouseUp(event) {
        this.dragging = false;
    }
    onMouseMove(event) {
        if (this.dragging) {
            this.setPosition(new Vector2(event.clientX - this.dragOffset.x, event.clientY - this.dragOffset.y));
        }
    }
    remove() {
        const index = Windows.indexOf(this);
        this.element.remove();
        Windows.splice(index, 1);
        window.dispatchEvent(windowsModified);
    }
    onCloseButtonPress(event) {
        this.remove();
    }
}
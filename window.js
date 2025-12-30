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
        titlebar.id = "windowTitlebar"
        titlebar.style.height = `${this.titlebarHeight}px`;
        titlebar.style.width = "100%";
        titlebar.style.backgroundColor = "black";
        this.element.appendChild(titlebar);

        var contentElement = document.createElement("div");
        contentElement.innerHTML = content;
        contentElement.style.flex = "1";
        contentElement.style.width = "100%";
        contentElement.style.backgroundColor = "white";
        this.element.appendChild(contentElement);

        document.getElementById("main").appendChild(this.element);

        this.dragging = false;
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
        this.element.innerHTML = content;
    }
}
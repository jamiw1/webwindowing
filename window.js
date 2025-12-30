export class Window {
    constructor(content, initPosition, initSize, titlebarHeight) {
        this.content = content;
        this.position = initPosition;
        this.size = initSize;
        this.titlebarHeight = titlebarHeight;

        this.element = document.createElement("div");
        this.element.style.position = "fixed";
        this.element.style.width = `${this.size.x}px`;
        this.element.style.height = `${this.size.y}px`;
        this.element.style.left = `${this.position.x}px`;
        this.element.style.top = `${this.position.y}px`;
        this.element.style.display = "flex";
        this.element.style.flexDirection = "column";

        var titlebar = document.createElement("div");
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
    }
    setPosition(position) {

    }
    setContent(content) {
        this.content = content;
        this.element.innerHTML = content;
    }
}
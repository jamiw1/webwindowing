

export class Window {
    constructor(position, size, content) {
        this.position = position;
        this.size = size;
        this.content = content;

        this.element = document.createElement("div");
        this.element.innerHTML = content;
        this.element.style.position = "fixed";
        this.element.style.width = `${size.x}px`;
        this.element.style.height = `${size.y}px`;
        this.element.style.left = `${position.x}px`;
        this.element.style.top = `${position.y}px`;
        this.element.style.backgroundColor = "white";

        document.getElementById("main").appendChild(this.element);
    }
    setContent(content) {
        this.content = content;
        this.element.innerHTML = content;
    }
}
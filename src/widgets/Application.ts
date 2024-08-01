import { Widget } from "./Widget";

interface params {
    id: string,
    child: Widget
}

export class Application extends Widget {
    id: string;
    child: Widget;

    element: HTMLElement = document.createElement("div");

    constructor(params: params) {
        super();

        this.id = params.id;
        this.child = params.child;
    }

    build(): HTMLElement {
        const child = this.child.build();

        this.element.id = this.id;
        this.element.appendChild(child);
        this.element.classList.add("whelmed-app");

        return this.element;
    }
}
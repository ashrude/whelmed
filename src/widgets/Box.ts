import { Widget, WidgetParams } from "./Widget";

interface params extends WidgetParams {
    children: Array<Widget>,
    orientation?: "horizontal" | "vertical"
}

export class Box extends Widget {
    children: Array<Widget>;
    #orientation: "horizontal" | "vertical" = "horizontal"

    element: HTMLElement = document.createElement("div");

    constructor(params: params) {
        super();
        super.init(params);

        if (params.orientation)
            this.#orientation = params.orientation;

        this.children = params.children;
    }

    build(): HTMLElement {
        this.element.classList.add("whelmed-box");
        this.element.style.display = "flex";
        this.element.style.flexDirection = this.#orientation === "horizontal" ? "row" : "column";

        for (const child of this.children) {
            this.element.appendChild(child.build());
        }
        
        this.element.classList.add("whelmed-box");

        return this.element;
    }
}
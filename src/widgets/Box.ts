import { Widget } from "../widget";

interface params {
    children: Array<Widget>,
    orientation?: "horizontal" | "vertical"
}

export class Box extends Widget {
    children: Array<Widget>;
    #orientation: "horizontal" | "vertical" = "horizontal"

    constructor(params: params) {
        super();

        if (params.orientation)
        this.#orientation = params.orientation;

        this.children = params.children;
    }

    build(): HTMLElement {
        let self = document.createElement("div");
        self.classList.add("whelmed-box");
        self.style.display = "flex";
        self.style.flexDirection = this.#orientation === "horizontal" ? "row" : "column";

        for (const child of this.children) {
            self.appendChild(child.build());
        }
        
        self.classList.add("whelmed-box");

        return self;
    }
}
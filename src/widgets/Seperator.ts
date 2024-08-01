import { Widget, WidgetParams } from "./Widget";

interface params extends WidgetParams {
    orientation?: "horizontal" | "vertical"
}

export class Seperator extends Widget {
    private orientation: "horizontal" | "vertical" = "horizontal";

    element: HTMLDivElement = document.createElement("div");

    constructor(params: params) {
        super();
        super.init(params);

        if (params.orientation)
            this.orientation = params.orientation;
    }

    build(): HTMLElement {
        this.element.classList.add("whelmed-seperator", `whelmed-seperator-${this.orientation}`);

        return this.element;
    }
}
import { Widget, WidgetParams } from "./Widget";

interface params extends WidgetParams {
    label: string,
    onclick?: () => void,
    style?: "regular" | "flat" | "suggested" | "destructive";
}

export class Button extends Widget {
    #label_text: string;

    element: HTMLButtonElement = document.createElement("button");

    #onclick: (() => void) | undefined;

    style: "regular" | "flat" | "suggested" | "destructive" = "regular";

    constructor(params: params) {
        super();
        super.init(params);

        this.#label_text = params.label;

        this.#onclick = params.onclick;

        if (params.style)
            this.style = params.style;
    }

    build(): HTMLElement {
        this.element.classList.add("whelmed-button", this.style);
        this.element.innerText = this.label;
        
        if (this.#onclick) {
            this.onclick = this.#onclick;
        }

        return this.element;
    }

    set label(label: string) {
        this.#label_text = label;
        this.element.innerText = label;
    }
    get label() { return this.#label_text };

    set onclick(fn: () => void) { this.element.onclick = fn; }
}
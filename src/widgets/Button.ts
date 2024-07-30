import { Widget } from "../widget";

interface params {
    label: string,
    onclick?: () => void
}

export class Button extends Widget {
    #label_text: string;

    #element: HTMLButtonElement = document.createElement("button");

    #onclick: (() => void) | undefined;

    constructor(params: params) {
        super();

        this.#label_text = params.label;

        this.#onclick = params.onclick;
    }

    build(): HTMLElement {
        this.#element.classList.add("whelmed-button");
        this.#element.innerText = this.label;
        
        if (this.#onclick) {
            this.onclick = this.#onclick;
        }

        return this.#element;
    }

    set label(label: string) {
        this.#label_text = label;
        this.#element.innerText = label;
    }
    get label() { return this.#label_text };

    set onclick(fn: () => void) { this.#element.onclick = fn; }
}
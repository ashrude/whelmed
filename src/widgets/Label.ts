import { Widget } from "../widget";
import { Binding } from "..";

interface params {
    label: string | Binding<string>
}

export class Label extends Widget {
    #label_text: string | Binding<string>;
    #label_binding: number = 0;

    #element: HTMLSpanElement = document.createElement("span");

    constructor(params: params) {
        super();

        this.#label_text = params.label;
    }

    build(): HTMLElement {
        this.#element.classList.add("whelmed-label");
        
        this.label = this.#label_text;

        return this.#element;
    }

    set label(label: string | Binding<string>) {
        this.#label_text = label;
        
        if (typeof this.#label_text !== "string") {
            this.#label_text.unsubscribe(this.#label_binding);
        }

        (async () => {
            if (typeof label === "string") {
                this.#element.innerText = label;
            } else {
                this.#element.innerText = await label.get();

                this.#label_binding = label.subscribe((value) => {
                    this.#element.innerText = value;
                })
            }
        })();
    }
    get label() { return this.#label_text };
}
import { Widget, WidgetParams } from "./Widget";
import { Binding } from "..";
import { Align, Align_CssName } from "./common";

interface params extends WidgetParams {
    label: string | Binding<string>,
    valign?: Align,
    halign?: Align,
}

export class Label extends Widget {
    #label_text: string | Binding<string>;
    #label_binding: number = 0;

    element: HTMLSpanElement = document.createElement("span");

    private valign: Align = Align.start;
    private halign: Align = Align.start;

    constructor(params: params) {
        super();
        super.init(params);

        this.#label_text = params.label;

        if (params.valign)
            this.valign = params.valign;
        if (params.halign)
            this.halign = params.halign;
    }

    build(): HTMLElement {
        this.element.classList.add("whelmed-label");
        
        this.label = this.#label_text;

        this.element.style.display = "flex";
        this.element.style.alignItems = Align_CssName(this.valign);
        this.element.style.justifyContent = Align_CssName(this.halign);

        return this.element;
    }

    set label(label: string | Binding<string>) {
        Binding.disregard_unsubscribe(
            this.#label_text,
            this.#label_binding
        );
        this.#label_binding = 0;

        this.#label_text = label;
        this.#label_binding = Binding.disregard_set(
            this.#label_text,
            value => this.element.innerText = value,
        );
    }
    get label() { return this.#label_text };
}
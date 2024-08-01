import { Widget, WidgetParams } from "./Widget";
import { Row } from "./Row";
import { Binding } from "..";

interface params extends WidgetParams {
    label: string | Binding<string>,
    description: string | Binding<string>,
    child?: Widget
}

export class GenRow extends Row {
    private label_text: string | Binding<string>;
    private label_binding: number = 0;
    private description_text: string | Binding<string>;
    private description_binding: number = 0;

    private label_elm: HTMLSpanElement = document.createElement("span");
    private description_elm: HTMLSpanElement = document.createElement("span");

    private child?: Widget;

    element = document.createElement("div");

    constructor(params: params) {
        super();
        super.init(params);

        this.label_text = params.label;
        this.description_text = params.description;

        this.child = params.child;
    }

    build(): HTMLElement {
        this.element.classList.add("whelmed-genrow", "whelmed-row");
        this.label_elm.classList.add("whelmed-genrow-label");
        this.description_elm.classList.add("whelmed-genrow-description");
        
        this.element.append(this.label_elm);
        this.element.append(this.description_elm);

        if (this.child)
            this.element.append(this.child.build());

        this.label = this.label_text;
        this.description = this.description_text;

        return this.element;
    }

   

    set label(label: string | Binding<string>) {
        Binding.disregard_unsubscribe(
            this.label_text,
            this.label_binding
        );
        this.label_binding = 0;
        this.label_text = label;

        this.label_binding = Binding.disregard_set(
            this.label_text,
            value => this.label_elm.innerText = value
        )
    }
    get label() { return this.label_text }

    set description(desc: string | Binding<string>) {
        Binding.disregard_unsubscribe(
            this.description_text,
            this.description_binding
        );
        this.description_binding = 0;
        this.description_text = desc;

        this.description_binding = Binding.disregard_set(
            this.description_text,
            value => this.description_elm.innerText = value
        )
    }
    get description() { return this.label_text }
}
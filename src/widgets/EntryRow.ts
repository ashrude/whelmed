import { Row } from "./Row";
import { WidgetParams } from "./Widget";
import { Binding } from "..";

interface params extends WidgetParams {
    label: string | Binding<string>,
    value?: Binding<string>,
}

export class EntryRow extends Row {
    private label_text: string | Binding<string>;
    private label_binding: number = 0;
    private label_elm: HTMLSpanElement = document.createElement("span");

    private entry_elm: HTMLInputElement = document.createElement("input");

    value = new Binding("");

    element: HTMLDivElement = document.createElement("div");

    constructor(params: params) {
        super();
        super.init(params);
        this.element.setAttribute("type", "text");

        this.label_text = params.label;
        if (params.value)
            this.value = params.value;
    }

    build(): HTMLElement {
        this.element.classList.add("whelmed-entryrow", "whelmed-row");
        this.label_elm.classList.add("whelmed-entryrow-label");

        this.element.append(this.label_elm);
        this.element.append(this.entry_elm);

        this.label = this.label_text;

        this.entry_elm.oninput = (v) => {
            this.value.set(this.entry_elm.value);
        };

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
}
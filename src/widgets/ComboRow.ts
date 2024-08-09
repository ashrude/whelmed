import { Widget, WidgetParams } from "./Widget"
import { Binding, Row } from ".."

interface params extends WidgetParams {
    label: string | Binding<string>,
    description: string | Binding<string>,
    value?: Binding<string | null>,
    options: Record<string, string>
}

export class ComboRow extends Row {
    private label_text: string | Binding<string>;
    private label_binding: number = 0;
    private description_text: string | Binding<string>;
    private description_binding: number = 0;

    private label_elm: HTMLSpanElement = document.createElement("span");
    private description_elm: HTMLSpanElement = document.createElement("span");

    private select_elm = document.createElement("select");

    private options: Record<string, string>;

    value = new Binding<string | null>(null);

    element = document.createElement("div");

    constructor(params: params) {
        super();
        super.init(params);

        this.label_text = params.label;
        this.description_text = params.description;

        this.options = params.options;

        if (params.value)
            this.value = params.value;
    }


    build(): HTMLElement {
        this.element.classList.add("whelmed-comborow", "whelmed-row");
        this.label_elm.classList.add("whelmed-comborow-label");
        this.description_elm.classList.add("whelmed-comborow-description");


        this.element.append(
            this.label_elm,
            this.description_elm,
            this.select_elm,
        );

        for (const key of Object.keys(this.options)) {
            const option = document.createElement("option");
            option.value = key;
            option.innerText = this.options[key];
            this.select_elm.append(option);
        }

        this.label = this.label_text;
        this.description = this.description_text;

        this.select_elm.onchange = async (e) => {
            const val = (e.target as HTMLSelectElement).value;

            await this.value.set(val);
        }

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
import { Binding } from "..";
import { Widget, WidgetParams } from "./Widget";

interface params extends WidgetParams {
    child: Widget,
    active?: Binding<boolean>
}

export class Dialog extends Widget {
    child: Widget;

    readonly active: Binding<boolean> = new Binding(false);

    element: HTMLDialogElement = document.createElement("dialog");

    constructor(params: params) {
        super();
        super.init(params);

        if (params.active)
            this.active = params.active;

        this.child = params.child;
    }

    build(): HTMLElement {
        this.element.classList.add("whelmed-dialog");

        this.element.append(
            this.child.build()
        );

        this.active.subscribe((val) => {
            if (val) {
                this.element.showModal();
                this.element.classList.add("active");
            }

            if (!val) {
                this.element.classList.remove("active");
                setTimeout(() => {
                    this.element.close();
                }, 200); // Make configurable
            }
        })

        return this.element;
    }
}
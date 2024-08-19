import { Dialog } from "./Dialog";
import { Widget } from "./Widget";

interface params {
    id: string,
    child: Widget,
    dialogs?: Array<Dialog>
}

export class Application extends Widget {
    id: string;
    child: Widget;
    dialogs: Array<Dialog>;

    element: HTMLElement = document.createElement("div");

    constructor(params: params) {
        super();


        this.dialogs = [];
        if (params.dialogs)
            this.dialogs = params.dialogs;

        this.id = params.id;
        this.child = params.child;
    }

    build(): HTMLElement {
        const child = this.child.build();

        const dialogs = document.createElement("div");
        for (const dialog of this.dialogs) {
            dialogs.append( dialog.build() );
        }

        this.element.id = this.id;
        this.element.append(dialogs, child);
        this.element.classList.add("whelmed-app");

        return this.element;
    }
}
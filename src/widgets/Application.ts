import { Widget } from "../widget";

interface params {
    id: string,
    child: Widget
}

export class Application extends Widget {
    id: string;
    child: Widget;

    constructor(params: params) {
        super();

        this.id = params.id;
        this.child = params.child;
    }

    build(): HTMLElement {
        const child = this.child.build();

        const self = document.createElement("div");
        self.id = this.id;
        self.appendChild(child);

        return self;
    }
}
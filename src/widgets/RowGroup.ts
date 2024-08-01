import { Widget, WidgetParams } from "./Widget";

import { Row } from "./Row";
import { Binding } from "..";

interface params extends WidgetParams {
    children: Array<Row>
}

export class RowGroup extends Widget {
    children: Array<Row>;

    element: HTMLDivElement = document.createElement("div");

    constructor(params: params) {
        super();
        super.init(params);

        this.children = params.children;
    }

    build(): HTMLElement {
        this.element.classList.add("whelmed-rowgroup");
        this.element.style.display = "flex";
        this.element.style.flexDirection = "column";

        for (const i in this.children) {
            if (Number(i) !== 0 && Number(i) != (this.children.length - 1))
                this.children[i].position_row("middle");

            if (Number(i) === 0)
                this.children[i].position_row("start");

            if (Number(i) === (this.children.length - 1))
                this.children[i].position_row("end");

            this.element.appendChild(this.children[i].build());
        }

        return this.element;
    }
}
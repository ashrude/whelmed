import { Widget } from "./Widget";

export abstract class Row extends Widget {
    position_row(position: "start" | "middle" | "end") {
        this.element.classList.remove("whelmed-row-start", "whelmed-row-end", "whelmed-row-middle");
        this.element.classList.add(`whelmed-row-${position}`);
    }
}

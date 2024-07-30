import {
    Label,
    Button,
    Component,
    Binding,
    Widget,
    Box,
    matchAll
} from "../src";

type Widgets = {
    counter: Label
}

export type Output = {
    Pressed: null
}

type Input = {
    Pressed: null
}

type Model = {
    counter: Binding<string>
}

type Init = { start: number }

export default class Counter extends Component<
    Input,
    Output,
    Model,
    Init,
    Widgets
> {

    root = new Box({
        orientation: "horizontal",
        children: [
            new Label({
                label: this.model.counter
            }),
            new Button({
                label: "Press Me",
                onclick: () => {this.input("Pressed", null)}
            })
        ]
    });

    init(init: Init): Model {
        return {
            counter: new Binding(init.start.toString())
        }
    }

    update<T extends "Pressed">(key: T, value: Input[T]) {
        matchAll<Input>(key, value, {
            Pressed: (_) => {
                this.model.counter.update((val) => {
                    return String(Number(val) + 1)
                });
                this.output("Pressed", null);
            }
        })
    }
}
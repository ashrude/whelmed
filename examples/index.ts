import {
    Label,
    Application,
    Widget,
    Box,
    Button,
    Binding,
    Component,
    matchAll
} from "../src";

import {default as Counter, Output as CounterOutput } from "./Counter";

type widgets = {
    label?: Label,
    button?: Button
}

type Input = {
    Increment: null,
    Decrement: null
}

type Model = {
    counter: Binding<number>,
    counterStr: Binding<string>,
    Counter: Counter
}

type Init = { num: number }

class MyApp extends Component<Input, {}, Model, Init, widgets> {

    root = new Application({
        id: "ca.ashleyr.WhelmedDemo",
        
        child: new Box({
            orientation: "vertical",
            children: [
                new Label({
                    label: this.model.counterStr
                }).export(this.widgets, "label"),

                new Button({
                    label: "Increment",
                    onclick: () => {this.input("Increment", null)}
                }),
                new Button({
                    label: "Decrement",
                    onclick: () => {this.input("Decrement", null)}
                }),
                this.model.Counter.root
            ]
        })
    })

    init(init: Init): Model {
        let counter = new Binding(init.num);
        let counterStr = new Binding(init.num.toString())

        counter.subscribe((val) => {
            counterStr.set(val.toString());
        });

        let countercmp = new Counter({start: 3});
        countercmp.forward((key, value) => {
            matchAll<CounterOutput>(key, value, {
                Pressed: (_) => {
                    this.input("Increment", null);
                }
            })
        })

        return {
            counter,
            counterStr,
            Counter: countercmp
        }
    }

    update<T extends keyof Input>(key: T, value: Input[T]) {
        
        matchAll<Input>(key, value, {
            Increment: (_) => {
                this.model.counter.update((val) => {
                    return val += 1;
                }) 
            },
            Decrement: (_) => {
                this.model.counter.update((val) => {
                    return val -= 1;
                }) 
            }
        });
    }
}

const app = new MyApp({num: 5});

document.body.appendChild(
    app.root.build()
)
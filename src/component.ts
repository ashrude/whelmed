import { Widget } from "./widgets/Widget";

export interface Component<
INPUT,
OUTPUT,
MODEL,
INIT,
WIDGETS
> {
}

export abstract class Component<
    INPUT,
    OUTPUT,
    MODEL,
    INIT,
    WIDGETS
> {
    #forwarder: (<K extends keyof OUTPUT>(key: K, value: OUTPUT[K]) => void) | null = null;

    model: MODEL;
    widgets: WIDGETS = {} as any;
    
    abstract root: Widget;

    constructor(init: INIT) {
        this.model = this.init(init);
    };

    abstract init(init: INIT): MODEL;

    input<K extends keyof INPUT>(key: K, value: INPUT[K]): void {
        this.update(key, value);
    }
    output<K extends keyof OUTPUT>(key: K, value: OUTPUT[K]): void {
        if (this.#forwarder) {
            this.#forwarder(key, value);
        }
    }
    
    abstract update<T extends keyof INPUT>(key: T, value: INPUT[T]): void;

    forward(forwarder: <K extends keyof OUTPUT>(key: K, value: OUTPUT[K]) => void) {
        this.#forwarder = forwarder;
    }
}
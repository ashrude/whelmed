import { Widget } from "./widgets/Widget";

export interface Component<
INPUT,
OUTPUT,
MODEL,
INIT,
WIDGETS
> {
    updateView?(): Promise<void> | void
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

        if(this.updateView)
            this.updateView();
    };

    abstract init(init: INIT): MODEL;

    async input<K extends keyof INPUT>(key: K, value: INPUT[K]): Promise<void> {
        await this.update(key, value);
        if(this.updateView)
            await this.updateView();
    }
    output<K extends keyof OUTPUT>(key: K, value: OUTPUT[K]): void {
        if (this.#forwarder) {
            this.#forwarder(key, value);
        }
    }
    
    abstract update<T extends keyof INPUT>(key: T, value: INPUT[T]): Promise<void> | void;

    forward(forwarder: <K extends keyof OUTPUT>(key: K, value: OUTPUT[K]) => void) {
        this.#forwarder = forwarder;
    }
}
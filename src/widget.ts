export abstract class Widget {
    export<T>(widgets: T, name: keyof T) {
        (widgets[name] as any) = this;
        return this;
    }

    abstract build(): HTMLElement
}
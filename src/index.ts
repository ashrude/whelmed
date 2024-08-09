export * from "./widgets/Application";
export * from "./widgets/Label";
export * from "./widgets/Box";
export * from "./widgets/Button";
export * from "./widgets/Seperator";
export * from "./widgets/Row";
export * from "./widgets/GenRow";
export * from "./widgets/RowGroup";
export * from "./widgets/EntryRow";
export * from "./widgets/ComboRow";


export * from "./component";
export * from "./widgets/Widget";

export class Binding<T> {
    static disregard_set<H>(
        value: H | Binding<H>,
        setter: (value: H) => void
    ): number {
        if (value instanceof Binding) {
            value.get().then(setter);
            return value.subscribe(setter);
        }

        setter(value);
        return 0;
    }
    static disregard_unsubscribe<H>(
        value: H | Binding<H>,
        id: number
    ) {
        if (value instanceof Binding)
            value.unsubscribe(id);
    }

    #subscriptions: Record<number, (value: T) => void> = {};
    #count: number = 1;

    value: T; // Using this value directly is risky

    #promise: Promise<void> = new Promise((res, _) => res());

    constructor(init: T) {
        this.value = init;
    }

    subscribe(fn: (value: T) => void): number {
        this.#count += 1;
        this.#subscriptions[this.#count] = fn;

        return this.#count;
    }
    unsubscribe(id: number) {
        try {
            delete this.#subscriptions[id];
        } catch {}
    }

    async update(fn: (value: T) => T) {
        await this.#promise;
        this.#promise = new Promise(async (res, rej) => {
            this.value = await fn(this.value);

            for (const id of Object.keys(this.#subscriptions)) {
                this.#subscriptions[Number(id)](this.value);
            }

            res();
        });
    }

    set(value: T): Promise<void> {
        return new Promise(async (res, _) => {
            await this.update((_) => {
                return value;
            });
            res();
        })
    }

    async get(): Promise<T> {
        await this.#promise;
        return this.value;
    }
}

export function match<T, R = void, V = any>(
    key: keyof T,
    value: V,
    match: {
        [K in keyof T]?: (value: T[K]) => R
    },
    catchAll: (value: V) => R
): R {
    if (key in match && match[key] !== undefined) {
        return ((match[key] as any)(value)) as R;
    }
    return catchAll(value);
}

export function matchAll<T, R = void, V = any>(
    key: keyof T,
    value: V,
    match: {
        [K in keyof T]: (value: T[K]) => R
    }
): R {
    return ((match[key] as any)(value)) as R;
}
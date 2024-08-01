export interface WidgetParams {
    margins?: {
        margin?: string,
        inline?: string,
        block?: string,
        top?: string,
        bottom?: string,
        start?: string,
        end?: string,
    },
    class?: Array<string> | string,
    height?: string,
    width?: string
}

export abstract class Widget {
    abstract element: HTMLElement;

    export<T>(widgets: T, name: keyof T) {
        (widgets[name] as any) = this;
        return this;
    }

    abstract build(): HTMLElement

    init(params: WidgetParams) {
        this._margins(params.margins);

        if (params.class)
            this.add_class(params.class);
        
        this.set_size(params);
    }

    add_class(c: string | Array<string>) {
        if ( typeof c === "string" ) {
            this.element.classList.add(c);
            return;
        }
        for (const elm of c) {
            this.element.classList.add(elm);
        }
    }
    set_size(size: {width?: string, height?: string}) {
        if (size.width)
            this.element.style.width = size.width;
        if (size.height)
            this.element.style.height = size.height;
    }

    _margins(margins: WidgetParams["margins"] | undefined) {
        if (!margins) return;

        if ( margins.margin )  this.margin         = margins.margin;
        if ( margins.inline )  this.margin_inline  = margins.inline;
        if ( margins.block )   this.margin_block   = margins.block;
        if ( margins.top )     this.margin_top     = margins.top;
        if ( margins.bottom )  this.margin_bottom  = margins.bottom;
        if ( margins.start )   this.margin_start   = margins.start;
        if ( margins.end )     this.margin_end     = margins.end;
    }

    set margin          (margin: string) { this.element.style.margin         = margin; }
    set margin_inline   (margin: string) { this.element.style.marginInline   = margin; }
    set margin_block    (margin: string) { this.element.style.marginBlock    = margin; }
    set margin_top      (margin: string) { this.element.style.marginTop      = margin; }
    set margin_bottom   (margin: string) { this.element.style.marginBottom   = margin; }
    set margin_start    (margin: string) { this.element.style.marginLeft     = margin; }
    set margin_end      (margin: string) { this.element.style.marginRight    = margin; }
}
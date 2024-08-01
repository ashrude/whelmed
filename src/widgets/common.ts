export enum Align {
    start,
    center,
    end
}

export function Align_CssName(member: Align): "start" | "center" | "end" {
    switch (member) {
        case Align.start:
            return "start"
        case Align.center:
            return "center";
        case Align.end:
            return "end"
    }
}
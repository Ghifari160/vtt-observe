export enum Mode {
    Remove,
    AddStyle,
};

export type Mod = {
    q:string
    mode:Mode
    param?:any
};

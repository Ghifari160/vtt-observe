class BEM {
    private block:string

    constructor(block:string) {
        this.block = block;
    }

    private joinModifiers(root:string, modifiers:string[]):string {
        let className:string = root;

        if (typeof modifiers === "undefined") {
            modifiers = [];
        }

        modifiers.forEach((modifier) => {
            className += ` ${root}--${modifier}`;
        });

        return className;
    }

    getBlock(modifiers?:string[]):string {
        return this.joinModifiers(this.block, modifiers);
    }

    getElement(element:string, modifiers?:string[]):string {
        return this.joinModifiers(`${this.block}__${element}`, modifiers);
    }
}

export default BEM;

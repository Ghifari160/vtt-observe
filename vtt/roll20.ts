import { Config } from "../common";

class Roll20Config extends Config {
    constructor() {
        super();
    }

    protected setDefaults() {
        super.setDefaults();

        this.set("roll20.toolbar", true);
        this.set("roll20.zoom", true);
        this.set("roll20.darkmodeTgl", true);
    }
};
export default Roll20Config;

export function getRemQ(conf:Config):string[] {
    let remQ:string[] = [];

    if (conf.enabled("roll20.toolbar")) {
        remQ.push("#floatingtoolbar");
    }

    if (conf.enabled("roll20.zoom")) {
        remQ.push("#zoomclick");
    }

    if (conf.enabled("roll20.darkmodeTgl")) {
        remQ.push(".dark-mode-switch");
    }

    return remQ;
}

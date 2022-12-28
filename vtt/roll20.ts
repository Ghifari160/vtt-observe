import { Config } from "../common";
import { Mode, Mod } from "./mod";

class Roll20Config extends Config {
    constructor() {
        super();
    }

    protected setDefaults() {
        super.setDefaults();

        this.set("roll20.toolbar", true);
        this.set("roll20.zoom", true);
        this.set("roll20.darkmodeTgl", true);
        this.set("roll20.playerBox", false);
        this.set("roll20.scrollbar", true);
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

    if (conf.enabled("roll20.playerBox")) {
        remQ.push("#playerzone");
    }

    return remQ;
}

export function getModQ(conf:Config):Mod[] {
    let modQ:Mod[] = [];

    if (conf.enabled("roll20.toolbar")) {
        modQ.push({
            q: "#floatingtoolbar",
            mode: Mode.Remove,
        });
    }

    if (conf.enabled("roll20.zoom")) {
        modQ.push({
            q: "#zoomclick",
            mode: Mode.Remove,
        });
    }

    if (conf.enabled("roll20.darkmodeTgl")) {
        modQ.push({
            q: ".dark-mode-switch",
            mode: Mode.Remove,
        });
    }

    if (conf.enabled("roll20.playerBox")) {
        modQ.push({
            q: "#playerzone",
            mode: Mode.Remove,
        });
    }

    if (conf.enabled("roll20.scrollbar")) {
        modQ.push({
            q: "#editor-wrapper",
            mode: Mode.AddStyle,
            param: "overflow: hidden !important;",
        });
    }

    return modQ;
}

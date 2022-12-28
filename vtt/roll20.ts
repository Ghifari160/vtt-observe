import { Config } from "../common";
import { Mode, Mod } from "./mod";

class Roll20Config extends Config {
    constructor() {
        super();
    }

    protected setDefaults() {
        super.setDefaults();

        this.set("roll20.toolbar", true, "Hide Toolbar");
        this.set("roll20.zoom", true, "Hide Zoom");
        this.set("roll20.darkmodeTgl", true, "Hide Dark Mode Switch");
        this.set("roll20.playerBox", false, "Hide Players");
        this.set("roll20.scrollbar", true, "Hide Scroll Bar");
    }
};
export default Roll20Config;

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

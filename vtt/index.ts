import { Config } from "../common";
import { Mode, Mod } from "./mod";

const ROLL20:string = "roll20";

interface URLMap {
    [url:string]:string
};

const URLS:URLMap = {
    "https://app.roll20.net/editor/": ROLL20,
};

export function getVTTID(url:string):string {
    for (const u in URLS) {
        if (typeof url !== "undefined" && url.startsWith(u)) {
            return URLS[u];
        }
    }

    return undefined;
}

export async function getConfig(url:string):Promise<Config> {
    const id = getVTTID(url);

    if (id !== undefined) {
        switch (id) {
            case ROLL20:
                return new (await require("./roll20").default);
        }
    }

    return new Config();
}

export async function getModQ(url:string, config:Config):Promise<Mod[]> {
    const id = getVTTID(url);

    if (id !== undefined) {
        switch (id) {
            case ROLL20:
                return (await require("./roll20")).getModQ(config);
        }
    }

    return [];
}

export { Mode, Mod };

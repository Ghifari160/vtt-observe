import { ConfEntry, Config } from "./config";

const ROLL20:string = "roll20";

interface URLMap {
    [url:string]:string
};

const URLS:URLMap = {
    "https://app.roll20.net/editor/": ROLL20,
};

export function getVTTID(url:string):string {
    for (const u in URLS) {
        if (url.startsWith(u)) {
            return URLS[u];
        }
    }

    return undefined;
}

export async function getRemoveQueries(url:string):Promise<string[]> {
    const id = getVTTID(url);

    if (id !== undefined) {
        switch (id) {
            case ROLL20:
                return await require("./roll20.json").remove;
        }
    }

    return undefined;
}

export { ConfEntry, Config };

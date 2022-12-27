import { Config } from "../common";

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

export async function getRemQ(url:string, config:Config):Promise<string[]> {
    const id = getVTTID(url);

    if (id !== undefined) {
        switch (id) {
            case ROLL20:
                return (await require("./roll20")).getRemQ(config);
        }
    }

    return [];
}

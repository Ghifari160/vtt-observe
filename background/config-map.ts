import { Config } from "../common";

interface storageObj {
    [key:string]: any
};

const CHROME_STORAGE_LOC = chrome.storage.session;

export class ConfigMap {
    private storage:chrome.storage.StorageArea;

    constructor() {
        this.storage = CHROME_STORAGE_LOC;
    }

    async set(tabID:number, conf:Config) {
        this.storage.set({[`${tabID}`]: conf.serialize()});
    }

    async get(tabID:number):Promise<Config> {
        const conf = (await this.storage.get([`${tabID}`])) as storageObj;
        const confStr = conf[`${tabID}`];

        return deserialize(confStr);
    }
};

function deserialize(entries:string):Config {
    if (typeof entries === "undefined") {
        return undefined;
    }

    let conf = new Config();
    conf.deserialize(entries);

    return conf;
}

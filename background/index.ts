import app from "../package.json";
import { Opcode, Message, MsgBuilder, Config, log } from "../common";
import { ConfigMap } from "./config-map";
import { getConfig, getRemQ, Mod, getModQ } from "../vtt";

const ON = "ON";
const OFF = "OFF";

async function getTabIndex(tabID:number):Promise<number> {
    const tab = await chrome.tabs.get(tabID);
    return tab.index;
}

async function getTabURL(tabID:number):Promise<string> {
    const tab = await chrome.tabs.get(tabID);
    return tab.url;
}

let confMap = new ConfigMap();

chrome.runtime.onConnect.addListener(async (port) => {
    port.onMessage.addListener(async (msg:Message) => {
        const opcode = msg.opcode;
        const tabID = msg.tabID;
        const tabIndex = await getTabIndex(tabID);
        const tabURL = await getTabURL(tabID);

        let conf:Config;
        switch (opcode) {
            case Opcode.Set:
                log(`SET from ${tabID}.`);

                conf = new Config();
                conf.deserialize(msg.payload);

                await confMap.set(tabID, conf);

                handleConfChange(confMap, tabID, tabIndex, tabURL);
                break;

            case Opcode.Get:
                log(`GET from ${tabID}.`);

                conf = await confMap.get(tabID);
                if (typeof conf === "undefined") {
                    conf = await getConfig(tabURL);
                }

                port.postMessage(MsgBuilder(Opcode.Set, tabID, conf));
                break;

            case Opcode.Info:
                log(`INFO from ${tabID}: ${msg.payload}`);
                break;
        }
    });
});

async function handleConfChange(confMap:ConfigMap, tabID:number, tabIndex:number, tabURL:string) {
    const conf = await confMap.get(tabID);

    if (conf.enabled("global")) {
        log(`Enabling on tab ${tabIndex}.`);

        const modQ = await getModQ(tabURL, conf);
        const remQ = await getRemQ(tabURL, conf);

        chrome.scripting.executeScript({
            target: { tabId: tabID },
            func: modUI,
            args: [ app.name, modQ ],
        });

        chrome.scripting.executeScript({
            target: { tabId: tabID },
            func: removeUI,
            args: [ app.name, remQ ],
        });
    } else {
        log(`Disabling on tab ${tabIndex}.`);

        chrome.tabs.reload(tabID);
    }
}

function removeUI(app:void, remQ:void) {
    const log = function(message:string){
        console.log(`[${app}] ${message}`);
    };

    let q = remQ as unknown as string[];

    let remCount:number = 0;

    q.forEach((query) => {
        const elems = document.querySelectorAll(query);

        if (elems.length > 1) {
            log(`Removing multiple instances of ${query}.`);
        } else {
            log(`Removing ${query}.`);
        }

        elems.forEach((elem) => {
            elem.remove();
            remCount++;
        })
    });

    log(`Removed ${remCount} UI elements.`);
}

function modUI(app:void, modQ:void) {
    const log = function(message:string){
        console.log(`[${app}] ${message}`);
    };

    enum Mode {
        Remove,
        AddStyle,
    };

    const addStyle = function(elem:Element, param:any) {
        if (typeof param !== "string") {
            return;
        }

        const curr = elem.getAttribute("style");
        elem.setAttribute("style", `${param}${curr}`);
    };

    const remove = function(elem:Element, param:any) {
        elem.remove();
    }

    let q = modQ as unknown as Mod[];

    let modCount:number = 0;

    q.forEach((query) => {
        const elems = document.querySelectorAll(query.q);

        if (elems.length > 1) {
            log(`Modifying multiple instances of ${query.q}.`);
        } else {
            log(`Modifying ${query.q}.`);
        }

        elems.forEach((elem) => {
            switch (query.mode) {
                case Mode.Remove:
                    remove(elem, query.param);
                    modCount++;
                    break;

                case Mode.AddStyle:
                    addStyle(elem, query.param);
                    modCount++;
                    break;

                default:
                    break;
            }
        });
    });

    log(`Modified ${modCount} UI elements.`);
}

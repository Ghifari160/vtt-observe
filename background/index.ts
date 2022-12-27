import app from "../package.json";
import { getRemQ } from "../vtt";
import { Message, Config, log } from "../common";

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

chrome.runtime.onConnect.addListener(async (port) => {
    let confMap = new Map<number, Config>();

    port.onMessage.addListener(async (msg:Message) => {
        const tabID = msg.tabID;
        const tabIndex = await getTabIndex(tabID);
        const tabURL = await getTabURL(tabID);

        let conf = new Config();
        conf.deserialize(msg.config);

        confMap.set(tabID, conf);

        handleConfChange(confMap, tabID, tabIndex, tabURL);
    });
});

async function handleConfChange(confMap:Map<number, Config>, tabID:number, tabIndex:number, tabURL:string) {
    const conf = confMap.get(tabID);

    if (conf.enabled("global")) {
        log(`Enabling on tab ${tabIndex}.`);

        const remQ = await getRemQ(tabURL, conf);

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

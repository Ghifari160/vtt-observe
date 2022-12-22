import app from "../package.json";
import { getVTTID, getRemoveQueries } from "../vtt";

const ON = "ON";
const OFF = "OFF";

function log(message:string){
    console.log(`[${app.name}] ${message}`);
}

chrome.runtime.onInstalled.addListener(() => {
    log(`${app.name} v${app.version} loaded.`);

    chrome.action.setBadgeText({text: OFF});
});

chrome.action.onClicked.addListener(async (tab) => {
    if (getVTTID(tab.url) !== undefined) {
        let state = await chrome.action.getBadgeText({tabId: tab.id});
        state = state === ON ? OFF : ON;

        await chrome.action.setBadgeText({text: state, tabId: tab.id});

        if (state === ON) {
            log(`Enabling on tab ${tab.index}.`);

            const remQ = await getRemoveQueries(tab.url);

            chrome.scripting.executeScript({
                target: {tabId: tab.id},
                func: removeUI,
                args: [ app.name, remQ],
            });
        } else if (state === OFF) {
            log(`Disabling on tab ${tab.index}.`);

            chrome.tabs.reload(tab.id);
        }
    } else {
        log(`Cannot enable for tab ${tab.index} (${tab.url}): not a VTT.`);
    }
});

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

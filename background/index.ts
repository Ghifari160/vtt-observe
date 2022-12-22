import app from "../package.json";
import { RemoveQueries as roll20 } from "../content/roll20";

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
    if (tab.url.startsWith("https://app.roll20.net/editor/")) {
        const pState = await chrome.action.getBadgeText({tabId: tab.id});
        const nState = pState === ON ? OFF : ON;

        await chrome.action.setBadgeText({text: nState, tabId: tab.id});

        if (nState === ON) {
            log(`Enabling on tab ${tab.index}.`);

            chrome.scripting.executeScript({
                target: {tabId: tab.id},
                func: removeUI,
                args: [ app.name, roll20 ],
            });
        } else if (nState === OFF) {
            log(`Disabling on tab ${tab.index}. Reloading the page.`);

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

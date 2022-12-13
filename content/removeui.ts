import { Log } from "./logging";

// RemoveUI removes UI elements from an array of query selectors.
export function RemoveUI(remQ:string[]):void {
    let remCount:number = 0;

    remQ.forEach((query) => {
        const elems = document.querySelectorAll(query);

        if(elems.length > 1) {
            Log(`Removing multiple instances of ${query}.`)
        } else {
            Log(`Removing ${query}`);
        }

        elems.forEach((elem) => {
            elem.remove();
            remCount++;
        });
    });

    Log(`Removed ${remCount} UI elements.`);
};

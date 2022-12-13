import app from "../package.json";
import { Log } from "./logging";
import { RemoveUI } from "./removeui";
import { RemoveQueries as roll20} from "./roll20";

const enabled:boolean = true;
const vtt:string = "roll20";

Log(`${app.name} v${app.version} loaded.`);

let rmQ:string[];

if(vtt == "roll20") {
    rmQ = roll20;
}

if(enabled) {
    RemoveUI(rmQ);
}

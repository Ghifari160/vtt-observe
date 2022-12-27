import app from "../package.json";

export function log(message:string){
    console.log(`[${app.name}] ${message}`);
}

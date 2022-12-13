import app from "../package.json";

const prefix:string = `[${app.name}]`;

// Log wraps console.log and prepends the app prefix to all log entries.
export function Log(message: any):void {
    console.log(prefix+" "+message);
}

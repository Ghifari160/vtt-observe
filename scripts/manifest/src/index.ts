import path from "path";
import fs from "fs";
import process from "process";

const app = "VTT Observe";

const pkgManName = "package.json";
const extManName = "manifest.json";
const buildDir = "out";

const perms = [ "activeTab", "scripting" ];
const vttWhitelist = [ "https://app.roll20.net/editor/*" ];
const serviceWorker = "background.js";

main();

function main():void {
    const pkgManPath = path.resolve(process.cwd(), pkgManName);
    const outManPath = path.resolve(process.cwd(), "out", extManName);

    stepGenManifest(pkgManPath, outManPath);
}

function stepParseManifest(manPath:string):any {
    let manStr = fs.readFileSync(manPath, "utf8");

    return JSON.parse(manStr)
}

function stepGetBackground():any {
    return {
        service_worker: serviceWorker,
    };
}

function stepGetIcons():any {
    return {
        16: "images/icon-16.png",
        32: "images/icon-32.png",
        48: "images/icon-48.png",
        128: "images/icon-128.png",
    }
}

function stepGenManifest(pkgManPath:string, extManOut:string) {
    let pkg = stepParseManifest(pkgManPath);

    let ext = {
        // required fields
        manifest_version: 3,
        name: app,
        version: pkg.version,

        // recommended fields
        // default_locale: "en",
        description: pkg.description,
        icons: stepGetIcons(),

        // optional fields
        author: pkg.author,
        action: {
            default_icon: stepGetIcons(),
        },
        homepage_url: pkg.homepage,
        permissions: perms,
        background: stepGetBackground(),
    };

    let extStr = JSON.stringify(ext);

    fs.writeFileSync(extManOut, extStr);
}

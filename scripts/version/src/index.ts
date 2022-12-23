import path from "path";
import fs from "fs";
import process from "process";

const pkgMan = "package.json";
const pkgLock = "package-lock.json";

const MAJOR = "major";
const MINOR = "minor";

main();

function main():void {
    const args = process.argv.slice(2);

    if (args.length < 1) {
        return;
    }

    let verPart:string;
    switch (args[0].toLowerCase()) {
        case "major":
            verPart = MAJOR;
            break;

        case "minor":
        default:
            verPart = MINOR;
            break;
    }

    bumpPkg(verPart, path.resolve(process.cwd(), pkgMan));
    bumpPkgLock(verPart, path.resolve(process.cwd(), pkgLock));
}

function parseSemver(semver:string):number[] {
    let parts = semver.split(".");

    if (parts.length < 3) {
        return [];
    }

    return [+parts[0], +parts[1], +parts[2]];
}

function stringifySemver(semver:number[]):string {
    let ver:string = "";

    semver.forEach((part) => {
        ver += `${part}.`;
    });

    return ver.substring(0, ver.length-1);
}

function bumpVer(verPart:string, ver:string):string {
    let semver = parseSemver(ver);

    switch(verPart) {
        case MAJOR:
            semver[0]++;
            break;

        case MINOR:
            semver[1]++;
            break;
    }

    return stringifySemver(semver);
}

function bumpPkg(verPart:string, pkgPath:string) {
    const pkgStr = fs.readFileSync(pkgPath, "utf8");
    let pkg = JSON.parse(pkgStr);

    pkg.version = bumpVer(verPart, pkg.version);

    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
}

function bumpPkgLock(verPart:string, pkgLockPath:string) {
    const pkgLockStr = fs.readFileSync(pkgLockPath, "utf8");
    let pkgLock = JSON.parse(pkgLockStr);

    pkgLock.version = bumpVer(verPart, pkgLock.version);
    pkgLock.packages[""].version = bumpVer(verPart, pkgLock.packages[""].version);

    fs.writeFileSync(pkgLockPath, JSON.stringify(pkgLock, null, 2));
}

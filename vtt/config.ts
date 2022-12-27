
export interface ConfEntry {
    key:string
    label:string
    enabled:boolean
};

function newEntry(key:string, label:string, enabled:boolean):ConfEntry {
    return {
        key: key,
        label: label,
        enabled: enabled,
    };
}

export class Config {
    private c:Map<string, ConfEntry>;

    constructor() {
        this.c = new Map<string, ConfEntry>();

        this.setDefaults();
    }

    protected setDefaults() {
        this.set("global");
    }

    set(key:string, enabled?:boolean, label?:string) {
        let entry = this.c.get(key);

        if (typeof entry !== "undefined") {
            if (typeof enabled === "undefined") {
                enabled = !entry.enabled;
            }

            if (typeof label === "undefined") {
                label = entry.label;
            }

            entry.enabled = enabled;
            entry.label = label;
        } else {
            if (typeof enabled === "undefined") {
                enabled = false;
            }

            if (typeof label === "undefined") {
                label = key;
            }

            entry = newEntry(key, label, enabled);
        }

        this.c.set(key, entry);
    }

    s(key:string, enabled:boolean) {
        let entry = this.c.get(key);

        if (typeof entry === "undefined") {
            entry = newEntry(key, key, enabled);
        } else {
            entry.enabled = enabled;
        }

        this.c.set(key, entry);
    }

    get(key:string):ConfEntry {
        return this.c.get(key);
    }

    getAll():ConfEntry[] {
        let entries:ConfEntry[] = [];

        for (let [_, entry] of this.c) {
            entries.push(entry);
        }

        return entries;
    }

    enabled(key:string):boolean {
        let entry = this.get(key);

        if (typeof entry !== "undefined") {
            return entry.enabled;
        }

        return false;
    }
};

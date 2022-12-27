import BEM from "./bem";
import { Message, Config, log } from "../common";
import React from "react";
import Toggle from "./toggle";


class Input extends React.Component<{
    label:string
    enabled:boolean
}, {
    BEM:BEM
}> {
    constructor(props:any) {
        super(props);

        this.state = {
            BEM: new BEM("input")
        };
    }

    render():React.ReactNode {
        const BEM = this.state.BEM;

        return <div className={BEM.getBlock()}>
            <div className={BEM.getElement("label")}>
                {this.props.label}
            </div>
            <div className={BEM.getElement("toggle")}>
                <Toggle enabled={this.props.enabled} />
            </div>
        </div>;
    }
};

class Configuration extends React.Component<{
    config:Config
    vttSupported:boolean
    tabID:number
}, {
    BEM:BEM,
    config:Config
    msg:chrome.runtime.Port
}> {
    constructor(props:any) {
        super(props);

        this.state = {
            BEM: new BEM("config"),
            config: props.config,
            msg: chrome.runtime.connect(null, {name: "popup"}),
        };
    }

    onClick(key:string) {
        let config = this.state.config;
        let op = 0;

        if (key == "global") {
            if (this.props.vttSupported) {
                config.set(key);
                op++;
            } else {
                log(`[${this.props.tabID}] Unsupported VTT or not a VTT.`);
            }
        } else {
            if (config.enabled("global")) {
                config.set(key);
                op++;
            }
        }

        if (op > 0) {
            log(`[${this.props.tabID}] ${key} set to ${config.enabled(key)}`);

            this.setState({ config: config });

            let msg:Message = {
                tabID: this.props.tabID,
                // config: config,
                config: config.serialize()
            };

            log(`[${this.props.tabID}] send msg`);
            this.state.msg.postMessage(msg);
        }
    }

    getEntries():React.ReactNode[] {
        const BEM = this.state.BEM;
        let nodes:React.ReactNode[] = [];
        let entries = this.state.config.getAll();

        entries.forEach((entry) => {
            nodes.push(<div key={entry.key} className={BEM.getElement(entry.key)}
                onClick={this.onClick.bind(this, entry.key)}>
                <Input label={entry.label} enabled={entry.enabled} />
            </div>);
        });

        return nodes;
    }

    render():React.ReactNode {
        const BEM = this.state.BEM;
        let modifiers:string[] = [];

        if (this.props.vttSupported) {
            modifiers.push("enabled");
        } else {
            modifiers.push("disabled");
        }

        return <div className={BEM.getBlock(modifiers)}>
            {this.getEntries()}
        </div>;
    }
};

export default Configuration;

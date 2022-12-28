import BEM from "../components/bem";
import Configuration from "../components/configuration";
import { getVTTID } from "../vtt";
import Heading from "../components/heading";
import React from "react";
import ReactDOM from "react-dom";

import "./popup.scss";

type Props = {
    appName:string
    vttName?:string

    tabID:number
    vttSupported:boolean
};

type State = {
    BEM:BEM
};

class Popup extends React.Component<Props, State> {
    constructor(props:any){
        super(props);

        this.state = {
            BEM: new BEM("popup"),
        };
    }

    render():React.ReactNode {
        const BEM = this.state.BEM;

        return <div className={BEM.getBlock()}>
            <div className={BEM.getElement("heading")}>
                <Heading appName={this.props.appName} vttName={this.props.vttName} />
            </div>

            <div className={BEM.getElement("config")}>
                <Configuration tabID={this.props.tabID} vttSupported={this.props.vttSupported} />
            </div>
        </div>;
    }
};

async function onReady() {
    const tabURL = await getTabURL();
    const tabID = await getTabID();

    const vttSupported = getVTTID(tabURL) !== undefined;

    ReactDOM.render(<Popup appName="VTT Observe" vttName={getVTTID(tabURL)} tabID={tabID}
        vttSupported={vttSupported} />,
        document.querySelector("body"));
}

async function getTabURL():Promise<string> {
    const tabs = await chrome.tabs.query({active: true, currentWindow: true});
    return tabs[0].url;
}

async function getTabID():Promise<number> {
    const tabs = await chrome.tabs.query({active: true, currentWindow: true});
    return tabs[0].id;
}

document.onreadystatechange = async function() {
    if (document.readyState === "complete") {
        onReady();
    }
}

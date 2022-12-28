import BEM from "./bem";
import React from "react";

import "./toggle.scss";

type Props = {
    enabled?:boolean
};

type State = {
    BEM:BEM
};

class Toggle extends React.Component<Props,State> {
    constructor(props:any) {
        super(props);

        this.state = {
            BEM: new BEM("toggle"),
        };
    }

    render():React.ReactNode {
        const enabled = (typeof this.props.enabled !== "undefined") ? this.props.enabled : false;
        const BEM = this.state.BEM;

        let sliderModifier = [];

        if (enabled) {
            sliderModifier.push("enabled");
        } else {
            sliderModifier.push("disabled");
        }

        return <div className={BEM.getBlock(sliderModifier)}>
            <div className={BEM.getElement("slider")}>
                {/* TODO(ghifari160): replace placeholder legend with styled indicator */}
                {/* {(enabled) ? "I" : "O"} */}
            </div>
        </div>
    }
}

export default Toggle;

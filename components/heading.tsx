import BEM from "./bem";
import React from "react";

type Props = {
    appName: string,
    vttName?: string,
};

class Heading extends React.Component<Props, {}> {
    render():React.ReactNode {
        const bem = new BEM("heading");

        const vttName = (typeof this.props.vttName !== "undefined") ? this.props.vttName
            : "unsupported";

        return <div className={bem.getBlock()}>
            <h1 className={bem.getElement("appName")}>{this.props.appName}</h1>
            <h3 className={bem.getElement("vttName")}>VTT: {vttName}</h3>
        </div>;
    }
};

export default Heading;

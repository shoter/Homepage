import React, { Component } from "react";
import { connect } from "http2";

export interface RibbonItemProps {
    name: string,
    iconUrl: string,
    onClick?: () => void;
};

export default class RibbonItem extends Component<RibbonItemProps>  {

    constructor(props: RibbonItemProps) {
        super(props);
    }

    render() {
        return (<div className="ribbon-item" onClick={this.props.onClick}>
            <img src={this.props.iconUrl} />
            <span>{this.props.name}</span>
        </div>)
    }

}

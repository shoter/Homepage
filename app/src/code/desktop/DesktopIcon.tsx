import React, { Component } from "react";

export interface DesktopIconProps {
    imgUrl : string,
    title : string,
    onClick? : () => void
};

export default class DesktopIcon extends Component<DesktopIconProps>
{
    constructor(props : DesktopIconProps) {
        super(props)
    }

    render() {
        return (
       <div className="icon" onClick={this.props.onClick}>
           <div className="iconImage">
            <img src={this.props.imgUrl}/>
           </div>
           <span>{this.props.title}</span>
       </div> 
        )
    }
}
import React, { Component } from "react"
import TaskBar from "./TaskBar";
import DesktopIcon from "./DesktopIcon";
import Icon from "../../resources/icancode.png";
import Window from "../Windows/Window";
import WindowManager from "../Windows/WindowManager";

export default class Desktop extends Component 
{
    render()
    {
        var icons = [];

        for(var i = 0; i < 15; ++ i)
        {
            icons.push(<DesktopIcon imgUrl={Icon} title="I can code"/>)
        }

        return ( <div className="desktop">
            <div className="work-area">
                <div className="icon-area">
                    {icons}
                </div>
                <WindowManager />
            </div>
            <TaskBar />
        </div>
        )
    }
}
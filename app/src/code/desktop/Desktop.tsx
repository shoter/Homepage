import React, { Component } from "react"
import DesktopIcon from "./DesktopIcon";
import Icon from "../../resources/icancode.png";
import Window from "../Windows/Window";
import WindowManager from "../Windows/WindowManager";
import { WindowCreateAction, WindowCreateActionMaker } from './../state/windows/windowsActions';
import { Dispatch } from "redux";
import { connect } from "react-redux";
import TaskBar from "./TaskBar";

interface DispatchProps {
    createWindow : (windowName: string, iconUrl: string, windowContent: () => JSX.Element | null) => WindowCreateAction
};

const mapDispatchToProps = (dispatch: Dispatch) : DispatchProps => ({
    createWindow: (windowName: string, iconUrl: string, windowContent: () => JSX.Element | null) => dispatch(WindowCreateActionMaker(windowName, iconUrl, windowContent)),
});

export type DesktopProps = DispatchProps;

class Desktop extends Component <DesktopProps>
{
    constructor(props: DesktopProps) {
        super(props);
    }

    

    onClick = () => {
        console.log("Creating window");
        this.props.createWindow("I Can Code - Damian Laczak's blog", Icon, () => (<div>
            My homepage is under construction. It will come to completion shortly. Deployed using Ci/CD with Jenkins.
        </div>));
    }

    render()
    {
        var icons = [];

        for(var i = 0; i < 15; ++ i)
        {
            icons.push(<DesktopIcon onClick={this.onClick} imgUrl={Icon} title="I can code"/>)
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

export default connect(null, mapDispatchToProps)(Desktop);
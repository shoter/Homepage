import React, { Component } from "react"
import DesktopIcon from "./DesktopIcon";
import Icon from "../../resources/icancode.png";
import Window from "../Windows/Window";
import WindowManager from "../Windows/WindowManager";
import { WindowCreateAction, WindowCreateActionMaker } from './../state/windows/windowsActions';
import { Dispatch } from "redux";
import { connect } from "react-redux";
import TaskBar from "./TaskBar";
import ReactMarkdown from "react-markdown";
const path = require( "../posts/test.txt");

interface DispatchProps {
    createWindow : (windowName: string, iconUrl: string, windowContent: () => JSX.Element | null) => WindowCreateAction
};

const mapDispatchToProps = (dispatch: Dispatch) : DispatchProps => ({
    createWindow: (windowName: string, iconUrl: string, windowContent: () => JSX.Element | null) => dispatch(WindowCreateActionMaker(windowName, iconUrl, windowContent)),
});

export type DesktopProps = DispatchProps; 

interface DesktopState 
{ 
    markdown: string
}

class Desktop extends Component <DesktopProps, DesktopState>
{
    constructor(props: DesktopProps) {
        super(props);

        this.state = {
            markdown: ""
        }
    }

    componentDidMount = () => {
        fetch(path).then(res => res.text()).then(text => this.setState({markdown: text}))
    }

    

    onClick = () => {
        console.log("Creating window");
        this.props.createWindow("I Can Code - Damian Laczak's blog", Icon, () => (<div>

            <ReactMarkdown source={this.state.markdown} />
            
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
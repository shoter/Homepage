import React, { Component } from "react"
import DesktopIcon from "./DesktopIcon";

import Window from "../Windows/Window";
import WindowManager from "../Windows/WindowManager";
import { WindowCreateAction, WindowCreateActionMaker } from './../state/windows/windowsActions';
import { Dispatch } from "redux";
import { connect } from "react-redux";
import TaskBar from "./TaskBar";
import ReactMarkdown from "react-markdown";
import CodeBlock from "../utility/codeBlock";
import WebBrowser from "../Windows/WebBrowser";
import Resources from "../../Resources";
import BlogPosts from "../Windows/BlogPosts";


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
        let bp = new BlogPosts();

   

        this.props.createWindow("Blog Posts", Resources.can, bp.renderContent);
    }

    openWebiste = (url: string) => {
        window.open(url, "_blank")
    }

    render()
    {
        var icons = [
            (<DesktopIcon key="posts" onClick={() => this.onClick()} title="Blog Posts" imgUrl={Resources.can} />),
            (<DesktopIcon key="github" onClick={() => this.openWebiste("https://github.com/shoter")} title="My github" imgUrl={Resources.githubIcon} />),
            (<DesktopIcon key="stack" onClick={() => this.openWebiste("https://stackoverflow.com/users/2583946/shoter")} title="My SO Profile" imgUrl={Resources.stackIcon} />)
            
        ];

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
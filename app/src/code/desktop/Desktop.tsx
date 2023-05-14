import React, { Component } from "react"
import DesktopIcon from "./DesktopIcon";

import Window from "../Windows/Window";
import WindowManager from "../Windows/WindowManager";
import { WindowCreateAction, WindowCreateActionMaker } from './../state/windows/windowsActions';
import { Dispatch } from "redux";
import { connect } from "react-redux";
import TaskBar from "./TaskBar";
import ReactMarkdown from "react-markdown";
import {CodeBlock} from "../utility/codeBlock"; 
import Resources from "../../Resources";
import BlogPosts from "../Windows/BlogPosts";
import ProjectsContent from "../projects/ProjectsContent";
import CV from "../Windows/Cv";


const path = require( "../posts/test.txt");


interface DispatchProps {
    createWindow : (windowName: string, iconUrl: string, windowContent: JSX.Element) => any
};

const mapDispatchToProps = (dispatch: Dispatch) : DispatchProps => ({
    createWindow: (windowName: string, iconUrl: string, windowContent) => dispatch(WindowCreateActionMaker(windowName, iconUrl, windowContent)),
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
        this.props.createWindow("Blog Posts", Resources.can, <BlogPosts />);
    }

    openWebiste = (url: string) => {
        window.open(url, "_blank")
    }

    openProjects = () => {
        this.props.createWindow("Projects", Resources.project, <ProjectsContent />);
    }

    openCv = () =>{
        this.props.createWindow("Resume", Resources.cv, <CV />);
    }

    render()
    {
        var icons = [
            (<DesktopIcon key="posts" onClick={() => this.onClick()} title="Blog Posts" imgUrl={Resources.can} />),
            (<DesktopIcon key="github" onClick={() => this.openWebiste("https://github.com/shoter")} title="My github" imgUrl={Resources.githubIcon} />),
            (<DesktopIcon key="stack" onClick={() => this.openWebiste("https://stackoverflow.com/users/2583946/shoter")} title="My SO Profile" imgUrl={Resources.stackIcon} />),
            (<DesktopIcon key="projects" onClick={() => this.openProjects()} title="My projects" imgUrl={Resources.project} />),
            (<DesktopIcon key="cv" onClick={() => this.openCv()} title="Resume" imgUrl={Resources.cv} />)
            
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
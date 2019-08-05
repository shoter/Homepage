import React, {Component} from "react";
import { WindowCreateActionMaker } from "../../code/state/windows/windowsActions";
import { Dispatch } from "redux";
import DesktopIcon from "../../code/desktop/DesktopIcon";
import Resources from "../../Resources";
import BlogPosts from "../../code/Windows/BlogPosts";
import ProjectsContent from "../../code/projects/ProjectsContent";
import { connect } from "react-redux";
import MobileBlogPosts from "../posts/MobileBlogPosts";
import MobileProjects from "../projects/MobileProjects";

interface DispatchProps {
    createWindow : (windowName: string, iconUrl: string, windowContent: JSX.Element) => any
};

const mapDispatchToProps = (dispatch: Dispatch) : DispatchProps => ({
    createWindow: (windowName: string, iconUrl: string, windowContent) => dispatch(WindowCreateActionMaker(windowName, iconUrl, windowContent)),
});

export type MobileDesktopProps = DispatchProps;


export class MobileDesktop extends Component<MobileDesktopProps> {
    constructor(props : MobileDesktopProps)
    {
        super(props);
    }

    onClick = () => {
        this.props.createWindow("Blog Posts", Resources.can, <MobileBlogPosts />);
    }

    openWebiste = (url: string) => {
        window.open(url, "_blank")
    }

    openProjects = () => {
        this.props.createWindow("Projects", Resources.project, <MobileProjects />);
    }


    render(){
        var icons = [
            (<DesktopIcon key="posts" onClick={() => this.onClick()} title="Blog Posts" imgUrl={Resources.can} />),
            (<DesktopIcon key="github" onClick={() => this.openWebiste("https://github.com/shoter")} title="My github" imgUrl={Resources.githubIcon} />),
            (<DesktopIcon key="stack" onClick={() => this.openWebiste("https://stackoverflow.com/users/2583946/shoter")} title="My SO Profile" imgUrl={Resources.stackIcon} />),
            (<DesktopIcon key="projects" onClick={() => this.openProjects()} title="My projects" imgUrl={Resources.project} />)
            
        ];

        return (<div className="mobile-desktop">
            <div className="icon-area">
            {icons}
            </div>
        </div>)
    }
}

export default connect(null, mapDispatchToProps)(MobileDesktop);
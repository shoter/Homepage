import React, {Component} from "react";
import { WindowCreateActionExtraData, WindowCreateActionMaker } from "../../code/state/windows/windowsActions";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { findProject } from "../../code/projects/Projects";
import { MobileProject } from "./MobileProject";

interface Props {
    id : string,
    iconUrl: string,
    name: string,
    startDate? : string,
    endDate? : string
}

interface DispatchProps {
    createWindow : (name: string, icon: string, content: JSX.Element, data: WindowCreateActionExtraData) => any;
};

const mapDispatchToProps = (d: Dispatch) : DispatchProps => ({
    createWindow: (name, icon, content, data) => d(WindowCreateActionMaker(name, icon, content, data))
})

export type MobileProjectEntryProps = Props & DispatchProps;

class MobileProjectEntry extends Component<MobileProjectEntryProps> {
    constructor(props : MobileProjectEntryProps)
    {
        super(props);
    }

    createWindow = () => {
        var project = findProject(this.props.id);
        fetch(project.path).then(res => res.text()).then(text => {

            this.props.createWindow(this.props.name, this.props.iconUrl, <MobileProject project={project} markdown={text} />, { 
                isMaximalized: true,
                //routerElementId : BlogRouter.addElement(new BlogElement(post))
            });

        })
    }

    render() {
        const {startDate, endDate} = this.props;
        let date = "";
        if(startDate && endDate)
        {
            date = `${startDate} - ${endDate}`
        }
        else if(startDate)
        {
            date = `${startDate}`
        }
        else if(endDate)
        {
            date = `${endDate}`
        }

        return (<div className="mobile-project-entry" onClick={this.createWindow}>
            <div className="image">
                <img src={this.props.iconUrl} />
            </div>
            <div className="description">
                <div className="title">{this.props.name}</div>
                <div className="sub">{date}</div>
            </div>
        </div>)
    }
}

export default connect(null, mapDispatchToProps)(MobileProjectEntry);
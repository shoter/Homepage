import React, {Component} from "react";
import { Dispatch } from "redux";
import { ChangeProjectActionMaker } from "../state/projects/projectsAction";
import { connect } from "react-redux";

interface Props {
    id: string,
    name : string,
    iconUrl: string
}

interface DispatchProps {
    setProject : (id : string) => any;
}

const mapDispatchToProps = (d: Dispatch) : DispatchProps => ({
    setProject: (id) => d(ChangeProjectActionMaker(id)),
})

export type ProjectListEntryProps = Props & DispatchProps;


class ProjectListEntry extends Component<ProjectListEntryProps> {

    onClick = (id: string) => {
        this.props.setProject(id);
    }

    render() {
        const {id, name, iconUrl} = this.props;
        return (<div className="project-short" onClick={() => this.onClick(id)}>
        <img src={iconUrl} />
        <span>
        {name}
        </span>
    </div>)
    }
}

export default connect(null, mapDispatchToProps)(ProjectListEntry);
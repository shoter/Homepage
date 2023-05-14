import React, {Component} from "react";
import { Project, ProjectCategory } from "./Projects";
import ProjectListEntry from "./ProjectListEntry";

interface Props {
    category : ProjectCategory,
    projects : Project[]
}

export type ProjectListCategoryEntryProps = Props;

export default class ProjectListCategoryEntry extends Component<ProjectListCategoryEntryProps> {
    render() {

        let projects = this.props.projects.map(p => (<ProjectListEntry id={p.id} name={p.title} iconUrl={p.iconUrl} /> ))

        return (<div className="project-category-short" >
            <div className="project-category-short-title">
                <img src={this.props.category.iconUrl} />
                <span>
                {this.props.category.name}
                </span>
            </div>
            {projects}
    </div>);

    }
}
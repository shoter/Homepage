import ContentRenderer from "../Windows/ContentRenderer";
import { Project, Projects, findProject } from "./Projects";
import { ProjectListProps, ProjectListItemProps, ProjectList } from "./ProjectList";
import React from "react";
import { ProjectComponent } from "./ProjectsComponent";

export default class ProjectsRenderer extends ContentRenderer {
    constructor() {
        super();
    }
    
    renderContent(): JSX.Element | null {

        return (<ProjectComponent />)

    }

}
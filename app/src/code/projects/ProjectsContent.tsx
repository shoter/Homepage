import { Project, Projects, findProject } from "./Projects";
import { ProjectListProps, ProjectListItemProps, ProjectList } from "./ProjectList";
import React, {Component} from "react";
import ReactMarkdown from "react-markdown";
import CodeBlock from "../utility/codeBlock";

export interface ProjectsContentState {
    markdown? : string,
    project? : Project
}

export class ProjectsContent extends Component<{}, ProjectsContentState>
{
    constructor(props : {})
    {
        super(props);

        this.state = {};
    }

    onProjectClick= (id : string) => {

        let project = findProject(id);

        fetch(project.path).then(res => res.text()).then(text => {
            this.setState({
                markdown : text,
                project : project
            })
        });
    }

    render() {
        let prop : ProjectListProps = {
            items : Projects.map<ProjectListItemProps>(p => ({
                iconUrl : p.iconUrl,
                title: p.title,
                id: p.id
            })),
            onClick : this.onProjectClick
        }

        let projectRender : JSX.Element | undefined;
        let images : JSX.Element[] | undefined;

        if(this.state.project && this.state.markdown)
        {
            projectRender = (
        <ReactMarkdown source={this.state.markdown}
            renderers={{
                code: CodeBlock
            }} />
            )

            images = this.state.project.photosPaths.map(p => (<div className="photo"><img src={p}/></div>));
        }

        return (<div className="projects">
            <ProjectList {...prop} />
            <div className="project-renderer">
                {projectRender}
                <div className="photos">
                    {images}
                </div>
            </div>
        </div>
        );
    }
}
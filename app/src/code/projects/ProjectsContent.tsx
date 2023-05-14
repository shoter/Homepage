import { Project, Projects, findProject } from "./Projects";
import { ProjectListProps, ProjectListItemProps, ProjectList } from "./ProjectList";
import React, {Component} from "react";
import ReactMarkdown from "react-markdown";
import {CodeBlock} from "../utility/codeBlock";
import { ApplicationState } from "../state/store";
import { ChangeProjectActionMaker } from "../state/projects/projectsAction";
import { Dispatch } from "redux";
import { connect } from "react-redux";

export interface ProjectContentStateProps {
    project? : Project,
    markdown? : string
};

export interface ProjectContentDispatchProps {
    changeProjectId: (projectId: string) => any
}

type ProjectContentProps = ProjectContentStateProps & ProjectContentDispatchProps;

const mapStateToProps = (state: ApplicationState) : ProjectContentStateProps => 
{
    let project : Project | undefined;
    if(state.project.currentProjectId)
        project = findProject(state.project.currentProjectId);
    return {
        project : project,
        markdown: state.project.markdown
    }
}

const mapDispatchToProps = (dispatch: Dispatch) : ProjectContentDispatchProps => ({
    changeProjectId : (projectId: string) => dispatch(ChangeProjectActionMaker(projectId))
})



class ProjectsContent extends Component<ProjectContentProps>
{
    constructor(props : ProjectContentProps)
    {
        super(props);
    }

    onProjectClick= (id : string) => {
        this.props.changeProjectId(id);
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
        let repo : JSX.Element | undefined;

        if(this.props.project && this.props.markdown)
        {
            projectRender = (
        <ReactMarkdown children={this.props.markdown} components={CodeBlock}/>
            )

            images = this.props.project.photosPaths.map(p => (<div className="photo"><img src={p}/></div>));
            repo = (<div className="repo">
                <a href="#" onClick={() => window.open(this.props.project!.repository, "_blank")}>
                    Repository
                </a>
                
                </div>);
        }

        return (<div className="projects">
            <ProjectList {...prop} />
            <div className="project-renderer">
                {repo}
                {projectRender}
                <div className="photos">
                    {images}
                </div>
            </div>
        </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsContent);
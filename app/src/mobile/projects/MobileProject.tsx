import React, {Component} from "react";
import {CodeBlock} from "../../code/utility/codeBlock";
import ReactMarkdown from "react-markdown";
import { Project } from "../../code/projects/Projects";

export interface MobileProjectProps {
    project : Project,
    markdown: string
}


export class MobileProject extends Component<MobileProjectProps> {

    constructor(props : MobileProjectProps)
    {
        super(props);
    }

    render = () : JSX.Element => {
        const {project, markdown} = this.props;

        let url = `${window.location.origin + window.location.pathname}?${project.id}`;

        let source = `\`\`\`${url}\`\`\`\n\n
        ${markdown}`

        let images : JSX.Element[] | undefined;
        let repo : JSX.Element | undefined;

        images = project.photosPaths.map(p => (<div className="photo"><img src={p}/></div>));
        repo = (<div className="repo">
            <a href="#" onClick={() => window.open(project.repository, "_blank")}>
                Repository
            </a>
                
                </div>)

        return (<div className="mobile-project">
            {repo}
            <ReactMarkdown children={markdown} components={CodeBlock}/>
            {images}
            </div>);

    }

}
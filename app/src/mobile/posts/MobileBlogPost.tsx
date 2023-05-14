import React, {Component} from "react";
import { Post } from "../../code/posts/Posts";
import {CodeBlock} from "../../code/utility/codeBlock";
import ReactMarkdown from "react-markdown";

export interface MobileBlogPostProps {
    post : Post,
    markdown: string
}


export class MobileBlogPost extends Component<MobileBlogPostProps> {

    constructor(props : MobileBlogPostProps)
    {
        super(props);
    }

    render = () : JSX.Element => {
        const {post, markdown} = this.props;

        let url = `${window.location.origin + window.location.pathname}?${post.shortTitle}`;

        let source = `\`\`\`${url}\`\`\`\n\n
        ${markdown}`

        return (<div className="mobile-blog-post">
            <ReactMarkdown children={markdown} components={CodeBlock}/>
            </div>);

    }

}
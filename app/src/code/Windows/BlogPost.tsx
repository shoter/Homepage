import React from "react";
import { Post } from "../posts/Posts";
import ReactMarkdown from "react-markdown";
import CodeBlock from "../utility/codeBlock";

export interface BlogPostProps {
    post : Post,
    markdown: string
};

export default class BlogPost extends React.Component<BlogPostProps> {

    constructor(props : BlogPostProps) {
        super(props);
    }

    render = () : JSX.Element => {
        const {post, markdown} = this.props;

        let url = `${window.location.origin + window.location.pathname}?${post.shortTitle}`;

        let source = `\`\`\`${url}\`\`\`\n\n
        ${markdown}`


        return (<div className="blog-post">
            <ReactMarkdown source={markdown} 
            renderers={{
                code: CodeBlock
            }} />
            </div>);

    }
}
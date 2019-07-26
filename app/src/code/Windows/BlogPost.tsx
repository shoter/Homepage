import React from "react";
import ContentRenderer from "./ContentRenderer";
import { Post } from "../posts/Posts";
import ReactMarkdown from "react-markdown";
import CodeBlock from "../utility/codeBlock";

export default class BlogPost extends ContentRenderer {

    post : Post;
    markdown: string;
    constructor(post : Post, markdown: string) {
        super();

        this.post = post;
        this.markdown = markdown;
    }

    renderContent = () : JSX.Element => {
        let url = `${window.location.origin + window.location.pathname}?${this.post.shortTitle}`;

        let source = `\`\`\`${url}\`\`\`\n\n
        ${this.markdown}`

        return (<div className="blog-post">
            <ReactMarkdown source={this.markdown}
            renderers={{
                code: CodeBlock
            }} />
            </div>);

    }
}
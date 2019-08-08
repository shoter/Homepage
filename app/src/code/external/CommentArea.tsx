import React, {Component} from "react";
import { DiscussionEmbed, CommentCount, CommentEmbed } from 'disqus-react';

export interface CommentAreaProps {
    url: string,
    title: string,
    id: string
}

export function CommentArea(props : CommentAreaProps) {
        const disqusConfig = {
            url: props.url,
            identifier: props.id,
            title: props.title,
        };

        return (<div className="comment-area">
            <DiscussionEmbed shortname={"damian-laczak-net-pl"} config={disqusConfig} />
        </div>);
}


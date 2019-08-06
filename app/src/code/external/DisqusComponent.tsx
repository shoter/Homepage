import React, {Component} from "react";
import { DiscussionEmbed, CommentCount, CommentEmbed } from 'disqus-react';

export function DisqusComponent(title: string, id: string, url:string) {
    const disqusconfig = {
        url: url,
        identifier: id,
        title: title,
    };

    return (<div className="disqus">
        <DiscussionEmbed shortname={title} config={disqusconfig} />
    </div>)
}
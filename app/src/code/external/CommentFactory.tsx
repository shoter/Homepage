import React from "react";
import { Post, instanceOfPost } from "../posts/Posts";
import { UrlCreator } from "../common/urlCreator";
import { CommentArea } from "./CommentArea";
import { DisqusEntity } from "./DisqusEntity";

export class CommentFactory {

    create(disqusEntity : DisqusEntity) : JSX.Element {
        if(instanceOfPost(disqusEntity))
        {
            const post = disqusEntity as Post;
            let url =  UrlCreator.createUrl(post.shortTitle);

            return CommentArea({id: post.shortTitle, title: post.postTitle, url: url});
        }

       return <div></div> 
    }
}
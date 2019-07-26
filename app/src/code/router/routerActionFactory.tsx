import React from "react";
import { ParsedUrlQuery } from "querystring";
import { BlogElement } from "./blogElement";
import { findPost } from "../posts/Posts";
import BaseAction from "../state/baseAction";
import { WindowCreateActionMaker } from "../state/windows/windowsActions";
import BlogPost from "../Windows/BlogPost";
import { BlogRouter } from "./router";

export class RouterActionFactory {
    private _query : ParsedUrlQuery;
    constructor(query: ParsedUrlQuery)
    {
        this._query = query;
    }

    public create(id : number) : Promise<BaseAction> {
        let type = this._query[`type${id}`];

        if(type === BlogElement.type)
        {
            let title = this._query[`i${id}`] as string;
            let post = findPost(title);
            return fetch(post.path).then(res => res.text()).then(text => {


            return WindowCreateActionMaker(post.title, post.iconUrl, <BlogPost post={post} markdown={text} />, {
                routerElementId: BlogRouter.addElement(new BlogElement(post)),
                isMaximalized: true
            });
            });
        }

        throw "error";
    }

    public exists(id : number) : boolean {
        let type = this._query[`type${id}`];

        if(type)
            return true;
        return false;
    }
}
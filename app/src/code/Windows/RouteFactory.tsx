import React, {Component} from "react";
import { RouterActionFactory } from "../router/routerActionFactory";
import { WindowCreateActionMaker } from "../state/windows/windowsActions";
import { BlogRouter } from "../router/router";
import BlogPost from "./BlogPost";
import { Store } from "redux";
import Posts from "../posts/Posts";
import { parse } from "querystring";
import { BlogElement } from "../router/blogElement";

export class RouteFactory
{
    private _searchQuery : string;
    private _store : Store;
    constructor(searchQuery : string, store: Store)
    {
        this._searchQuery = searchQuery;
        this._store = store;
    }

    createWindowsFromQuery()
    {
        let search = this._searchQuery;
        
        if(search.length > 1 && search.includes("="))
        {
            let fac = new RouterActionFactory(parse(search.substr(1))); 
            for(let i = 0; ; ++i)
            {
                if(fac.exists(i))
                {
                    fac.create(i)
                    .then(a => {
                        this._store.dispatch(a);
                    })
                }
                else
                break;
            }
        } else 
        {
            search = search.substr(1);

            for(let post of Posts)
            {
                if(search == post.shortTitle)
                {
                    fetch(post.path).then(res => res.text()).then(text => {
                        this._store.dispatch(WindowCreateActionMaker(post.postTitle, post.iconUrl, <BlogPost post={post} markdown={text} />, {
                            routerElementId: BlogRouter.addElement(new BlogElement(post)),
                            isMaximalized: true,
                            disqusEntity: post
                        }));
                        });
                }
            }
        }
    }
}
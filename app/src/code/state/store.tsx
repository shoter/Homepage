import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import desktopReducer, { DesktopState } from "./desktop/desktopReducer";
import windowsReducer, { WindowsState } from "./windows/windowsReducer";
import { WindowsLogic } from "./windows/windowsMiddleware";
import appReducer, { AppState } from "./app/appReducer";
import { FullscrenChangeActionMaker } from "./app/appActions";
import { composeWithDevTools } from 'redux-devtools-extension';
import { BlogRouter } from "../router/router";
import { RouterActionFactory } from "../router/routerActionFactory";
import {parse} from "querystring"
import { produce } from "immer";
import Posts from "../posts/Posts";
import { WindowCreateActionMaker } from "./windows/windowsActions";
import BlogPost from "../Windows/BlogPost";
import { BlogElement } from "../router/blogElement";
import React from "react";
import thunk from 'redux-thunk';
import projectsReducer, { ProjectState } from "./projects/projectsReducer";

export interface ApplicationState {
    desktop: DesktopState,
    project: ProjectState,
    windows : WindowsState,
    app: AppState
};

const applicationReducer = combineReducers<ApplicationState>({
    desktop: desktopReducer,
    windows: windowsReducer,
    app: appReducer,
    project: projectsReducer
});

//const enhancer = (window as any)['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ '] ? (window as any)['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ']()(compose) : compose;

const store = createStore(applicationReducer, composeWithDevTools(applyMiddleware(
    WindowsLogic,
    thunk
)));

document.onfullscreenchange = (e: Event) => {
    store.dispatch(FullscrenChangeActionMaker(document.fullscreenElement === e.target)); 
}

let search = window.location.search;
window.history.replaceState({}, "I can code", window.location.origin + window.location.pathname);

if(search.length > 1 && search.includes("="))
{
    let fac = new RouterActionFactory(parse(search.substr(1))); 
    for(let i = 0; ; ++i)
    {
        if(fac.exists(i))
        {
            fac.create(i)
            .then(a => {
                store.dispatch(a);
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
                store.dispatch(WindowCreateActionMaker(post.title, post.iconUrl, <BlogPost post={post} markdown={text} />, {
                    routerElementId: BlogRouter.addElement(new BlogElement(post)),
                    isMaximalized: true
                }));
                });
        }
    }
}


export default store;

(window as any).store = store;
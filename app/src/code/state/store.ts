import { createStore, combineReducers } from "redux";
import desktopReducer, { DesktopState } from "./desktop/desktopReducer";
import BaseAction from "./baseAction";

export interface ApplicationState {
    desktop: DesktopState
};

const applicationReducer = combineReducers<ApplicationState>({
    desktop: desktopReducer
});

const store = createStore(applicationReducer);
export default store;

(<any>window).store = store;
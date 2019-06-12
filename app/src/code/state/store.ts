import { createStore, combineReducers, applyMiddleware } from "redux";
import desktopReducer, { DesktopState } from "./desktop/desktopReducer";
import BaseAction from "./baseAction";
import windowsReducer, { WindowsState } from "./windows/windowsReducer";
import { WindowCreateAction, WindowCreateActionMaker } from "./windows/windowsActions";
import Icon from "../../resources/icancode.png";
import { WindowsLogic } from "./windows/windowsMiddleware";

export interface ApplicationState {
    desktop: DesktopState,
    windows : WindowsState
};

const applicationReducer = combineReducers<ApplicationState>({
    desktop: desktopReducer,
    windows: windowsReducer
});

const store = createStore(applicationReducer, applyMiddleware(
    WindowsLogic
));


export default store;

(<any>window).store = store;
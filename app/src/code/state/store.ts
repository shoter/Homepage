import { createStore, combineReducers, applyMiddleware } from "redux";
import desktopReducer, { DesktopState } from "./desktop/desktopReducer";
import BaseAction from "./baseAction";
import windowsReducer, { WindowsState } from "./windows/windowsReducer";
import { WindowCreateAction, WindowCreateActionMaker } from "./windows/windowsActions";
import Icon from "../../resources/icancode.png";
import { WindowsLogic } from "./windows/windowsMiddleware";
import appReducer, { AppState } from "./app/appReducer";
import { FullscrenChangeActionMaker } from "./app/appActions";

export interface ApplicationState {
    desktop: DesktopState,
    windows : WindowsState,
    app: AppState
};

const applicationReducer = combineReducers<ApplicationState>({
    desktop: desktopReducer,
    windows: windowsReducer,
    app: appReducer
});

const enhancer = (<any>window)['devToolsExtension'] ? (<any>window)['devToolsExtension']()(createStore) : createStore;

const store = enhancer(applicationReducer, applyMiddleware(
    WindowsLogic
));

document.onfullscreenchange = (e: Event) => {
    store.dispatch(FullscrenChangeActionMaker(document.fullscreenElement === e.target)); 
}


export default store;

(<any>window).store = store;
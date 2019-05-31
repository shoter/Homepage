import { createStore, combineReducers } from "redux";
import desktopReducer, { DesktopState } from "./desktop/desktopReducer";
import BaseAction from "./baseAction";
import windowsReducer, { WindowsState } from "./windows/windowsReducer";
import { WindowCreateAction, WindowCreateActionMaker } from "./windows/windowsActions";
import Icon from "../../resources/icancode.png";

export interface ApplicationState {
    desktop: DesktopState,
    windows : WindowsState
};

const applicationReducer = combineReducers<ApplicationState>({
    desktop: desktopReducer,
    windows: windowsReducer
});

const store = createStore(applicationReducer);

store.dispatch(WindowCreateActionMaker("Window created dynamically", Icon, () => null));
store.dispatch(WindowCreateActionMaker("I like pineapples", Icon, () => null));


export default store;

(<any>window).store = store;
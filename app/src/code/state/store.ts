import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import desktopReducer, { DesktopState } from "./desktop/desktopReducer";
import windowsReducer, { WindowsState } from "./windows/windowsReducer";
import { WindowsLogic } from "./windows/windowsMiddleware";
import appReducer, { AppState } from "./app/appReducer";
import { FullscrenChangeActionMaker } from "./app/appActions";
import { composeWithDevTools } from 'redux-devtools-extension';

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

//const enhancer = (window as any)['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ '] ? (window as any)['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ']()(compose) : compose;

const store = createStore(applicationReducer, composeWithDevTools(applyMiddleware(
    WindowsLogic
)));

document.onfullscreenchange = (e: Event) => {
    store.dispatch(FullscrenChangeActionMaker(document.fullscreenElement === e.target)); 
}


export default store;

(window as any).store = store;
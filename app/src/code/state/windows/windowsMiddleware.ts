import { Middleware, MiddlewareAPI, Dispatch } from "redux";
import BaseAction from './../baseAction';
import { ApplicationState } from './../store';
import { WindowPutOnFrontActionMaker, WindowPutOnFrontAction, WindowUpdateAllActionMaker } from './windowsActions';
import { WindowState } from "./windowState";


export const WindowsLogic: Middleware =
    (api: MiddlewareAPI<Dispatch, ApplicationState>) =>
        (next: Dispatch) =>
            (action: BaseAction): BaseAction => {

                if (action.type === WindowPutOnFrontActionMaker.name) {
                    let a = action as WindowPutOnFrontAction;

                    var windows = api.getState().windows.windows;

                    var window = windows.find(w => w.id === a.windowId) as WindowState;

                    var newWindows = [];

                    for (let w of windows) {
                        if (window.id !== w.id)
                            newWindows.push(w);
                    }

                    newWindows.push(window);
                    return WindowUpdateAllActionMaker(newWindows);
                }
                else
                {
                    return next(action);
                }
            }
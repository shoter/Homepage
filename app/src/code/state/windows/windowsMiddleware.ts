import { Middleware, MiddlewareAPI, Dispatch } from "redux";
import BaseAction from './../baseAction';
import { ApplicationState } from './../store';
import { WindowPutOnFrontActionMaker, WindowPutOnFrontAction, WindowUpdateAllActionMaker, WindowCloseActionMaker, WindowCloseAction } from './windowsActions';
import { WindowState } from "./windowState";


export const WindowsLogic: Middleware =
    (api: MiddlewareAPI<Dispatch, ApplicationState>) =>
        (next: Dispatch) =>
            (action: BaseAction): BaseAction => {

                if (action.type === WindowPutOnFrontActionMaker.name) {
                    let a = action as WindowPutOnFrontAction;

                    let windows = api.getState().windows.windows;

                    let window = windows.find(w => w.id === a.windowId);

                    if(window)
                    {
                        let newWindows = [];

                        for (let w of windows) {
                            if (window.id !== w.id)
                                newWindows.push(w);
                        }
                        newWindows.push(window);
                        return next(WindowUpdateAllActionMaker(newWindows));
                    }
                }
                else if(action.type === WindowCloseActionMaker.name) {
                    let a = action as WindowCloseAction;
                    let newWindows : WindowState[] = api.getState().windows.windows.filter(w => w.id != a.windowId);

                    return next(WindowUpdateAllActionMaker(newWindows));
                }

                return next(action);
            }
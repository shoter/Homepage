import { Middleware, MiddlewareAPI, Dispatch } from "redux";
import BaseAction from './../baseAction';
import { ApplicationState } from './../store';
import { WindowPutOnFrontActionMaker, WindowPutOnFrontAction, WindowUpdateAllActionMaker, WindowCloseActionMaker, WindowCloseAction, ParticularWindowAction, WindowAction } from './windowsActions';
import { WindowState } from "./windowState";
import produce from "immer";

export const WindowsLogic: Middleware =
    (api: MiddlewareAPI<Dispatch, ApplicationState>) =>
        (next: Dispatch) =>
            (action: BaseAction): BaseAction => {

                if(action.hasOwnProperty("windowId"))
                {
                    let a = action as ParticularWindowAction;

                    let index = api.getState().windows.windows.findIndex(w => w.id === a.windowId);

                    // Window can be closed and maybe some action can be executed later referencing it
                    if(index === -1)
                        return {} as WindowAction;
                }

                if (action.type === WindowPutOnFrontActionMaker.name) {
                    let a = action as WindowPutOnFrontAction;

                    let windows = api.getState().windows.windows;

                    let window = windows.find(w => w.id === a.windowId);

                    if(window)
                    {
                        let newWindows = [];

                        for (let w of windows) {
                            if (window.id !== w.id)
                            {
                                newWindows.push(produce(w, draft => {
                                    draft.active = false;
                                }));
                            }
                        }

                        newWindows.push(produce(window, draft => {
                            draft.active = true;
                        }));
                        
                        return next(WindowUpdateAllActionMaker(newWindows));
                    }
                }



                return next(action);
            }
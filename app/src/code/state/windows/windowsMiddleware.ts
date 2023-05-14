import { Middleware, MiddlewareAPI, Dispatch } from "redux";
import BaseAction from './../baseAction';
import { ApplicationState } from './../store';
import { WindowPutOnFrontActionMaker, WindowPutOnFrontAction, WindowUpdateAllActionMaker, ParticularWindowAction, WindowAction, WindowCreateActionMaker, WindowCreateAction, WindowCloseTopAction, WindowCloseTopActionMaker, WindowCloseActionMaker} from './windowsActions';
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
                            draft.isMinimalized = false;
                        }));
                        
                        return next(WindowUpdateAllActionMaker(newWindows));
                    }
                }
                else if(action.type === WindowCloseTopActionMaker.name) 
                {
                    let a = action as WindowCloseTopAction;

                    let windows = api.getState().windows.windows;

                    if(windows.length > 0)
                    {
                       return next(WindowCloseActionMaker(windows[windows.length -1 ].id)); 
                    }

                    
                }

                return next(action);
            }
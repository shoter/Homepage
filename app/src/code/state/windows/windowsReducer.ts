import { WindowVisibility } from "./WindowVisibility";
import { WindowAction, WindowCloseActionMaker, WindowUpdateAllAction, WindowUpdateAllActionMaker, WindowCreateAction, WindowUpdatePositionAction, WindowChangeVisibilityAction, WindowCreateActionMaker, WindowUpdatePositionActionMaker, WindowChangeVisibilityActionMaker, WindowUpdateSizeActionMaker, WindowUpdateSizeAction, WindowCloseAction } from "./windowsActions";
import { WindowState } from "./windowState";
import { ApplicationState } from "../store";
import { withStatement } from "@babel/types";
import produce from "immer";

interface WindowsStateMutable  {
    windows: WindowState[]
    lastWindowId: number,
    maximalizedId? : number
}

export type WindowsState = Readonly<WindowsStateMutable>;

const initialState: WindowsState = {
    windows: [],
    lastWindowId: 0
};

function findById(state: WindowsState, id: number): WindowState {
    // This should never be undefined. But there is always a chance that it can go wrong. meh
    return state.windows.find((window: WindowState) => window.id === id) as WindowState;
}

function findIdById(state: WindowsState, windowId: number) : number{
    for(let i = 0;i < state.windows.length; ++i)
    {
        if(state.windows[i].id === windowId)
        return i;
    }

    throw "No number";
}

function updateWindow(window: WindowState, state : WindowsState) : WindowsState {
    let newState : WindowsState = {
        lastWindowId : state.lastWindowId,
        maximalizedId: state.maximalizedId,
        windows: state.windows,
    };

    for(let i = 0; i < newState.windows.length; ++i) {
        if(newState.windows[i].id === window.id) {
            newState.windows[i] = window
        }
    }

    return newState;
}

export default function windowsReducer(state: WindowsState = initialState, action: WindowAction): WindowsState {
    switch (action.type) {
        case WindowCreateActionMaker.name:
            {
                let createAction = action as WindowCreateAction;

                var window: WindowState = {
                title: createAction.title,
                    iconUrl: createAction.iconUrl,
                    visibility: WindowVisibility.Normal,
                    render: createAction.render,
                    id: state.lastWindowId + 1,
                    active: true
                }

                return produce(state, draft => {
                    draft.lastWindowId = state.lastWindowId + 1;
                    for(let w of draft.windows)
                    {
                        w.active = false;
                    }
                    draft.windows.push(window);
                });
            }
        case WindowUpdatePositionActionMaker.name:
            {
                let updateAction = action as WindowUpdatePositionAction;
                return produce(state, draft => {
                    draft.windows[draft.windows.findIndex(w => w.id === updateAction.windowId)].x = updateAction.x;
                    draft.windows[draft.windows.findIndex(w => w.id === updateAction.windowId)].y = updateAction.y;
                });
            }

            case WindowUpdateSizeActionMaker.name: 
            {
                let a = action as WindowUpdateSizeAction;
                return produce(state, draft => {
                    draft.windows[draft.windows.findIndex(w => w.id === a.windowId)].width = a.width;
                    draft.windows[draft.windows.findIndex(w => w.id === a.windowId)].height = a.height;
                })
            }
        case WindowChangeVisibilityActionMaker.name:
            {
                let changeAction = action as WindowChangeVisibilityAction;

                return produce(state, draft => {
                    draft.windows[draft.windows.findIndex(w => w.id === changeAction.windowId)].visibility = changeAction.newVisibility
                })
            }
        case WindowUpdateAllActionMaker.name:
            {
                let updateAction = action as WindowUpdateAllAction;

                return produce(state, draft =>{
                    draft.windows = updateAction.windows
                });
            }
        case WindowCloseActionMaker.name:
            {
                let a = action as WindowCloseAction;

                return produce(state, draft => {
                    draft.windows.splice(draft.windows.findIndex(w => w.id === a.windowId), 1);
                })
            }
    }
    return state;
}
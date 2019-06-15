import { WindowVisibility } from "./WindowVisibility";
import { WindowAction, WindowUpdateAllAction, WindowUpdateAllActionMaker, WindowCreateAction, WindowUpdatePositionAction, WindowChangeVisibilityAction, WindowCreateActionMaker, WindowUpdatePositionActionMaker, WindowChangeVisibilityActionMaker } from "./windowsActions";
import { WindowState } from "./windowState";

export interface WindowsState {
    windows: WindowState[]
    lastWindowId: number,
    maximalizedId? : number
}

const initialState: WindowsState = {
    windows: [],
    lastWindowId: 0,
    maximalizedId: undefined
};

function findById(state: WindowsState, id: number): WindowState {
    // This should never be undefined. But there is always a chance that it can go wrong. meh
    return state.windows.find((window: WindowState) => window.id === id) as WindowState;
}

export default function windowsReducer(state: WindowsState = initialState, action: WindowAction): WindowsState {
    switch (action.type) {
        case WindowCreateActionMaker.name:
            {
                let createAction = action as WindowCreateAction;

                var window: WindowState = {
                title: createAction.title,
                    iconUrl: createAction.iconUrl,
                    x: 0,
                    y: 0,
                    width: 1,
                    height: 1,
                    visibility: WindowVisibility.Normal,
                    render: createAction.render,
                    id: state.lastWindowId++,
                    active: true
                }

                let newState : WindowsState = {
                    windows: state.windows.concat(window),
                    lastWindowId: state.lastWindowId
                };

                for(let w of newState.windows) {
                    if(w.id !== window.id) {
                        w.active = false;
                    }
                }

                return newState;
            }
        case WindowUpdatePositionActionMaker.name:
            {
                let updateAction = action as WindowUpdatePositionAction;
                var window = findById(state, updateAction.windowId);

                window = {
                    x: updateAction.x,
                    y: updateAction.y,
                    width: updateAction.width,
                    height: updateAction.height,
                    ...window
                }

                let newState = {
                    ...state
                };

                for(let i = 0;i < newState.windows.length; ++i)
                {
                    let w = newState.windows[i];

                    if(w.id === updateAction.windowId)
                        newState.windows[i] = window
                };

                return newState;
            }
        case WindowChangeVisibilityActionMaker.name:
            {
                let changeAction = action as WindowChangeVisibilityAction;

                var window = findById(state, changeAction.windowId);
                window.visibility = changeAction.newVisibility;

                return state;
            }
        case WindowUpdateAllActionMaker.name:
            {
                let updateAction = action as WindowUpdateAllAction;

                let newState : WindowsState = {
                    windows: updateAction.windows,
                    lastWindowId: state.lastWindowId
                }

                return newState;
            }
    }
    return state;
}
import { WindowVisibility } from "./WindowVisibility";
import { WindowAction, WindowCreateAction, WindowUpdatePositionAction, WindowChangeVisibilityAction, WindowCreateActionMaker, WindowUpdatePositionActionMaker, WindowChangeVisibilityActionMaker } from "./windowsActions";
import { WindowState } from "./windowState";

export interface WindowsState {
    windows: WindowState[]
    lastWindowId: number
}

const initialState: WindowsState = {
    windows: [],
    lastWindowId: 0
};

function findById(state: WindowsState, id: number): WindowState {
    // This should never be undefined. But there is always a chance that it can go wrong. meh
    return state.windows.find((window: WindowState) => window.id === id) as WindowState;
}

export default function windowsReducer(state: WindowsState = initialState, action: WindowAction): WindowsState {
    switch (action.type) {
        case WindowCreateActionMaker.name:
            {
                var createAction = action as WindowCreateAction;

                var window: WindowState = {
                    title: createAction.title,
                    iconUrl: createAction.iconUrl,
                    x: 0,
                    y: 0,
                    width: 1,
                    height: 1,
                    visibility: WindowVisibility.Maximalized,
                    render: createAction.render,
                    id: state.lastWindowId++,
                }

                state.windows.push(window);

                return state;
            }
        case WindowUpdatePositionActionMaker.name:
            {
                var updateAction = action as WindowUpdatePositionAction;
                var window = findById(state, updateAction.windowId);

                window = {
                    x: updateAction.x,
                    y: updateAction.y,
                    width: updateAction.width,
                    height: updateAction.height,
                    ...window
                }

                return state;
            }
        case WindowChangeVisibilityActionMaker.name:
            {
                var changeAction = action as WindowChangeVisibilityAction;

                var window = findById(state, changeAction.windowId);
                window.visibility = changeAction.newVisibility;

                return state;
            }
    }
    return state;
}
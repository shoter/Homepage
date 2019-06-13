import { AppAction, FullscrenChangeActionMaker, FullscrenChangeAction } from "./appActions";

export interface AppState {
    isFullscreen: boolean
};

const initialState : AppState = {
    isFullscreen : false
}

export default function appReducer(state : AppState = initialState, action: AppAction) : AppState {
    switch(action.type) {
        case FullscrenChangeActionMaker.name: {
            let a = action as FullscrenChangeAction;

            return {
                isFullscreen: a.isFullscreen
            };
        }
    }

    return state;
}
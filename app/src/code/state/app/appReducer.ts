import { AppAction, FullscreenChangeActionMaker, FullscreenChangeAction, MobileChangeActionMaker, MobileChangeAction, ShutdownActionMaker } from "./appActions";
import produce from "immer";

export interface AppState {
    isFullscreen: boolean,
    isMobile: boolean,
    isShutdown: boolean
};

const initialState : AppState = {
    isFullscreen : false,
    isMobile : false,
    isShutdown: false
}

export default function appReducer(state : AppState = initialState, action: AppAction) : AppState {
    switch(action.type) {
        case FullscreenChangeActionMaker.name: {
            let a = action as FullscreenChangeAction;

            return produce(state, draft => {
                draft.isFullscreen = a.isFullscreen
            })

        }

        case MobileChangeActionMaker.name: {
            let a = action as MobileChangeAction;

            return produce(state, draft =>{
                draft.isMobile = a.isMobile
            })
        }

        case ShutdownActionMaker.name: {
            return produce(state, draft => {
                draft.isShutdown = true
            });
        }
    }

    return state;
}
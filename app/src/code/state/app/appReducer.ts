import { AppAction, FullscrenChangeActionMaker, FullscrenChangeAction, MobileChangeActionMaker, MobileChangeAction } from "./appActions";
import produce from "immer";

export interface AppState {
    isFullscreen: boolean,
    isMobile: boolean
};

const initialState : AppState = {
    isFullscreen : false,
    isMobile : false
}

export default function appReducer(state : AppState = initialState, action: AppAction) : AppState {
    switch(action.type) {
        case FullscrenChangeActionMaker.name: {
            let a = action as FullscrenChangeAction;

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
    }

    return state;
}
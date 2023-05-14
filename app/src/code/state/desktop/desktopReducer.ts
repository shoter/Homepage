import DesktopAction, {} from "./desktopActions";

export interface DesktopState {
}

const initialState : DesktopState = {
};


export default function desktopReducer(state : DesktopState = initialState, action : DesktopAction) : DesktopState {
    return state;
}
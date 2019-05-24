import DesktopAction, {DesktopTimeAction} from "./desktopActions";

export interface DesktopState {
    time: Date
}

const initialState : DesktopState = {
    time: new Date()
};


export default function desktopReducer(state : DesktopState = initialState, action : DesktopAction) : DesktopState {
    if(action.type === DesktopTimeAction.name)
    {
        var timeAction = action as DesktopTimeAction;
        state.time = timeAction.newTime;
    }
    return state;
}
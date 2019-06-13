import BaseAction from "../baseAction";

export interface AppAction extends BaseAction {};


export interface FullscrenChangeAction extends AppAction {
    isFullscreen : boolean
};

export function FullscrenChangeActionMaker(isFullscreen: boolean)  : FullscrenChangeAction {
    return {
        isFullscreen: isFullscreen,
        type: FullscrenChangeActionMaker.name
    }
};
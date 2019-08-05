import BaseAction from "../baseAction";

export interface AppAction extends BaseAction {};


export interface FullscrenChangeAction extends AppAction {
    isFullscreen : boolean
};

export interface MobileChangeAction extends AppAction {
    isMobile: boolean
}

export interface ShutdownAction extends AppAction {

}

export function FullscrenChangeActionMaker(isFullscreen: boolean)  : FullscrenChangeAction {
    return {
        isFullscreen: isFullscreen,
        type: FullscrenChangeActionMaker.name
    }
};

export function MobileChangeActionMaker(isMobile: boolean) : MobileChangeAction {
    return {
        type: MobileChangeActionMaker.name,
        isMobile : isMobile
    }
}

export function ShutdownActionMaker() : ShutdownAction {
    return {
        type: ShutdownActionMaker.name
    };
}
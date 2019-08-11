import BaseAction from "../baseAction";

export interface AppAction extends BaseAction {};


export interface FullscreenChangeAction extends AppAction {
    isFullscreen : boolean
};

export interface MobileChangeAction extends AppAction {
    isMobile: boolean
}

export interface ShutdownAction extends AppAction {

}

export function FullscreenChangeActionMaker(isFullscreen: boolean)  : FullscreenChangeAction {
    return {
        isFullscreen: isFullscreen,
        type: FullscreenChangeActionMaker.name
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
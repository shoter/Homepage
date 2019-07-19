import BaseAction from './../baseAction';
import { WindowVisibility } from './WindowVisibility';
import { WindowChangeVisibilityAction, WindowAction } from './windowsActions';
import { WindowState } from './windowState';

export interface WindowAction extends BaseAction {
};

export interface ParticularWindowAction extends WindowAction {
    windowId: number
}

export interface WindowCreateAction extends WindowAction {
    title: string,
    iconUrl: string,
    render: () => JSX.Element | null;
};

export interface WindowUpdatePositionAction extends ParticularWindowAction {
    x: number,
    y: number
};

export interface WindowUpdateSizeAction extends ParticularWindowAction {
    width : number,
    height: number
}

export interface WindowChangeVisibilityAction extends ParticularWindowAction {
    newVisibility: WindowVisibility
};

export interface WindowUpdateAllAction extends WindowAction {
    windows: WindowState[]
};

export interface WindowPutOnFrontAction extends ParticularWindowAction {};

export interface WindowCloseAction extends ParticularWindowAction {};

export function WindowCreateActionMaker(title: string, iconUrl: string, render: () => JSX.Element | null): WindowCreateAction {
    return {
        type: WindowCreateActionMaker.name,
        title: title,
        iconUrl: iconUrl,
        render: render
    }
}

export function WindowUpdatePositionActionMaker(windowId:number, x: number, y:number): WindowUpdatePositionAction {
    return {
        windowId: windowId,
        type: WindowUpdatePositionActionMaker.name,
        x: x,
        y: y,
    };
}

export function WindowUpdateSizeActionMaker(windowId : number, width: number, height: number) : WindowUpdateSizeAction  {
    return {
        type: WindowUpdateSizeActionMaker.name,
        windowId : windowId,
        width: width,
        height: height
    };
}

export function WindowChangeVisibilityActionMaker(windowId: number, visibility: WindowVisibility) : WindowChangeVisibilityAction {
    return {
        windowId: windowId,
        type: WindowChangeVisibilityActionMaker.name,
        newVisibility: visibility
    };
}

export function WindowPutOnFrontActionMaker(windowId: number) : WindowPutOnFrontAction {
    return {
        windowId: windowId,
        type: WindowPutOnFrontActionMaker.name
    };
}

export function WindowUpdateAllActionMaker(windows: WindowState[]) : WindowUpdateAllAction {
    return {
        type: WindowUpdateAllActionMaker.name,
        windows: windows
    };
}

export function WindowCloseActionMaker(windowId: number) : WindowCloseAction {
    return {
        type: WindowCloseActionMaker.name,
        windowId: windowId
    };
}
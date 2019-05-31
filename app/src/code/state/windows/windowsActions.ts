import BaseAction from './../baseAction';
import { WindowVisibility } from './WindowVisibility';
import { WindowChangeVisibilityAction } from './windowsActions';

export interface WindowAction extends BaseAction {
    windowId: number;
};

export interface WindowCreateAction extends WindowAction {
    title: string,
    iconUrl: string,
    render: () => JSX.Element | null;
};

export interface WindowUpdatePositionAction extends WindowAction {
    x: number,
    y: number,
    width: number,
    height: number
};

export interface WindowChangeVisibilityAction extends WindowAction {
    newVisibility: WindowVisibility
};

export function WindowCreateActionMaker(title: string, iconUrl: string, render: () => JSX.Element | null): WindowCreateAction {
    return {
        windowId: -1,
        type: WindowCreateActionMaker.name,
        title: title,
        iconUrl: iconUrl,
        render: render
    }
}

export function WindowUpdatePositionActionMaker(windowId:number, x: number, y:number, width: number, height: number): WindowUpdatePositionAction {
    return {
        windowId: windowId,
        type: WindowUpdatePositionActionMaker.name,
        x: x,
        y: y,
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
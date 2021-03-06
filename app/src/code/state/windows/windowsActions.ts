import BaseAction from './../baseAction';
import { WindowState } from './windowState';
import { RouterElement } from '../../router/routerElement';
import { Post } from '../../posts/Posts';
import { Project } from '../../projects/Projects';
import { DisqusEntity } from '../../external/DisqusEntity';

export interface WindowAction extends BaseAction {
};

export interface ParticularWindowAction extends WindowAction {
    windowId: number
}

export interface WindowCreateActionExtraData {
    isMaximalized? : boolean,
    routerElementId? : number,
    disqusEntity?: DisqusEntity,
}

export interface WindowCreateAction extends WindowAction {
    title: string,
    iconUrl: string,
    content: JSX.Element,
    data? : WindowCreateActionExtraData
};


export interface WindowUpdatePositionAction extends ParticularWindowAction {
    x: number,
    y: number
};

export interface WindowUpdateSizeAction extends ParticularWindowAction {
    width : number,
    height: number
}

export interface WindowUpdateAllAction extends WindowAction {
    windows: WindowState[]
};

export interface WindowPutOnFrontAction extends ParticularWindowAction {};

export interface WindowCloseAction extends ParticularWindowAction {};

export interface WindowMinimalizeAction extends ParticularWindowAction {};

export interface WindowToggleMaximalizeAction extends ParticularWindowAction {};

export interface WindowCloseTopAction extends WindowAction {};

export function WindowCreateActionMaker(title: string, iconUrl: string, content: JSX.Element, data? : WindowCreateActionExtraData): WindowCreateAction {
    return {
        type: WindowCreateActionMaker.name,
        title: title,
        iconUrl: iconUrl,
        content: content,
        data: data
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

export function WindowMinimalizeActionMaker(windowId: number) : WindowMinimalizeAction {
    return {
        type: WindowMinimalizeActionMaker.name,
        windowId: windowId
    };
}

export function WindowToggleMaximalizeActionMaker(windowId: number) : WindowToggleMaximalizeAction {
    return {
        type: WindowToggleMaximalizeActionMaker.name,
        windowId: windowId
    };
}

export function WindowCloseTopActionMaker() : WindowCloseTopAction {
    return {
        type: WindowCloseTopActionMaker.name,
    }
}
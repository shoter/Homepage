import React, { Component } from "react";
import { ApplicationState } from './../state/store';
import Icon from "../../resources/icancode.png";
import Window from "./Window";
import { connect } from 'react-redux';
import { WindowState } from "../state/windows/windowState";
import { WindowPutOnFrontActionMaker, WindowPutOnFrontAction, WindowCloseAction, WindowCloseActionMaker } from './../state/windows/windowsActions';
import { Dispatch } from 'redux';

export interface WindowManagerStateProps {
    windows : WindowState[]
}

export interface WindowManagerDispatchProps {
    putWindowOnFront: (windowId: number) => WindowPutOnFrontAction,
    closeWindow: (windowId: number) => WindowCloseAction,
}

type WindowManagerProps = WindowManagerStateProps & WindowManagerDispatchProps;

const mapStateToProps = (state : ApplicationState) : WindowManagerStateProps => ({
    windows: state.windows.windows
})


const mapDispatchToProps = (dispatch : Dispatch) : WindowManagerDispatchProps => ({
    putWindowOnFront: (windowId: number) => dispatch(WindowPutOnFrontActionMaker(windowId)),
    closeWindow: (windowId) => dispatch(WindowCloseActionMaker(windowId))
});

class WindowManager extends Component<WindowManagerProps> {
    constructor(props: WindowManagerProps) {
        super(props);

        console.log("Construcor!");
    }

    onWindowClick = (windowId: number) => {
        this.props.putWindowOnFront(windowId);
    }

    onWindowClose = (windowId: number) => {
        this.props.closeWindow(windowId);
    }

    render() {
        

        var windows = this.props.windows.map(w => (<Window key={w.id} title={w.title} iconUrl={w.iconUrl} 
            content={w.render}
            onClick={() =>this.onWindowClick(w.id)}
            onClose={() => this.onWindowClose(w.id)}

            />)
            );

        return (<div className="windows-area">
            {windows}
        </div>)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WindowManager);
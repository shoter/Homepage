import React, { Component } from "react";
import { ApplicationState } from './../state/store';
import Icon from "../../resources/icancode.png";
import Window from "./Window";
import { connect } from 'react-redux';
import { WindowState } from "../state/windows/windowState";
import { WindowPutOnFrontActionMaker, WindowPutOnFrontAction } from './../state/windows/windowsActions';
import { Dispatch } from 'redux';

export interface WindowManagerStateProps {
    windows : WindowState[]
}

export interface WindowManagerDispatchProps {
    putWindowOnFront: (windowId: number) => WindowPutOnFrontAction
}

type WindowManagerProps = WindowManagerStateProps & WindowManagerDispatchProps;

const mapStateToProps = (state : ApplicationState) : WindowManagerStateProps => ({
    windows: state.windows.windows
})


const mapDispatchToProps = (dispatch : Dispatch) : WindowManagerDispatchProps => ({
    putWindowOnFront: (windowId: number) => dispatch(WindowPutOnFrontActionMaker(windowId))
});

class WindowManager extends Component<WindowManagerProps> {
    constructor(props: WindowManagerProps) {
        super(props);
    }

    onWindowClick = (windowId: number) => {
        this.props.putWindowOnFront(windowId);
    }

    onWindowClose = (windowId: number) => {

    }



//    onWindowClose = (windowId : number) => {
//        var newWindows : WindowState[] = [];
//        for(let w of this.state.windows) {
//            if(windowId !== w.id)
//             newWindows.push(w);
//        }

//        this.setState(() => {
//         console.log(newWindows);
        
//         return   {
//            windows: newWindows
//            }
//        });
//    }

    render() {
        

        var windows = this.props.windows.map(w => (<Window key={w.id} title={w.title} iconUrl={w.iconUrl} 
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
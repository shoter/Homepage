import React, { Component } from "react";
import { ApplicationState } from './../state/store';
import Icon from "../../resources/icancode.png";
import Window from "./Window";
import { connect } from 'react-redux';
import { WindowState } from "../state/windows/windowState";
import { WindowPutOnFrontActionMaker, WindowPutOnFrontAction, WindowCloseAction, WindowCloseActionMaker, WindowUpdatePositionActionMaker } from './../state/windows/windowsActions';
import { Dispatch } from 'redux';

export interface WindowManagerStateProps {
    windows : WindowState[]
}


export interface WindowManagerDispatchProps {
    putWindowOnFront: (windowId: number) => WindowPutOnFrontAction,
    closeWindow: (windowId: number) => WindowCloseAction,
    updatePosition: (windowId : number, x : number, y : number, width: number, height: number) => any;
}

type WindowManagerProps = WindowManagerStateProps & WindowManagerDispatchProps;

const mapStateToProps = (state : ApplicationState) : WindowManagerStateProps => ({
    windows: state.windows.windows
})


const mapDispatchToProps = (dispatch : Dispatch) : WindowManagerDispatchProps => ({
    putWindowOnFront: (windowId: number) => dispatch(WindowPutOnFrontActionMaker(windowId)),
    closeWindow: (windowId) => dispatch(WindowCloseActionMaker(windowId)),
    updatePosition: (windowId: number, x,y,width,height) => dispatch(WindowUpdatePositionActionMaker(windowId, x, y, width, height)),
});

class WindowManager extends Component<WindowManagerProps> {
    selfRef?: HTMLDivElement;

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

    setRef = (ref: HTMLDivElement) => {
        this.selfRef = ref;
    }

    setInNorms(x : number) : number {
        if(x < 0)
        return 0;
        if(x > 1)
        return 1;
        return x;
    }

    onPositionChanged = (windowId: number, x : number, y: number, width: number, height: number) => {
        if(this.selfRef)
        {
            let maxW = this.selfRef.clientWidth;
            let maxH = this.selfRef.clientHeight;

            x /= maxW;
            y /= maxH;
            width /= maxW;
            height /= maxH;

            x = this.setInNorms(x);
            y = this.setInNorms(y);
            width = this.setInNorms(width);
            height = this.setInNorms(height);

            console.log("x = " + x + ", y = " + y + ", w = " + width + ", height = " + height);

            if(x + width <= 1 && y + height <= 1)
            {
                this.props.updatePosition(windowId, x, y, width, height);
            }
        }
        
    }

    render() {

       let maxW : number | undefined;
       let maxH : number | undefined;
        
        if(this.selfRef)
        {
            maxW = this.selfRef.clientWidth;
            maxH = this.selfRef.clientHeight;
        }
    
        

        var windows = this.props.windows.map(w =>{ 

            let x : number | undefined;
            let y : number | undefined;
            let width : number | undefined;
            let height : number | undefined;

            if(maxW && maxH) {
                x = w.x * maxW;
                y = w.y * maxH;
                width = w.width * maxW;
                height = w.height * maxH;
            }
            
            return (<Window key={w.id} title={w.title} iconUrl={w.iconUrl} 
            id={w.id}
            active={w.active}
            content={w.render}
            onClick={() =>this.onWindowClick(w.id)}
            onClose={() => this.onWindowClose(w.id)}
            x={x}
            y={y}
            width={width}
            height={height}
            onPositionChanged={(x: number, y:number, width: number, height: number) => this.onPositionChanged(w.id, x, y, width, height)}

            />)}
            );

        return (<div ref={this.setRef} className="windows-area">
            {windows}
        </div>)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WindowManager);
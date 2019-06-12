import React, { Component } from "react";
import { WindowState } from "../state/windows/windowsReducer";
import { ApplicationState } from './../state/store';
import Icon from "../../resources/icancode.png";
import Window from "./Window";
import { connect } from 'react-redux';

export interface WindowManagerProps {
    windows : WindowState[]
}

export interface WindowManagerState {
    windows : WindowState[]
}

const mapStateToProps = (state : ApplicationState) : WindowManagerProps => ({
    windows: state.windows.windows
})

class WindowManager extends Component<WindowManagerProps, WindowManagerState> {
    constructor(props: WindowManagerProps) {
        super(props);

        console.log("Konstruktor!");

        this.state = {
            windows: props.windows
        }
    }

    findWindowById = (windowId : number ) : WindowState => this.state.windows.find(w => w.id === windowId) as WindowState;

    onWindowClick = (windowId : number) => {
        var window = this.findWindowById(windowId);

        var newWindows = [];

        for(let w of this.state.windows)
        {
            if(window.id !== w.id)
            newWindows.push(w);
        }

        newWindows.push(window);

        this.setState({
            windows: newWindows
        });
   }

   onWindowClose = (windowId : number) => {
       var newWindows : WindowState[] = [];
       for(let w of this.state.windows) {
           if(windowId !== w.id)
            newWindows.push(w);
       }

       this.setState(() => {
        console.log(newWindows);
        
        return   {
           windows: newWindows
           }
       });
   }

    render() {
        

        var windows = this.state.windows.map(w => (<Window key={w.id} title={w.title} iconUrl={w.iconUrl} 
            onClick={() =>this.onWindowClick(w.id)}
            onClose={() => this.onWindowClose(w.id)}

            />)
            );

        return (<div className="windows-area">
            {windows}
        </div>)
    }
}

export default connect(mapStateToProps)(WindowManager);
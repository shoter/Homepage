import React, { Component } from "react";
import { DesktopState } from "../state/desktop/desktopReducer";
import { connect, DispatchProp } from "react-redux";
import Resources from "../../Resources";
import { ApplicationState } from "../state/store";
import Timer from "./Timer";
import { WindowPutOnFrontActionMaker, WindowPutOnFrontAction } from "../state/windows/windowsActions";
import { Dispatch } from "redux";

interface OpenedProgram {
  id: number;
  iconUrl: string;
  active: boolean;
  name: string;
}

interface StateProps {
  programs: OpenedProgram[];
}

interface DispatchProps {
  putOnTop: (windowId: number) => WindowPutOnFrontAction;
}

const mapStateToProps = (state: ApplicationState): StateProps => ({
  programs: state.windows.windows.map(w => ({ 
    id: w.id,
    active: w.active,
    iconUrl: w.iconUrl,
    name: w.title
  }))
}); 

const mapDispatchToProps = (dispatch: Dispatch) : DispatchProps => ({
  putOnTop: (windowId: number) => dispatch(WindowPutOnFrontActionMaker(windowId))
})
 
export type TaskBarProps = StateProps & DispatchProps;

class TaskBar extends Component<TaskBarProps> {
  constructor(props: TaskBarProps) {
    super(props);
  }

  transformTitle = (title : string, amountOfWindows: number) : string => {
    if(title.length > 40 - amountOfWindows * 3) {
      var length = Math.max(1, 40 - amountOfWindows * 3);
      //return title.slice(0, length);
    }

    return title;
  }

  onClick = (id: number) => this.props.putOnTop(id);

  render() {
    var openedCount = this.props.programs.length;
    var opened = this.props.programs.sort((a,b) => a.id - b.id).map(p => (
      <div key={p.id}
       className={"opened-program " + (p.active ? "active" : "")}
       onClick={() => this.onClick(p.id)}
       >
        <div className="icon-container">
          <img src={p.iconUrl} />
        </div>
        <div className="title">{this.transformTitle(p.name, openedCount)} </div>
      </div>
    ));



    return (
      <div className="taskbar">
        <div className="start"> 
          <img src={Resources.startButton} alt="Start logo" />
          Start
        </div>

        <div className="programs">{opened}</div>
        <Timer />
      </div>
    );
  }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(TaskBar);

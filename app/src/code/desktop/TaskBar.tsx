import React, { Component } from "react";
import { DesktopState } from "../state/desktop/desktopReducer";
import { connect } from "react-redux";
import  Resources  from "../../Resources";
import { ApplicationState } from "../state/store";
import Timer from "./Timer";



export default class TaskBar extends Component {

  render() {
    return (
      <div className="taskbar">
        <div className="start">
          <img src={Resources.startButton} alt="Start logo"/>
          Start
        </div>

        <div className="programs" />
        <Timer />

      </div>
    );
  }
}

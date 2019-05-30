import React, { Component } from "react";
import { Rnd } from "react-rnd";
export interface WindowProps {
  title: string;
  iconUrl: string;
}

export default class Window extends Component<WindowProps> {
  constructor(props: WindowProps) {
    super(props);
  }

  render() {
    return (
      <Rnd
        default={{
          x: 0,
          y: 0,
          height: 640,
          width: 800
        }}
        bounds="parent"
        dragHandleClassName="title-bar"
      >
        <div className="gl-window">
          <div className="title-bar">
            <div className="icon-container">
              <img src={this.props.iconUrl} className="title-icon" />
            </div>
            <span className="title">{this.props.title}</span>
            <div className="buttons">
              <div className="title-button">
                <svg viewBox="0 0 100 100" className="minimalize">
                  <line x1="30" y1="80" x2="70" y2="80" />
                </svg>
              </div>
              <div className="title-button">
                <svg viewBox="0 0 100 100" className="maximalize">
                  <rect className="box" width="80" height="80" x="10" y="10" />
                  <rect x="10" width="80" y="10" height="10" />
                </svg>
              </div>
              <div className="title-button">
                <svg viewBox="0 0 100 100">
                  <line x1="20" x2="80" y1="80" y2="20" />
                  <line x1="20" x2="80" y1="20" y2="80" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </Rnd>
    );
  }
}

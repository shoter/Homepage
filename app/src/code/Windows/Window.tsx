import React, { Component } from "react";
import { Rnd } from "react-rnd";
export interface WindowProps {
  id: number;
  title: string;
  iconUrl: string;
  active: boolean;
  content: () => JSX.Element | null,
  onMinimalize? : () => void,
  onMaximalize?: () => void,
  onClose?: () => void,
  onClick?: () => void,
}

export default class Window extends Component<WindowProps> {
  constructor(props: WindowProps) {
    super(props);
  } 

  render() {
    let content : JSX.Element | null = null;
    if(this.props.content)
    {
      content = this.props.content();
    }
    var n = (this.props.id * 5) % 200;
    return (
      <Rnd
        default={{
          x: n,
          y: n, 
          height: 640,
          width: 800
        }}
        minWidth={400}
        minHeight={300}
        bounds="parent"
        dragHandleClassName="title-bar"
        onDragStart={this.props.onClick}
        onResizeStart={this.props.onClick}
      >
        <div className="gl-window" onClick={this.props.onClick}>
          <div className={"title-bar " + (this.props.active ? "active":"")}>
            <div className="icon-container">
              <img src={this.props.iconUrl} className="title-icon" />
            </div>
            <span className="title">{this.props.title}</span>
            <div className="buttons">
              <div className="title-button" onClick={this.props.onMinimalize}>
                <svg viewBox="0 0 100 100" className="minimalize">
                  <line x1="30" y1="80" x2="70" y2="80" />
                </svg>
              </div>
              <div className="title-button" onClick={this.props.onMaximalize}>
                <svg viewBox="0 0 100 100" className="maximalize">
                  <rect className="box" width="70" height="70" x="15" y="15" />
                  <rect x="15" width="70" y="15" height="10" />
                </svg>
              </div>
              <div className="title-button" onClick={this.props.onClose}>
                <svg viewBox="0 0 100 100">
                  <line x1="20" x2="80" y1="80" y2="20" />
                  <line x1="20" x2="80" y1="20" y2="80" />
                </svg>
              </div>
            </div>
          </div>
          <div className="content">
            {content}
          </div>
        </div>
      </Rnd>
    );
  }
}

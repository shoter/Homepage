import React, { Component } from "react";
import { Rnd, DraggableData, ResizableDelta } from "react-rnd";
import { Size, ResizeDirection } from "re-resizable";
export interface WindowProps {
  id: number;
  title: string;
  iconUrl: string;
  active: boolean;
  isMaximalized: boolean;
  content: () => JSX.Element | null;
  onMinimalize?: () => void;
  onMaximalize?: () => void;
  onClose?: () => void;
  onClick?: () => void;

  x?: number;
  y?: number;
  width?: number;
  height?: number;

  onPositionChanged?: (x: number, y: number) => void;

  onSizeChanged?: (width: number, height: number) => void;
}

interface Position {
  x: number;
  y: number;
}

type DraggableMouseEvent =
  | React.MouseEvent<HTMLElement | SVGElement>
  | React.TouchEvent<HTMLElement | SVGElement>
  | MouseEvent
  | TouchEvent;

export default class Window extends Component<WindowProps> {
  constructor(props: WindowProps) {
    super(props);
  }

  onResizeStop = (
    e: MouseEvent | TouchEvent,
    dir: ResizeDirection,
    ref: HTMLDivElement,
    delta: ResizableDelta,
    pos: Position
  ) => {
    if (this.props.onPositionChanged) {
      this.props.onPositionChanged(pos.x, pos.y);
    }
    if (this.props.onSizeChanged) {
      this.props.onSizeChanged(ref.clientWidth, ref.clientHeight);
    }
  };

  onDragStop = (e: DraggableMouseEvent, data: DraggableData) => {
    if (this.props.onPositionChanged)
      this.props.onPositionChanged(data.x, data.y);
  };

  onClickHandler = (e: React.MouseEvent<HTMLDivElement>, exec?: () => void) => {
    if (exec) {
      exec();
      e.stopPropagation();
    }
  };

  createToggleMaximalize = () => {
    const maximalizeIcon = (
      <svg viewBox="0 0 100 100" className="maximalize">
        <rect className="box" width="70" height="70" x="15" y="15" />
        <rect x="15" width="70" y="15" height="10" />
      </svg>
    );

    const normalizeIcon = (
      <svg viewBox="0 0 100 100" className="maximalize">
        <rect className="box" width="50" height="50" x="35" y="15" />
        <rect x="35" width="50" y="15" height="5" />

        <rect
          className="box"
          width="50"
          height="50"
          x="15"
          y="35"
          style={{ ["fill" as any]: "#d6d3ce" }}
        />
        <rect x="15" width="50" y="35" height="5" />
      </svg>
    );

    const icon = this.props.isMaximalized ? normalizeIcon : maximalizeIcon;

    return (
      <div
        className="title-button"
        onClick={e => this.onClickHandler(e, this.props.onMaximalize)}
      >
        {icon}
      </div>
    );
  };

  createMinimalizeButton = () => {
    return (
      <div
        className="title-button"
        onClick={e => this.onClickHandler(e, this.props.onMinimalize)}
      >
        <svg viewBox="0 0 100 100" className="minimalize">
          <line x1="30" y1="80" x2="70" y2="80" />
        </svg>
      </div>
    );
  };

  createCloseButton = () => {
    return (
      <div
        className="title-button"
        onClick={e => this.onClickHandler(e, this.props.onClose)}
      >
        <svg viewBox="0 0 100 100">
          <line x1="20" x2="80" y1="80" y2="20" />
          <line x1="20" x2="80" y1="20" y2="80" />
        </svg>
      </div>
    );
  };

  createTitleBar = () => {
    const { onClose, onMinimalize, onMaximalize, isMaximalized } = this.props;
    return (
      <div className={"title-bar " + (this.props.active ? "active" : "")}>
        <div className="icon-container">
          <img src={this.props.iconUrl} className="title-icon" />
        </div>
        <span className="title">{this.props.title}</span>
        <div className="buttons">
          {this.createMinimalizeButton()}
          {this.createToggleMaximalize()}
          {this.createCloseButton()}
        </div>
      </div>
    );
  };

  render() {
    let content: JSX.Element | null = null;
    if (this.props.content) {
      content = this.props.content();
    }

    let position: Position | undefined;
    let size: Size | undefined;

    if (this.props.x && this.props.y) {
      position = {
        x: this.props.x,
        y: this.props.y
      };
    }

    if(this.props.width && this.props.height)
    {
      size = {
        height: this.props.height,
        width: this.props.width
      };
    }

    var n = (this.props.id * 5) % 200;

    if(this.props.isMaximalized)
    {
      return (<div className="gl-window maximalized" onClick={this.props.onClick}>
      {this.createTitleBar()}
      <div className="content">{content}</div>
    </div>);
    }
    else
    {

    return (
      <Rnd
        default={{
          x: n,
          y: n,
          height: 640,
          width: 800
        }}
        position={position}
        size={size}
        minWidth={400}
        minHeight={300}
        bounds="parent"
        dragHandleClassName="title-bar"
        onDragStart={this.props.onClick}
        onResizeStart={this.props.onClick}
        onDragStop={this.onDragStop}
        onResizeStop={this.onResizeStop}
      >
        <div className="gl-window" onClick={this.props.onClick}>
          {this.createTitleBar()}
          <div className="content">{content}</div>
        </div>
      </Rnd>
    );
      }
  }
}

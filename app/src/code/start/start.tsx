import React, { Component } from "react";
import Resources from "../../Resources";
import RibbonItem from "./RibbonItem";
import ResizeItem from "./ResizeItem";

export interface StartState {
  active: boolean;
}

export default class Start extends Component<{}, StartState> {
  selfRef?: HTMLDivElement;

  constructor(props: {}) {
    super(props);

    this.state = {
      active: false
    };
  }

  onStartClick = () => {
    this.setState(prev => ({
      active: !prev.active
    }));
  };

  openWebiste = (url: string) => {
    window.open(url, "_blank");
  };

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside = (event: MouseEvent) => {
    if (this.selfRef && event.target instanceof Element && !this.selfRef.contains(event.target)) {
      this.setState({
        active: false
      });
    }
  };
  setWrapperRef = (node: HTMLDivElement) => {
    this.selfRef = node;
  };

  render() {
    var ribbon: JSX.Element | null = null;
    var buttonClass = "";

    if (this.state.active) {
      ribbon = (
        <div className="start-ribbon">
          <div className="ribbon-os">
            <span>I</span>
            <img src={Resources.can} />
            <span>Code</span>
          </div>

          <div className="items">
            <RibbonItem iconUrl={Resources.shutdownIcon} name="Shutdown" />
            <RibbonItem
              iconUrl={Resources.stackIcon}
              name="My SO"
              onClick={() =>
                this.openWebiste(
                  "https://stackoverflow.com/users/2583946/shoter"
                )
              }
            />
            <RibbonItem
              iconUrl={Resources.githubIcon}
              name="My Github"
              onClick={() => this.openWebiste("https://github.com/shoter")}
            />
            <ResizeItem />
          </div>
        </div>
      );

      buttonClass += " active";
    }

    return (
      <div className="start-helper" ref={this.setWrapperRef}>
        {ribbon}
        <div
          className={"start-button" + buttonClass}
          onClick={this.onStartClick}
        >
          <img src={Resources.startButton} alt="Start logo" />
          Start
        </div>
      </div>
    );
  }
}

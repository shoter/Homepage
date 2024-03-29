import React, { Component } from "react";
import Resources from "../../Resources";
import RibbonItem from "./RibbonItem";
import ResizeItem from "./ResizeItem";
import { any } from "prop-types";
import { Dispatch } from "redux";
import { ShutdownActionMaker } from "../state/app/appActions";
import { connect } from "react-redux";
import { ApplicationState } from "../state/store";

interface StateProps {
  isFullscreen : boolean
}

interface DispatchProps {
  shutdown : () => any;
}

const mapDispatchToProps = (d:  Dispatch) : DispatchProps => ({
shutdown: () => d(ShutdownActionMaker())
});

const mapStateToProps = (state : ApplicationState) : StateProps => ({
  isFullscreen : state.app.isFullscreen
});

export type StartProps = DispatchProps & StateProps;

export interface StartState {
  active: boolean;
}

class Start extends Component<StartProps, StartState> {
  selfRef?: HTMLDivElement;

  constructor(props: StartProps) {
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

  shutdown = () => {
    this.props.shutdown(); 
    if(this.props.isFullscreen)
      document.exitFullscreen();
  }

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
            <RibbonItem onClick={this.shutdown} iconUrl={Resources.shutdownIcon} name="Shutdown" />
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

export default connect(mapStateToProps, mapDispatchToProps)(Start); 
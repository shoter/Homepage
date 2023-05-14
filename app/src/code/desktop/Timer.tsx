import React, { Component } from "react";

interface TimerState {
  time: Date;
  intervalTimeout?: NodeJS.Timeout;
}

export default class Timer extends Component<{}, TimerState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      time: new Date()
    };
  }

  setNewTime = () => {
    this.setState({
      time: new Date()
    });
  };

  componentDidMount() {
    const intervalTimeout = setInterval(this.setNewTime, 1000);
    this.setState({ intervalTimeout: intervalTimeout });
  }

  componentWillDisMount() {
    if (this.state.intervalTimeout) clearInterval(this.state.intervalTimeout);
  }

  formatTimePart = (number: number) => {
    return ("0" + number).slice(-2);
  };

  render() {
    const { time } = this.state;
    const f = this.formatTimePart;
    return (
      <div className="gl-timer">
        {f(time.getHours())}:{f(time.getMinutes())}
      </div>
    );
  }
}

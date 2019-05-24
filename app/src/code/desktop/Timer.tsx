import React, { Component } from "react";

interface TimerState {
    time: Date,
    intervalTimeout?: NodeJS.Timeout
}

export default class Timer extends Component<{}, TimerState>
{
    constructor(props : {} ) {
        super(props)

        this.state = {
            time:new Date()
        }
    }

    setNewTime = () => {
        this.setState({
            time: new Date()
        })
    }

    componentDidMount() {
        const intervalTimeout = setInterval(this.setNewTime, 1000);
        this.setState({intervalTimeout: intervalTimeout});
    }

    componentWillDisMount() {
        if(this.state.intervalTimeout)
            clearInterval(this.state.intervalTimeout);
    }
    render() {
        const {time} = this.state;
        return (<div className="gl-timer">
            {time.getHours()}:{time.getMinutes()}:{time.getSeconds()}
        </div>)
    }
}
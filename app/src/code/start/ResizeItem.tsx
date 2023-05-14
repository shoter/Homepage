import React, {Component} from "react";
import { ApplicationState } from "../state/store";
import RibbonItem from "./RibbonItem";
import Resources from "../../Resources";
import { connect } from "react-redux";

interface StateProps {
    isFullscreen : boolean
}

const mapStateToProps = (state : ApplicationState) : StateProps => ({
    isFullscreen: state.app.isFullscreen
});

export type ResizeItemProps = StateProps;

class ResizeItem extends Component<ResizeItemProps> {
    constructor(props: ResizeItemProps) {
        super(props);
    }

    onClick = () => {
        if(this.props.isFullscreen) {
            document.exitFullscreen();
        } else {
            document.body.requestFullscreen();
        }
    }

    render() {
        let title = "Enable fullscreen";
        let icon = Resources.enlarge;

        if(this.props.isFullscreen)
        {
            title = "Disable fullscreen";
            icon = Resources.downsize;
        }

        

        return (<RibbonItem name={title} onClick={this.onClick} iconUrl={icon} />);
    }
}

export default connect(mapStateToProps)(ResizeItem);
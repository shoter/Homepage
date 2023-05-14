import React, {Component} from "react";
import { Dispatch } from "redux";
import { WindowCloseTopActionMaker } from "../../code/state/windows/windowsActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";

interface DispatchProps {
    removeTopWindow : () => any
}

const mapDispatchToProps = (d: Dispatch) : DispatchProps => ({
    removeTopWindow: () => d(WindowCloseTopActionMaker())

})

export type BackArrowProps = DispatchProps;

class BackArrow extends Component<BackArrowProps> {
    constructor(props : BackArrowProps)
    {
        super(props);
    }

    closeTop = () => {
        this.props.removeTopWindow();
    }


    render() {
        return(<div className="back" onClick={this.closeTop}>
            <FontAwesomeIcon icon={faArrowLeft} />
        </div>)

    }
}

export default connect(null, mapDispatchToProps)(BackArrow);
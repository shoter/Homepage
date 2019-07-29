import React from 'react';
import logo from './logo.svg';
import './styles/app.scss';
import Desktop from './code/desktop/Desktop';
import { ApplicationState } from './code/state/store';
import { connect } from 'react-redux';
import MobileDesktop from './mobile/desktop/MobileDesktop';
import { WindowState } from './code/state/windows/windowState';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

interface AppStateProps {
  isMobile : boolean,
  currentWindow? : WindowState
}

export type AppProps = AppStateProps;

const mapStateToProps = (state : ApplicationState) : AppStateProps => ({
  isMobile : state.app.isMobile,
  currentWindow : state.windows.windows.length > 0 ? state.windows.windows[0] : undefined
});

class App extends React.Component<AppProps> {
  constructor(props : AppProps) {
    super(props)
  }

  render() {
    if(this.props.isMobile === false)
    {
    return (
      <div className="app">
        <Desktop />
      </div>
    );
    }

    if(this.props.currentWindow)
    {
      return (
        <div className="mobile-app">
          <div className="back">
          <FontAwesomeIcon icon={faArrowLeft} />
          <div className="shadow">

          </div>
          </div>
          {this.props.currentWindow.content}
        </div>
      )
    }

    return (
      <div className="app">
        <MobileDesktop />
      </div>
    );

  }
}

export default connect(mapStateToProps)(App);

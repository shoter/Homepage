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
import BackArrow from './mobile/common/BackArrow';
import Shutdown from './code/funny/shutdown';
import { CommentFactory } from './code/external/CommentFactory';

interface AppStateProps {
  isMobile : boolean,
  isShutdown : boolean,
  currentWindow? : WindowState
}

export type AppProps = AppStateProps;

const mapStateToProps = (state : ApplicationState) : AppStateProps => ({
  isMobile : state.app.isMobile,
  currentWindow : state.windows.windows.length > 0 ? state.windows.windows[state.windows.windows.length - 1]  : undefined,
  isShutdown : state.app.isShutdown
});

class App extends React.Component<AppProps> {
  constructor(props : AppProps) { 
    super(props)
  }

  render() {
    if(this.props.isShutdown)
    {
      return <Shutdown />
    }
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
      let commentArea : JSX.Element | undefined;
      if(this.props.currentWindow.disqusEntity)
      {
        commentArea = new CommentFactory().create(this.props.currentWindow.disqusEntity);
      }

      return (
        <div className="mobile-app">
          <BackArrow />
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

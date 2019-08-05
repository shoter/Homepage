import React from 'react';
import ReactDOM, { render } from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { Provider } from "react-redux";
import store from "./code/state/store";
import { GoogleAnalytics } from './code/external/GoogleAnalytics';

function ReactIsInDevelomentMode(){ 
    return '_self' in React.createElement('div'); 
}

let analytics : JSX.Element | undefined;

if(ReactIsInDevelomentMode())
{
    analytics = <GoogleAnalytics />;
}

ReactDOM.render(
(<Provider store={store}>
    {analytics}
    <App></App>
</Provider>)
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

//<div>Icons made by <a href="https://www.freepik.com/?__hstc=57440181.c5a5231947d4812d4e5ea3d725d01e05.1563579666778.1563579666778.1563619745925.2&__hssc=57440181.3.1563619745925&__hsfp=1960591823" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/"                 title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/"                 title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
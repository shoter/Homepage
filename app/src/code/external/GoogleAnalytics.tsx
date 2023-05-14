import ReactGA from 'react-ga';

export function loadAnalytics() {
    ReactGA.initialize('UA-106497042-1');
    ReactGA.pageview(window.location.pathname + window.location.search);
}
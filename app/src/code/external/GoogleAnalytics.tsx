import React, {Component} from "react";
declare var window : any;
declare var dataLayer: any;

export function GoogleAnalytics() {
    (window).gtag = function() {
        dataLayer.push(arguments);
    }

    return (<div>
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-106497042-1"></script>
        <script>
        window.dataLayer = window.dataLayer || [];
        gtag('js', new Date());

        gtag('config', 'UA-106497042-1');
        </script>
    </div>)
}
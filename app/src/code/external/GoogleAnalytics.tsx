import React, {Component} from "react";

declare var dataLayer : any;

export function loadAnalytics() {
    // thanks to https://stackoverflow.com/questions/8578617/inject-a-script-tag-with-remote-src-and-wait-for-it-to-execute
    let script = document.createElement("script") as HTMLScriptElement;
    script.type = "text/javascript";
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=UA-106497042-1"
    script.onload = function() {
        dataLayer = dataLayer || [];
        dataLayer.push(['js', new Date()]);
        dataLayer.push(['config', 'UA-106497042-1']);
    }
    document.getElementsByTagName('head')[0].appendChild(script);
}
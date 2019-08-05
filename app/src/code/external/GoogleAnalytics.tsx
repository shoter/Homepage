import React, {Component} from "react";

export function GoogleAnalytics() {
    return (<div>
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-106497042-1"></script>
        <script>
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push(['js', new Date()]);
        window.dataLayer.push(['config', 'UA-106497042-1']);
        </script>
    </div>)
}
import React, {Component} from "react";
import Window, { WindowProps } from "./Window";
import ContentRenderer from "./ContentRenderer";


export default class WebBrowser extends ContentRenderer{

    url: string;

    constructor(url: string) {
        super();

        this.url = url;
    }

    renderContent = () => {
        return (
            <iframe src={this.url} />
        )
    }
}


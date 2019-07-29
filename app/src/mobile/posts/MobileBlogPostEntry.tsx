import React, {Component} from "react";

export interface MobileGlosPostEntryProps {
    id : string,
    iconUrl: string,
    name: string,
    date: Date,
    author : string
}

export default class MobileGlosPostEntry extends Component<MobileGlosPostEntryProps> {
    constructor(props : MobileGlosPostEntryProps)
    {
        super(props);
    }

    render() {
        return (<div className="mobile-blog-post-entry">
            <div className="image">
                <img src={this.props.iconUrl} />
            </div>
            <div className="description">
                <div className="title">{this.props.name}</div>
                <div className="sub">{this.props.date.toDateString()} by {this.props.author}</div>
            </div>
        </div>)
    }
}
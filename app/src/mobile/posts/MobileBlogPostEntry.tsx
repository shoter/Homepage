import React, {Component} from "react";
import { WindowCreateActionExtraData, WindowCreateActionMaker } from "../../code/state/windows/windowsActions";
import { Dispatch } from "redux";
import { findPost } from "../../code/posts/Posts";
import { BlogRouter } from "../../code/router/router";
import BlogPost from "../../code/Windows/BlogPost";
import { BlogElement } from "../../code/router/blogElement";
import { MobileBlogPost } from "./MobileBlogPost";
import { connect } from "react-redux";

interface Props {
    id : string,
    iconUrl: string,
    name: string,
    date: Date,
    author : string
}

interface DispatchProps {
    createWindow : (name: string, icon: string, content: JSX.Element, data: WindowCreateActionExtraData) => any;
};

const mapDispatchToProps = (d: Dispatch) : DispatchProps => ({
    createWindow: (name, icon, content, data) => d(WindowCreateActionMaker(name, icon, content, data))
})

export type MobileBlogPostEntryProps = Props & DispatchProps;

export class MobileBlogPostEntry extends Component<MobileBlogPostEntryProps> {
    constructor(props : MobileBlogPostEntryProps)
    {
        super(props);
    }

    createWindow = () => {
        var post = findPost(this.props.id);
        fetch(post.path).then(res => res.text()).then(text => {

            this.props.createWindow(this.props.name, this.props.iconUrl, <MobileBlogPost post={post} markdown={text} />, { 
                isMaximalized: true,
                routerElementId : BlogRouter.addElement(new BlogElement(post))
            });
        })
    }

    render() {
        return (<div className="mobile-blog-post-entry" onClick={this.createWindow}>
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

export default connect(null, mapDispatchToProps)(MobileBlogPostEntry);
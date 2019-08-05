import React, {Component} from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { WindowCreateActionMaker, WindowCreateActionExtraData } from "../state/windows/windowsActions";
import { findPost } from "../posts/Posts";
import BlogPost from "./BlogPost";
import { BlogRouter } from "../router/router";
import { BlogElement } from "../router/blogElement";

interface Props {
    id: string,
    name: string,
    date: Date,
    author: string,
    iconUrl: string
}

interface DispatchProps {
    createWindow: (name: string, icon: string, content : JSX.Element, data : WindowCreateActionExtraData) => any;
}

const mapDispatchToProps = (d: Dispatch) : DispatchProps => ({
    createWindow : (name: string, icon: string, c: JSX.Element, data : WindowCreateActionExtraData) => d(WindowCreateActionMaker(name, icon, c, data))
});

type BlogPostEntryProps = Props & DispatchProps;

class BlogPostEntry extends Component<BlogPostEntryProps> {
    constructor(props : BlogPostEntryProps) {
        super(props)
    }

    createWindow = () => {
        var post = findPost(this.props.id);
        fetch(post.path).then(res => res.text()).then(text => {

            this.props.createWindow(this.props.name, this.props.iconUrl, <BlogPost post={post} markdown={text} />, { 
                isMaximalized: true,
                routerElementId : BlogRouter.addElement(new BlogElement(post))
            });

        })
    }

    render() {
        const {name, date, author, iconUrl} = this.props;
        return (<div className="blog-post-entry" onClick={this.createWindow}>
            <div className="cell image">
                <img src={iconUrl} />
            </div>
            <div className="cell">
                {name}
            </div>
            <div className="cell">
                {date.toDateString()}
            </div>
            <div className="cell">
                {author}
            </div>
        </div>);
    }
}

export default connect(null, mapDispatchToProps)(BlogPostEntry);
import React, {Component} from "react";
import Posts from "../../code/posts/Posts";
import MobileBlogPostEntry from "./MobileBlogPostEntry";

export default class MobileBlogPosts extends Component
{
    render = () => {
        var posts = Posts.map(p => (
          <MobileBlogPostEntry
            id={p.shortTitle}
            key={p.shortTitle}
            iconUrl={p.iconUrl}
            name={p.postTitle}
            date={p.date}
            author={p.author}
            
          />
        ));
    
        return (
              <div className="mobile-blog-posts">
                {posts}
              </div>
        );
      }
}

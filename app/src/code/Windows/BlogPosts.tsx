import React from "react";
import ContentRenderer from "./ContentRenderer";
import Posts from "../posts/Posts";
import BlogPostEntry from "./BlogPostEntry";


export default class BlogPosts extends ContentRenderer {
  renderContent = () => {
    var posts = Posts.map(p => (
      <BlogPostEntry
        id={p.shortTitle}
        key={p.shortTitle}
        iconUrl={p.iconUrl}
        name={p.title}
        date={p.date}
        author={p.author}
        
      />
    ));

    return (
          <div className="blog-posts">
              <div className="head">
                  <div>&nbsp;</div>
                  <div>Title</div>
                  <div>Date</div>
                  <div>Author</div>
              </div>
              <div className="body">
                  {posts}
              </div>
          </div>
    );
  };
}

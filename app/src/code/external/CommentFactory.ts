import { Post } from "../posts/Posts";
import { UrlCreator } from "../common/urlCreator";
import { CommentArea } from "./CommentArea";

export class DisqusFactory {

    create(post : Post) : JSX.Element {
        let url =  UrlCreator.createUrl(post.shortTitle);

       return CommentArea({id: post.shortTitle, title: post.title, url: url});
    }
}
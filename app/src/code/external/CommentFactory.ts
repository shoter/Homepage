import { Post } from "../posts/Posts";
import { UrlCreator } from "../common/urlCreator";
import { DisqusComponent } from "./DisqusComponent";

export class DisqusFactory {

    create(post : Post) : JSX.Element {
        let url =  UrlCreator.createUrl(post.shortTitle);

       return DisqusComponent(post.title, post.shortTitle, url);
    }
}
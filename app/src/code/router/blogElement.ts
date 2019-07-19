import { RouterElement } from "./routerElement";
import { RouterPathElement } from "./routerPathElement";
import { Post } from "../posts/Posts";

export class BlogElement extends RouterElement {

   private _post : Post;

   constructor(post : Post)
   {
      super();
      this._post = post;
   }

   pathitize = () : RouterPathElement[] => {
      return [{
         key: "i", value: this._post.shortTitle
      }]
   }

   getType = () => "bp"; //blog post
}
import { RouterElement } from "./routerElement";
import { RouterPathElement } from "./routerPathElement";
import { Post } from "../posts/Posts";
import { Observer } from "../common/observer";

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

   getType = () => BlogElement.type; //blog post

   static type = "bp";
}
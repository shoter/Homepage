import { RouterPathElement } from "./routerPathElement";
import { idea } from "react-syntax-highlighter/dist/styles/hljs";
import { Observer } from "../common/observer";

export abstract class RouterElement {
    private _observers : Observer<RouterElement>[];

    constructor()
    {
        this._observers = [];
    }
    abstract pathitize : () => RouterPathElement[];
    abstract getType : () => string;

    
   addObserver(o : Observer<RouterElement>)
   {
      this._observers.push(o); // removing will not be needed
   }

   protected notifyAboutUpdate()
   {
      for(let o of this._observers)
      {
         o.notify(this);
      }
    }
   
}
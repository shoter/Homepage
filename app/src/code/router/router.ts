import { RouterElement } from "./routerElement";
import { number } from "prop-types";
import { Observer } from "../common/observer";

export class BlogRouterClass implements Observer<RouterElement> {
    private static _instance: BlogRouterClass;

    private _baseUrl : string;
    private _elements : { [id:number] : RouterElement}
    private _lastId : number;

    private constructor() {

        let location = window.location;
        this._baseUrl = location.origin + location.pathname;
        this._elements = {};
        this._lastId = 0;
    }

    addElement(element : RouterElement) : number {
        this._lastId += 1;
        this._elements[this._lastId] = element;
        element.addObserver(this);

        this.updatePath();
        return this._lastId;
    }    

    removeElement(id : number) {
        delete this._elements[id];
        this.updatePath();
    }

    getPath() : string {

        if(Object.keys(this._elements).length === 0)
        {
            return "";
        }

        let number = 0;
        let path = "?";

        for(let key in this._elements)
        {
            let el = this._elements[key];

            path += `type${number}=${el.getType()}&`;

            let paths = el.pathitize();

            for(let p of paths)
            {
                path += `${p.key}${number}=${p.value}&`
            }

            number += 1;
        }

        return path.substring(0, path.length - 1);;
    }

    updatePath() {
        let path = this.getPath();
        let url = this._baseUrl + path;
        window.history.pushState({}, "I can code", url);
    }

    notify = (el?: RouterElement) : void => {
        this.updatePath();
    }

    public static get Instance()
    {
        return this._instance || (this._instance = new this());
    }
}

export const BlogRouter = BlogRouterClass.Instance;

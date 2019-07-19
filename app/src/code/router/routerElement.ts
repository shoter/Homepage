import { RouterPathElement } from "./routerPathElement";
import { idea } from "react-syntax-highlighter/dist/styles/hljs";

export abstract class RouterElement {
    abstract pathitize : () => RouterPathElement[];
    abstract getType : () => string;
}
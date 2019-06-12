import { Action } from "redux";

export default interface BaseAction extends Action<string> {
    type: string
};
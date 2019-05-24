import BaseAction from "../baseAction";

export default interface DesktopAction extends BaseAction {}

export class DesktopTimeAction implements DesktopAction {
    type: string;
    newTime: Date;

    constructor(newTime : Date)
    {
        this.type = DesktopTimeAction.name;
        this.newTime = newTime;
    }
}
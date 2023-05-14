import BaseAction from "../baseAction";
import { findProject } from "../../projects/Projects";
import { Dispatch } from "redux";

export interface ProjectAction extends BaseAction {};

export interface ChangeProjectAction extends ProjectAction {
    projectId: string,
    markdown?: string
};

export function ChangeProjectActionMaker(projectId: string) : any {
    return (dispatch: Dispatch) => {

        let project = findProject(projectId);

        fetch(project.path).then(res => res.text()).then(text => {
            let action : ChangeProjectAction = {
                type: ChangeProjectActionMaker.name,
                markdown : text,
                projectId : projectId
            };
            return dispatch(action);
            })
    }
};
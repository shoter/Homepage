import { ProjectAction, ChangeProjectActionMaker, ChangeProjectAction } from "./projectsAction";
import produce from "immer";

interface ProjectStateMutable {
    currentProjectId? : string,
    markdown? : string
};

export type ProjectState = Readonly<ProjectStateMutable>;

const initialState : ProjectState = {
    currentProjectId: undefined,
    markdown: undefined
};

export default function projectsReducer(
    state: ProjectState = initialState,
    action: ProjectAction
) : ProjectState {
    switch(action.type)
    {
        case ChangeProjectActionMaker.name:
        {
            let a = action as ChangeProjectAction;

            return produce(state, draft => {
                draft.currentProjectId = a.projectId;
                draft.markdown = a.markdown;
            });
        }
    }
    return state;
}
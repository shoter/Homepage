import {
  WindowAction,
  WindowCloseActionMaker,
  WindowUpdateAllAction,
  WindowUpdateAllActionMaker,
  WindowCreateAction,
  WindowUpdatePositionAction,
  WindowCreateActionMaker,
  WindowUpdatePositionActionMaker,
  WindowUpdateSizeActionMaker,
  WindowUpdateSizeAction,
  WindowCloseAction,
  WindowMinimalizeActionMaker,
  WindowMinimalizeAction,
  WindowToggleMaximalizeActionMaker,
  WindowToggleMaximalizeAction
} from "./windowsActions";
import { WindowState } from "./windowState";
import { ApplicationState } from "../store";
import { withStatement } from "@babel/types";
import produce from "immer";
import { BlogRouter } from "../../router/router";
import { Post } from "../../posts/Posts";
import { Project } from "../../projects/Projects";
import { DisqusEntity } from "../../external/DisqusEntity";

interface WindowsStateMutable {
  windows: WindowState[];
  lastWindowId: number;
maximalizedId?: number;
}

export type WindowsState = Readonly<WindowsStateMutable>;

const initialState: WindowsState = {
  windows: [],
  lastWindowId: 0
};

function findById(state: WindowsState, id: number): WindowState {
  // This should never be undefined. But there is always a chance that it can go wrong. meh
  return state.windows.find(
    (window: WindowState) => window.id === id
  ) as WindowState;
}

function findIdById(state: WindowsState, windowId: number): number {
  for (let i = 0; i < state.windows.length; ++i) {
    if (state.windows[i].id === windowId) return i;
  }

  throw "No number";
}

function updateWindow(window: WindowState, state: WindowsState): WindowsState {
  let newState: WindowsState = {
    lastWindowId: state.lastWindowId,
    maximalizedId: state.maximalizedId,
    windows: state.windows
  };

  for (let i = 0; i < newState.windows.length; ++i) {
    if (newState.windows[i].id === window.id) {
      newState.windows[i] = window;
    }
  }

  return newState;
}

export default function windowsReducer(
  state: WindowsState = initialState,
  action: WindowAction
): WindowsState {
  switch (action.type) {
    case WindowCreateActionMaker.name: {
      let createAction = action as WindowCreateAction;

      let isMaximalized = false;

      if(createAction.data && createAction.data.isMaximalized)
      {
        isMaximalized = true;
      }

      let routerId : number | undefined;

      if(createAction.data && createAction.data.routerElementId)
      {
        routerId = createAction.data.routerElementId;
      }

      let disqusEntity : DisqusEntity | undefined;

      if(createAction.data && createAction.data.disqusEntity)
      {
        disqusEntity = createAction.data!.disqusEntity;
      }

      var window: WindowState = {
        title: createAction.title,
        iconUrl: createAction.iconUrl,
        content: createAction.content,
        id: state.lastWindowId + 1,
        isMaximalized: isMaximalized,
        isMinimalized: false,
        active: true,
        routerId: routerId,
        disqusEntity : disqusEntity
      };

      return produce(state, draft => {
        draft.lastWindowId = state.lastWindowId + 1;
        for (let w of draft.windows) {
          w.active = false;
        }
        draft.windows.push(window);
      });
    }
    case WindowUpdatePositionActionMaker.name: {
      let updateAction = action as WindowUpdatePositionAction;
      return produce(state, draft => {
        draft.windows[
          draft.windows.findIndex(w => w.id === updateAction.windowId)
        ].x = updateAction.x;
        draft.windows[
          draft.windows.findIndex(w => w.id === updateAction.windowId)
        ].y = updateAction.y;
      });
    }

    case WindowUpdateSizeActionMaker.name: {
      let a = action as WindowUpdateSizeAction;
      return produce(state, draft => {
        draft.windows[draft.windows.findIndex(w => w.id === a.windowId)].width =
          a.width;
        draft.windows[
          draft.windows.findIndex(w => w.id === a.windowId)
        ].height = a.height;
      });
    }
    case WindowUpdateAllActionMaker.name: {
      let updateAction = action as WindowUpdateAllAction;

      return produce(state, draft => {
        draft.windows = updateAction.windows;
      });
    }
    case WindowCloseActionMaker.name: {
      let a = action as WindowCloseAction;

      let w = state.windows.find(w => w.id === a.windowId);

      if(w && w.routerId)
      {
        BlogRouter.removeElement(w.routerId);
      }

      return produce(state, draft => {
        draft.windows.splice(
          draft.windows.findIndex(w => w.id === a.windowId),
          1
        );
      });
    }
    case WindowMinimalizeActionMaker.name: {
      let a = action as WindowMinimalizeAction;

      return produce(state, draft => {
        let i = draft.windows.findIndex(w => w.id === a.windowId);
        draft.windows[i].active = false;
        draft.windows[i].isMinimalized = true;
        
      });
    }
    case WindowToggleMaximalizeActionMaker.name: {
      let a = action as WindowToggleMaximalizeAction;

      return produce(state, draft => {
        let i = draft.windows.findIndex(w => w.id === a.windowId);
        draft.windows[i].active = true;
        draft.windows[i].isMaximalized = !draft.windows[i].isMaximalized;
      });
    }
  }
  return state;
}

import { Post } from "../../posts/Posts";
import { Project } from "../../projects/Projects";
import { DisqusEntity } from "../../external/DisqusEntity";

interface WindowStateMutable {
    id: number,
    active: boolean,
    title: string,
    iconUrl: string,
    x?: number,
    y?: number,
    width?: number,
    height?: number,
    isMaximalized : boolean,
    isMinimalized: boolean,
    content: JSX.Element,
    routerId?: number,
    disqusEntity? : DisqusEntity
}

export type WindowState = Readonly<WindowStateMutable>;

import { WindowVisibility } from "./WindowVisibility";

interface WindowStateMutable {
    id: number,
    active: boolean,
    title: string,
    iconUrl: string,
    x?: number,
    y?: number,
    width?: number,
    height?: number,
    visibility: WindowVisibility,
    render: () => JSX.Element | null
}

export type WindowState = Readonly<WindowStateMutable>;

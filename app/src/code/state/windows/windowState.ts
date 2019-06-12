import { WindowVisibility } from "./WindowVisibility";

export interface WindowState {
    id: number,
    active: boolean,
    title: string,
    iconUrl: string,
    x: number,
    y: number,
    width: number,
    height: number,
    visibility: WindowVisibility,
    render: () => JSX.Element | null
}

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
    routerId?: number
}

export type WindowState = Readonly<WindowStateMutable>;

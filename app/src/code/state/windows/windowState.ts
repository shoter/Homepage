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
    render: () => JSX.Element | null
}

export type WindowState = Readonly<WindowStateMutable>;

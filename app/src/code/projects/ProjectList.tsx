import React, { Component} from "react";

export interface ProjectListItemProps {
    title: string,
    iconUrl: string,
    id: string
}

export interface ProjectListProps {
    items : ProjectListItemProps[]
    onClick? : (projectId: string) => void;
}

export function ProjectList(props : ProjectListProps) {

    const onClick = (id: string) => {
        if(props.onClick)
        {
            props.onClick(id);
        }
    }


    var items = props.items.map(i => {
        return (<div className="project-short" onClick={() => onClick(i.id)}>
            <img src={i.iconUrl} />
            {i.title}
        </div>)
    })

    return (<div className="projects-list">
        {items}
    </div>)
}
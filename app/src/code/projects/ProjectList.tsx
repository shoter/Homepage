import React, { Component} from "react";
import { ProjectCategories, ProjectCategory, Projects, Project } from "./Projects";
import ProjectListCategoryEntry from "./ProjectListCategoryEntry";

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

    let categories : JSX.Element[] = [];

    for(let ck in ProjectCategories)
    {
        let projectCategory = Reflect.get(ProjectCategories, ck) as ProjectCategory;

        let projectsInCategory : Project[] = [];

        for(let p of Projects)
        {
            if(p.projectCategory === projectCategory)
            {
                projectsInCategory.push(p);
            }
        }

        categories.push(<ProjectListCategoryEntry category={projectCategory} projects={projectsInCategory} />); 
    }


    return (<div className="projects-list">
        {categories}
    </div>)
}
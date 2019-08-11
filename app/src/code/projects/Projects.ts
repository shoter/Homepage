import Resources from "../../Resources";

const ttsg = require("./ttsg.txt");

export interface Project {
    title: string,
    id: string,
    iconUrl: string,
    startDate? :string,
    endDate? : string,
    repository?: string,
    path: string,
    photosPaths: string[],
    projectCategory : ProjectCategory
};

export interface ProjectCategory {
    name : string,
    iconUrl : string
}


export const ProjectCategories = {
    games : 
    {
        name : "Games",
        iconUrl : Resources.gamepad
    },
}

export const Projects : Project[] = [
    {
        projectCategory: ProjectCategories.games,
        title: "Turn time strategy game",
        id : "TTSG",
        startDate: "When I was 14 years old",
        iconUrl: Resources.can,
        path: ttsg,
        repository: "https://github.com/shoter/TTSG",
        photosPaths : [
            "https://raw.githubusercontent.com/shoter/Homepage/master/media/ttsg1.jpg",
            "https://raw.githubusercontent.com/shoter/Homepage/master/media/ttsg2.jpg"
        ]
    }
];

export function findProject(id: string) {
    return Projects.find(p => p.id === id) as Project;
}
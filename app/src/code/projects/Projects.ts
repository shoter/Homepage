import Resources from "../../Resources";

const ttsg = require("./ttsg.txt");
const att = require("./att.txt");
const ottddiscordbot = require("./ottddiscordbot.txt");

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
    discord : 
    {
        name : "Discord Bots",
        iconUrl : Resources.discord
    },
    games : 
    {
        name : "Games",
        iconUrl : Resources.gamepad
    },
}

export const Projects : Project[] = [
    {
        projectCategory: ProjectCategories.discord,
        title: "OpenTTD Discord Bot",
        id : "OttdDiscord",
        startDate: "2020",
        iconUrl: Resources.discord,
        path: ottddiscordbot,
        repository: "https://github.com/shoter/OpenttdDiscord",
        photosPaths : [
            "https://raw.githubusercontent.com/shoter/Homepage/master/media/OpenttdDiscordBot.png"
        ]
    },
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
    },
    {
        projectCategory: ProjectCategories.games,
        title: "Autumn Apple Tree",
        id: "ATT",
        startDate: "August 2013",
        endDate: "October 2013",
        iconUrl: Resources.tree,
        path: att,
        repository: "https://github.com/shoter/Autumn-Apple-Tree",
        photosPaths: [
            "https://raw.githubusercontent.com/shoter/Homepage/master/media/att.png"
        ]
    }
];

export function findProject(id: string) {
    return Projects.find(p => p.id === id) as Project;
}
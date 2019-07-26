import Resources from "../../Resources";
import { string } from "prop-types";

const helloPath = require( "./helloWorld.txt");
const extension = require("./extension.txt");
const dependencyHell = require("./dependency_hell.txt")
export interface Post {
    title : string,
    shortTitle : string,
    iconUrl: string,
    date : Date,
    author: string,
    path: string
}


const Posts : Post[] = [
    {
        title: "Dependency hell",
        shortTitle: "dep_hell",
        date: new Date(2019, 0, 30),
        iconUrl: Resources.notebook,
        author: "Shoter",
        path: dependencyHell
    },
    {
        title: "An extension I cannot live without",
        shortTitle: "ExtensionLiveWithout",
        date: new Date(2018, 11, 23),
        iconUrl: Resources.notebook,
        author: "Shoter",
        path: extension
    },
    {
        title: "Hello World",
        shortTitle: "HelloWorld",
        date : new Date(2018, 1, 1),
        iconUrl : Resources.notebook,
        author: "Shoter",
        path: helloPath
    }
]

export function findPost(id: string) {
    return Posts.find(p => p.shortTitle === id) as Post;
}

export default Posts;
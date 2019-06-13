import Resources from "../../Resources";
import { string } from "prop-types";

const helloPath = require( "./helloWorld.txt");
const extension = require("./extension.txt");

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
        title: "An extension I cannot live without",
        shortTitle: "ExtensionLiveWithout",
        date: new Date(2018, 11, 23),
        iconUrl: Resources.can,
        author: "Shoter",
        path: extension
    },
    {
        title: "Hello World",
        shortTitle: "HelloWorld",
        date : new Date(2018, 1, 1),
        iconUrl : Resources.can,
        author: "Shoter",
        path: helloPath
    }
]

export function findPost(id: string) {
    return Posts.find(p => p.shortTitle === id) as Post;
}

export default Posts;
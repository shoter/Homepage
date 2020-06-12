import Resources from "../../Resources";
import { string } from "prop-types";

const helloPath = require( "./helloWorld.txt");
const extension = require("./extension.txt");
const dependencyHell = require("./dependency_hell.txt")
const awaitasync = require("./awaitasync.txt");
const cve = require("./custom_view_engine.txt");
const zindex = require("./zindex.txt");
const aborted_transaction_cause = require("./aborted_transaction_cause.txt");
const assembly_copy_gac = require("./assembly_copy_gac.txt");
const ninject_fluent_scheduler = require("./ninject_fluent_scheduler.txt");
const debugging_ef = require("./debugging_ef.txt");
const static_code_analyzer_use_it = require("./static_code_analyzer_use_it.txt");
const tfs30063 = require("./tfs30063.txt");
const firstRoslynAnalyzer = require("./first_roslyn_analyzer.txt");
const dotnet_core_mailna = require("./dotnet_core_mailna.txt");
const hostpolicy = require("./hostpolicy.txt");

export interface Post {
    postTitle : string,
    shortTitle : string,
    iconUrl: string,
    date : Date,
    author: string,
    path: string
}

export function findPost(id: string) {
    return Posts.find(p => p.shortTitle === id) as Post;
}

export function instanceOfPost(any : any)
{
    return "postTitle" in any;
}


const Posts : Post[] = [
    {
        postTitle: "The library 'hostpolicy.dll' required to execute the application was not found in Error",
        shortTitle: "hostpolicy",
        date: new Date(2020, 6, 10),
        iconUrl: Resources.notebook,
        author: "shoter",
        path: hostpolicy,
    },
    {
        postTitle: "How to install .NET Core 3.1 on raspbian 10",
        shortTitle: "dotnet_core_malina",
        date: new Date(2020, 2, 29),
        iconUrl: Resources.notebook,
        author: "shoter",
        path: dotnet_core_mailna,
    },
    {
        postTitle: "My First Roslyn Analyzer",
        shortTitle: "first_roslyn",
        date: new Date(2019, 9, 31),
        iconUrl: Resources.notebook,
        author: "shoter",
        path: firstRoslynAnalyzer,
    },
    {
        postTitle: "Dependency hell",
        shortTitle: "dep_hell",
        date: new Date(2019, 0, 30),
        iconUrl: Resources.notebook,
        author: "Shoter",
        path: dependencyHell
    },
    {
        postTitle: "An extension I cannot live without",
        shortTitle: "ExtensionLiveWithout",
        date: new Date(2018, 11, 23),
        iconUrl: Resources.notebook,
        author: "Shoter",
        path: extension
    },
    {
        postTitle: "C# - async and await - who are you?",
        shortTitle: "awaitasync",
        date: new Date(2018, 10, 2),
        iconUrl: Resources.notebook,
        author: "Shoter",
        path: awaitasync,
    },
    {
        postTitle: "How to use Ninject with FluentScheduler",
        shortTitle: "ninject_fluent_scheduler",
        date: new Date(2018, 4, 30),
        iconUrl: Resources.notebook,
        author: "Shoter",
        path: ninject_fluent_scheduler,
    },
    {
        postTitle : "How to copy assembly from GAC",
        shortTitle : "assembly_gac_Copy",
        date: new Date(2017,12, 8),
        iconUrl: Resources.notebook,
        author: "Shoter",
        path: assembly_copy_gac
    },
    {
        postTitle : "Static Code Analyzer – start using them today",
        shortTitle : "static_code_analyzer_use_it",
        date: new Date(2017,12, 4),
        iconUrl: Resources.notebook,
        author: "Shoter",
        path: static_code_analyzer_use_it
    },
    {
        postTitle : "Determining cause of aborted transaction",
        shortTitle : "aborted_transaction_cause",
        date: new Date(2017,11, 15),
        iconUrl: Resources.notebook,
        author: "Shoter",
        path: aborted_transaction_cause
    }, 
    {
        postTitle : "Custom View Engine",
        shortTitle : "cve",
        date: new Date(2017,11, 8),
        iconUrl: Resources.notebook,
        author: "Shoter",
        path: cve
    },
    {
        postTitle : "Seeing produced code and debugging Entity Framework",
        shortTitle : "debugging_ef",
        date: new Date(2017,11, 6),
        iconUrl: Resources.notebook,
        author: "Shoter",
        path: debugging_ef
    },
    {
        postTitle: "TFS30063: you are not authorized to access – possible solution",
        shortTitle: "tfs30063",
        date: new Date(2017, 10, 14),
        iconUrl: Resources.notebook,
        author: "Shoter",
        path: tfs30063,
    },
    {
        postTitle : "Change z-index property slowly in time",
        shortTitle : "zindex",
        date: new Date(2017,10, 12),
        iconUrl: Resources.notebook,
        author: "Shoter",
        path: zindex
    },
    {
        postTitle: "Hello World",
        shortTitle: "HelloWorld",
        date : new Date(2016, 1, 1),
        iconUrl : Resources.notebook,
        author: "Shoter",
        path: helloPath
    }
]



export default Posts;
import RSS from "rss";

interface Post {
    id: string,
    title: string,
    description: string,
    date: Date,
    author: string
}

let posts : Post[] = [
    {
        title: "Dependency hell",
        id: "dep_hell",
        date: new Date(2019, 0, 30),
        description: "Blog posts describing dependency hell problem with C#",
        author : "Shoter"
    },
    {
        title: "An extension I cannot live without",
        id: "ExtensionLiveWithout",
        date: new Date(2018, 11, 23),
        description: "Blog post about Dpack",
        author : "Shoter"
    },
    {
        title: "C# - async and await - who are you?",
        id: "awaitasync",
        date: new Date(2018, 10, 2),
        author: "Shoter",
        description: "Blog post about async and await."
    },
    {
        title: "How to use Ninject with FluentScheduler",
        id: "ninject_fluent_scheduler",
        date: new Date(2018, 4, 30),
        author: "Shoter",
        description: "How to use Ninject with FluentScheduler",
    },
    {
        title : "How to copy assembly from GAC",
        id : "assembly_gac_Copy",
        date: new Date(2017,12, 8),
        author: "Shoter",
        description: "A post about copying assembly from GAC in windows",
    },
    {
        title : "Static Code Analyzer – start using them today",
        id : "static_code_analyzer_use_it",
        date: new Date(2017,12, 4),
        author: "Shoter",
        description: "Post about static code analyzers.",
    },
    {
        title : "Determining cause of aborted transaction",
        id : "aborted_transaction_cause",
        date: new Date(2017,11, 15),
        author: "Shoter",
        description: "How to transactions.",
    }, 
    {
        title : "Custom View Engine",
        id : "cve",
        date: new Date(2017,11, 8),
        author: "Shoter",
        description: "ASP.NET MVC Custom View Engines - how to.",
    },
    {
        title : "Seeing produced code and debugging Entity Framework",
        id : "debugging_ef",
        date: new Date(2017,11, 6),
        author: "Shoter",
        description: "How to debug EF.",
    },
    {
        title: "TFS30063: you are not authorized to access – possible solution",
        id: "tfs30063",
        date: new Date(2017, 10, 14),
        author: "Shoter",
        description: "TFS error.",
    },
    {
        title : "Change z-index property slowly in time",
        id : "zindex",
        date: new Date(2017,10, 12),
        author: "Shoter",
        description: "How to change z-index with animation."
    },
    {
        title: "Hello World",
        id: "HelloWorld",
        date : new Date(2018, 1, 1),
        description: "Hello world",
        author : "Shoter"
    }
]

let feed = new RSS({
    title: "I can code",
    description: "Damian Laczak's blog",
    language:"en-GB",
    feed_url:"http://damian.laczak.net.pl/blog/feed.xml",
    site_url:"http://damian.laczak.net.pl/blog",
});

for(let p of posts)
feed.item({
    author: p.author,
    title: p.title,
    description: p.description,
    date: p.date,
    url:`http://damian.laczak.net.pl/blog/?${p.id}`,
    guid:`http://damian.laczak.net.pl/blog/?${p.id}`
})

console.log(feed.xml());

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

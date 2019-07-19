import { Post } from "../../code/posts/Posts";
import { BlogElement } from "../../code/router/blogElement";
import queryString from "querystring";
import { BlogRouterClass } from "../../code/router/router";

describe("BlogRouter", () =>{

    beforeEach(() => {
        jest.resetModules();
        jest.resetModuleRegistry();
    })

    it("should have empty path when it has no elements", () => {
        const BlogRouter = require("../../code/router/router").BlogRouter;
        expect(BlogRouter.getPath()).toBe("");
    });

    it("should contain proper path for blog post", () => {
        const BlogRouter = require("../../code/router/router").BlogRouter;
        const title = "abcd";
        let post : Post = {
            author : "",
            date : new Date(),
            iconUrl: "",
            path: "",
            shortTitle : title,
            title : ""
        }

        let el = new BlogElement(post);

        let id = BlogRouter.addElement(el);

        let path = BlogRouter.getPath();

        expect(path.length).toBeGreaterThan(0);
        expect(path[0]).toBe("?");

        path = path.substring(1, path.length);
        

        var query = queryString.parse(path);
        expect(query["type0"]).toBe(el.getType());

        for(let p of el.pathitize())
        {
            expect(query[`${p.key}0`]).toBe(p.value)
        }
    })

    it("should remove element", () => {
        const BlogRouter = require("../../code/router/router").BlogRouter;
        const title = "abcd";
        let post : Post = {
            author : "",
            date : new Date(),
            iconUrl: "",
            path: "",
            shortTitle : title,
            title : ""
        }



        let el = new BlogElement(post);

        let id = BlogRouter.addElement(el);
        BlogRouter.removeElement(id);

        expect(BlogRouter.getPath()).toBe("");
    })

    it("should contain proper path for 2 blog post", () => {
        const BlogRouter = require("../../code/router/router").BlogRouter;
        const title = "abcd";
        let post : Post = {
            author : "",
            date : new Date(),
            iconUrl: "",
            path: "",
            shortTitle : title,
            title : ""
        }

        let el = new BlogElement(post);
        
        let post2 : Post = {
            title : "Elo",
            ...post
        };

        let el2 = new BlogElement(post2);

        BlogRouter.addElement(el);
        BlogRouter.addElement(el2);

        let query = queryString.parse(BlogRouter.getPath().substr(1));

        expect(query["type0"]).toBe(el.getType());
        expect(query["type1"]).toBe(el.getType());

        for(let p of el.pathitize())
        {
            expect(query[`${p.key}0`]).toBe(p.value)
        }

        for(let p of el2.pathitize())
        {
            expect(query[`${p.key}1`]).toBe(p.value)
        }
    })

})
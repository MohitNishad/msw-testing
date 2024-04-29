import { screen } from "@testing-library/react";
import { navigateTo } from "./utils";
import { db } from "./mocks/db";
import { IPost } from "../src/App";

let post: IPost;
beforeAll(() => {
    const obj = db.posts.create();
    post = obj;
});
afterAll(() => {
    db.posts.delete({
        where: {
            id: {
                equals: post.id,
            },
        },
    });
});

describe("Post", () => {
    it("should render a loading screen if the request is not resolved to find a particullar post", () => {
        navigateTo(`/${post.id}`);
        const loading = screen.getByText(/loading/i);
        expect(loading).toBeInTheDocument();
    });

    it("should render a post title and its body if request is successfull", async () => {
        navigateTo(`/${post.id}`);
        const heading = await screen.findByText(post.title);
        expect(heading).toBeInTheDocument();
    });
});

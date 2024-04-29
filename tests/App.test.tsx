import { screen, waitFor } from "@testing-library/react";
import { navigateTo } from "./utils";
import { db } from "./mocks/db";
import { IPost } from "../src/App";

const posts: IPost[] = [];

beforeAll(() => {
    [1, 2, 3, 4].forEach(() => {
        const result = db.posts.create();
        posts.push(result);
    });
});
afterAll(() => {
    db.posts.deleteMany({
        where: {
            id: {
                in: posts.map((post) => post.id),
            },
        },
    });
});

describe("App", () => {
    it("should render 'Loading...' text when request is not resolved", () => {
        navigateTo("/");
        const loading = screen.getByText(/loading/i);
        expect(loading).toBeInTheDocument();
    });

    it("should render the products with links including their id", async () => {
        navigateTo("/");
        await waitFor(() => {
            const cards = screen.getAllByRole("listitem");
            expect(cards.length).toBe(posts.length);
            posts.forEach((post) => {
                const link = screen.getByRole("link", {
                    name: post.title,
                });
                expect(link).toHaveAttribute("href", `/${post.id}`);
            });
        });
    });
});

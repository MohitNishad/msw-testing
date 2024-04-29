/* eslint-disable @typescript-eslint/unbound-method */
import { factory, manyOf, oneOf, primaryKey } from "@mswjs/data";
import { faker } from "@faker-js/faker";

export const db = factory({
    category: {
        id: primaryKey(faker.number.int),
        name: faker.commerce.department,
        products: manyOf("product"),
    },
    posts: {
        id: primaryKey(faker.number.int),
        userId: faker.number.int,
        title: faker.lorem.sentence,
        body: faker.lorem.sentence,
    },
});

// const app = require("../src/app");
// const supertest = require("supertest");
// const agent = supertest(app);
// const db = require("../src/database");

// afterAll(async () => {
//   await db.end();
// });

// beforeAll(async () => {
//   await db.query("DELETE FROM articles; DELETE FROM categories;");

//   const categoriesInsertionQuery = `INSERT INTO categories (name) VALUES ('tech');
//     INSERT INTO categories (name) VALUES ('geek');
//     INSERT INTO categories (name) VALUES ('music');`;

//   await db.query(categoriesInsertionQuery);

//   const result = await db.query("SELECT id FROM categories");
//   const categories = result.rows;

//   const articlesInsertionQuery = ` INSERT INTO articles(body, "categoryId") VALUES ('Lorem Ipsum is simply dummy text of the printing and typesetting industry.', ${categories[0].id});
//     INSERT INTO articles(body, "categoryId") VALUES ('It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem', ${categories[1].id});
//     INSERT INTO articles(body, "categoryId") VALUES ('There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour,', ${categories[0].id});
//     INSERT INTO articles(body, "categoryId") VALUES ('Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.', ${categories[2].id});
//     INSERT INTO articles(body, "categoryId") VALUES ('The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. ', ${categories[2].id});
//     INSERT INTO articles(body, "categoryId") VALUES ('It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.', ${categories[0].id});`;

//   await db.query(articlesInsertionQuery);
// });

// describe("GET /articles", () => {
//   it("should return every article and status 200", async () => {
//     const result = await agent.get("/articles");

//     expect(result.status).toBe(200);
//     expect(result.body.length).toBe(6);
//     expect(result.body[0]).toEqual(
//       expect.objectContaining({
//         body:
//           "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
//       })
//     );
//   });
// });

// describe("DELETE /articles/:id", () => {
//   it("should delete the article and return status 200", async () => {
//     const queryResult = await db.query("SELECT id FROM articles LIMIT 1");
//     const articleToBeDeleted = queryResult.rows[0];

//     const result = await agent.delete(`/articles/${articleToBeDeleted.id}`);
//     expect(result.status).toBe(200);
//   });
// });

// describe("GET /categories", () => {
//   it("should return every category and status 200", async () => {
//     const result = await agent.get("/categories");

//     expect(result.status).toBe(200);
//     expect(result.body.length).toBe(3);
//     expect(result.body[0]).toEqual(
//       expect.objectContaining({
//         name: "tech",
//       })
//     );
//   });
// });

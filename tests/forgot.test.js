require("dotenv").config();

const request = require("supertest");
const express = require("express");
const forgot = require("../server/api/forgot");
const mongoose = require("mongoose");

let connection;

beforeAll(async () => {
  connection = await require("../server/db-connection")();
});

afterAll(async () => {
  await mongoose.connection.close();
});

jest.mock("../server/models/User", () => ({
  findOne: () => {
    return Promise.resolve({
      _id: 12345,
      save: () => {}
    });
  }
}));

it("sends email to user to reset password", async () => {
  expect.assertions(1);

  const app = express();
  app.use(express.json());
  forgot(app);

  const response = await request(app)
    .post("/api/forgot")
    .send({ email: process.env.TESTEMAIL });
  expect(response.status).toBe(200);
});

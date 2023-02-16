import request from "supertest";
import supertest from "supertest";
import jwt from 'jsonwebtoken';
import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "../app.js";
import { expect, jest, test } from '@jest/globals';
import response from "supertest";
dotenv.config({
  path: "../.env"
});
import User from "../models/likesModel";
/* Connecting to the database before each test. */
jest.setTimeout(20000);
beforeEach(async () => {
  await mongoose.connect(process.env.MONGO_URI_TEST, {
    useNewUrlParser: true
  });
});
/* Closing database connection after each test. */
afterEach(async () => {
  await mongoose.connection.close();
});
describe('testing Login routes', () => {
  it('create  new user', done => {
    response(app).post('/api/signup').send({
      firstName: "okero",
      lastName: "Okeellojado",
      email: "jadorugirariallo@gmail.com",
      password: "jadaoo"
    }).expect(404);
    done();
  });
  it('it should not login without email and password', done => {
    const loginData = {};
    response(app).post('/api/signin').send({
      loginData
    }).expect(200);
    done();
  });
});
describe('Testing login routes', () => {
  let token = res.body.token;
  it('it should log in into system ', done => {
    chai.request(app).post('/api/signin').send({
      email: "jadorugirariallo@gmail.com",
      password: "jadaoo"
    }).end((err, res) => {
      res.should.have.status(200);
      //   res.body.should.have.property("message");
      //   res.body.should.have.property("data");
      token = res.body.token;
      done();
    });
  });
});
//# sourceMappingURL=user.test.js.map
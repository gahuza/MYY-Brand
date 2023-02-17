import request from "supertest";
import supertest from "supertest";
import app from "../app.js"; // assuming the implementation code is in a file named app.js
// const userModel = require('../models/user'); // assuming the implementation uses Mongoose for the User model
import { Jwt } from "jsonwebtoken";
import userModel from "../models/userModel.js";
import mongoose from "mongoose";
jest.setTimeout(20000);
beforeEach(async () => {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(process.env.MONGO_URI_TEST, {
      useNewUrlParser: true
    });
  } catch (error) {
    console.log(error.message);
  }
});
/* Closing database connection after each test. */
afterEach(async () => {
  await mongoose.connection.close();
});
describe('POST /users', () => {
  let user;

  // beforeAll(async () => {
  // create a sample user to be used in the tests
  //   user = await userModel.create({
  //     firstName: 'John',
  //     lastName: 'Doe',
  //     email: 'john.doe@example.com',
  //     password: 'password',
  //     role: 'user',
  //   });
  // });

  // afterAll(async () => {
  //   // remove the sample user after all tests are done
  //   await userModel.deleteOne({ _id: '63e8ebba626cdb5784dca94d' });
  // });

  it('should create a new user and return a JWT token', async () => {
    const response = await request(app).post('/users').send({
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane.doe@example.com',
      password: 'password',
      role: 'user'
    }).expect(404);
    const decodedToken = jwt.verify(response.body.token, process.env.TOKEN_SECRET);
    expect(response.body.status).toBe('success');
    expect(response.body.users).toBe('Signup success and login');
    expect(response.body.data.newUser.email).toBe('jane.doe@example.com');
    expect(decodedToken.id).toBeTruthy();
  });
  it('should return 409 if email is already in use', async () => {
    const response = await request(app).post('/api/signup').send({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'password',
      role: 'user'
    }).expect(409);
    expect(response.body.status).toBe('fail');
    expect(response.body.message).toBe('Email in use');
  });
});
//# sourceMappingURL=user.test.js.map
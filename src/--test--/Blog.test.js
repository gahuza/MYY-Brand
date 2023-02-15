import request from "supertest";
import supertest from "supertest";
import jwt from 'jsonwebtoken';
import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "../app.js";
import {expect, jest, test} from '@jest/globals';
import  response  from "supertest";
dotenv.config({ path: "../.env" });
import Query from "../models/Queries.model.js";
import Blog from "../models/Blogs.model.js";
import User from "../models/likesModel"
/* Connecting to the database before each test. */
jest.setTimeout(20000);
beforeEach(async () => {
  await mongoose.connect(process.env.MONGO_URI_TEST, { useNewUrlParser: true });
});
/* Closing database connection after each test. */
afterEach(async () => {
  await mongoose.connection.close();
});


// describe("GET /api/blogs", () => {
//   it('should respond with a 208 status code', (done) => {
//      response(app).get("/api/blogs")
//     expect(400).toBe(done)
//   })
// })


    // get by ID
    // describe("GET /api/v1/blogs/:id", () => {
    //   test('should respond with a 206 status code', async () => {
    //     const response = await request(app).get("/api/blogs/63e21c99208aa0b5bd58ff8f")
    //     expect(response.statusCode).toBe(200)
    //   })
    // })


describe("GET /api/v1/query", () => {
    test('should respond with a 203 status code', async () => {
      const response = await request(app).get("/api/query")
      expect(response.statusCode).toBe(203)
    })
  })

// //post

describe("create /api/query", () => {
    test('should respond with a 201 status code', async () => {
      const response = await request(app).post("/api/query").send({})
      expect(response.statusCode).toBe(201)
    })
  })
  //delete blo


  // describe('DELETE /api/blogs/:id', () => {
  //   it('return a 207 status if user is not logged in', async () => {
  //     const res = await request(app).delete('/api/blogs/:id').expect(res.status).toEqual(207);
  //   });})






  // describe("delete /api/query", () => {
  //   test('should respond with a 404 status code', async () => {
  //     const response = await request(app).delete("/api/query")
  //     expect(response.statusCode).toBe(404)
  //   })
  // })
  
  // describe("delete /api/query", () => {
  //   it('should delete a 207 status code', (done) => {
  //     response(app).delete("/api/query").expect(200);
  //  done();
  //   })
  // })
  describe("DELETE /api/query/:id", () => {
    it("should respond with a 207 status code", async () => {
      const response = await request(app).delete("/api/query/63de55283cbabcaf0123f51e")
      expect(response.statusCode).toBe(207);
    });
  });

 
  //delete


//delete query


    //update query

   
// get all blogs

describe("blog testing", () => {
  const blogData = {
    title: "okelloalan",
    body: "ways",
  }
  describe("GET /api/blogs", () => {
    test('should respond with a 200 status code', async () => {
      const response = await request(app).get("/api/blogs")
      expect(response.statusCode).toBe(200)
    })
  });
//update single blog
describe("UPDATE /api/blogs/:id", () => {
  it('should respond with a 400 status code', async () => {
    const response = await request(app).patch("/api/blogs/63e21c99208aa0b5bd58ff8f")
    .send(blogData)
    expect(response.statusCode).toBe(400)
  })
})
  //post blo
  describe("create /api/blogs", () => {
    it('Should respond with a 202 status code', async () => {
      const response = await request(app).post("/api/blogs")
        .send(blogData);
       expect(response.body.statusCode).toBe(202)
    })
  })
  //delete blog
  describe("DELETE /api/blogs/:id", () => {
    it("should respond with a 200 status code", async () => {
      const response = await request(app).delete("/api/blogs/63e21c99208aa0b5bd58ff8f")
      expect(response.statusCode).toBe(207);
    });
  });

  
})

//add all comments on blo

 //add comment
 
  describe('get all users', () => {
    const token =  process.env.TOKEN_SECRET

    it('get all users', async () => {
      const res = await request(app).get('/api/signin');
      expect(res.status).toEqual(200);
    });
    
    const userData = {
      email: "gahuza@gmail.com",
      password: "gahuza",
    }
    it('create user', async () => {
      const res = await (await request(app).post('/api/signup'));
      expect(res.status).toEqual(409);
    });
    it('delete user', async () => {
      const res = await (await request(app).delete('/api/signIn/63de55283cbabcaf0123f51e'));
      expect(res.status).toEqual(207);
    });

    describe("UPDATE /api/user/:id", () => {
      it('should respond with a 400 status code', async () => {
        const response = await request(app).patch("/api/signIn/63e21c99208aa0b5bd58ff8f")
        .send(userData)
        expect(response.statusCode).toBe(404)
      })
    })
});

    //get single blog

   //add comment
   describe('POST /blogs/:id/comments', () => {
    it('return a 401 status if user is not logged in', async () => {
      const res = await request(app).post('/api/blogs/').send({});
      expect(res.status).toEqual(500);
    });
  
   
  })
  describe("GET /api/comment", () => {
    test('should respond with a 200 status code', async () => {
      const response = await request(app).get("/api/comments/63e373de2ffaef80bcc03c95")
      expect(response.statusCode).toBe(200)
    })
  
  })


   //add or remove like
   describe('POST /blogs/:id/likes', () => {
    it('return a 401 status if user is not logged in', async () => {
      const res = await request(app).post('/api/blogs/').send({});
      expect(res.status).toEqual(401);
    });
    it("return a 400 status if blog doesn't exist", async () => {
      const user = {
        email: 'gahuza@gmail.com',
        password: 'gahuza',
      };

      const login = await request(app).post('/api/login').send(user);
      const token = login.body.token;
      const allBlogs = await request(app).get('/api/blogs');
      const currentBlog = allBlogs.body.data[0];
      const id = currentBlog._id;
      const updatedBlog = await request(app)
        .post(`/api/${id + 1}/likes`)
        .set('auth' + token);
      expect(updatedBlog.status).toEqual(400);
      const message = updatedBlog.body.message;
      expect(message).toEqual("Blog doesn't exist!");
    });})
import request from "supertest";
import supertest from "supertest";
import jwt from 'jsonwebtoken';
import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "../app.js";
import {expect, jest, test} from '@jest/globals';
import  response  from "supertest";
dotenv.config({ path: "../.env" });
// import Query from "../models/Queries.model.js";
// import Blog from "../models/Blogs.model.js";
// import User from "../models/likesModel"
/* Connecting to the database before each test. */
jest.setTimeout(20000);
beforeEach(async () => {
  await mongoose.connect(process.env.MONGO_URI_TEST, { useNewUrlParser: true });
});
/* Closing database connection after each test. */
afterEach(async () => {
  await mongoose.connection.close();
});





describe("GET /api/v1/query", () => {
    test('should respond with a 203 status code', async () => {
      const response = await request(app).get("/api/query/get")
      expect(response.statusCode).toBe(203)
    })
  })

// //post

describe("create /api/query", () => {
    test('should respond with a 201 status code', async () => {
      const response = await request(app).post("/api/query/send").send({})
      expect(response.statusCode).toBe(201)
    })
  })
  //delete blo


  // describe('DELETE /api/blogs/:id', () => {
  //   it('return a 207 status if user is not logged in', async () => {
  //     const res = await request(app).delete('/api/blogs/:id').expect(res.status).toEqual(207);
  //   });})


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
  describe("GET /api/blogss", () => {
    test('should respond with a 200 status code', async () => {
      const response = await request(app).get("/api/blogs")
      expect(response.statusCode).toBe(200)
    })
  });
  //by id
  describe("GET /api/blogss", () => {
    test('should respond with a 404 status code', async () => {
      const response = await request(app).get("/api/blogs/63e8c634d7a3542707a55caa")
      expect(response.statusCode).toBe(200)
    })
  });
//update single blog
describe("UPDATE /api/blogs/:id", () => {
  it('should respond with a 400 status code', async () => {
    const response = await request(app).patch("/api/blogs/:id")
    .send(blogData)
    expect(response.statusCode).toBe(400)
  })
})
  //post blo
  describe("create /api/blogs", () => {
    it('Should respond with a 200 status code', async () => {
      const response = await request(app).post("/api/blogs")
        .send(blogData);
       expect(response.body.statusCode).toBe(200)
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
    it('create  new user', async () => {
      const res = await (await request(app).post('/api/signup'));
      expect(res.status).toEqual(200);
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
      const res = await request(app).post('/api/blogs/comments/63e373de2ffaef80bcc03c95').send({});
      expect(res.status).toEqual(401);
    });
  
   
  })
  describe("GET /api/comment", () => {
    test('should respond with a 200 status code', async () => {
      const response = await request(app).get("/api/comments/63e373de2ffaef80bcc03c95")
      expect(response.statusCode).toBe(404)
    })
  
  })


   //add or remove like
   describe('POST /blogs/:id/likes', () => {
    it('return a 500 status if user is not logged in', async () => {
      const res = await request(app).post('/api/blogs/63e373de2ffaef80bcc03c95/likes').send({});
      expect(res.status).toEqual(401);
    });
    describe("GET /api/likes", () => {
      test('should respond with a 404 status code', async () => {
        const response = await request(app).get("/api/blogs/63e373de2ffaef80bcc03c95/likes")
        expect(response.statusCode).toBe(404)
      })
    
    })

    it("return a 400 status if blog doesn't exist", async () => {
      const user = {
        email: 'gahuza@gmail.com',
        password: 'gahuza',
      };

      const login = await request(app).post('/api/signin').send(user);
      const token = login.body.token;
      const allBlogs = await request(app).get('/api/blogs/63e373de2ffaef80bcc03c95/likes');
      const currentBlog = allBlogs.body.data[0];
      const id = currentBlog._id;
      const updatedBlog = await request(app)
        .post(`/api/blogs/${id + 1}/likes`)
        .set('auth' + token);
      expect(updatedBlog.status).toEqual(401);
      const message = updatedBlog.body.message;
      expect(message).toEqual("Blog doesn't exist!");
    });
  
  
  })


   
         // add comment
  
  // get all comments
  // describe('GET /blogs/:id/comments', () => {
  //   it("return a 400 status if '_id' is invalid", async () => {
  //     const res = await request(app).get('/api/blogs/23333/comments');
  //     expect(res.status).toEqual(400);
  //     const message = res.body.message;
  //     expect(message).toEqual("Blog doesn't exist");
  //   });
  //   it('return one blog', async () => {
  //     const allBlogs = await request(app).get('/api/blogs');
  //     const currentBlog = allBlogs.body.data[0];
  //     const id = currentBlog._id;
  //     const res = await request(app).get(`/api/blogs/${id}/comments`);
  //     expect(res.status).toEqual(200);
  //   });
  // });
  
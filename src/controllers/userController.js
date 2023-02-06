// import { validationResult } from "express-validator";
import { Users } from "../models/userModel.js";
// import  Jwt  from "jsonwebtoken";
// const signInToken = (id) => {};


export const register = async(req,res) => {
     const { email, name, password, repassword } = req.body;
    try {
        let user = await Users.findOne({ email });
        if(user) throw {code:11000};
         user = new Users({email, name, password, repassword})
        await user.save();
        //user token
        return res.status(201).json({ok:'registered'});
    } catch (error) {
        console.log(error); 
        if (error.code === 11000){
     return res.status(400).json({error:' Already exist user'});
        }
    }

    }

export const login = async(req,res) => {
    const { email,password } = req.body;
    try {
        let user = await Users.findOne({ email });
        if (!user)  return res.status(403).json({error:' Noo exist user'});

        const requestuser = await user.comparePassword( password );
        if( !requestuser ){
            return res.status(403).json({error:' password incorrect'});
        }
        res.json({ ok: "well login" });
    } catch (error) {
        console.log(error); 
        return res.status(500).json({error:' error occured'});
    }
    

    }


  export  const findUsers = async(req,res) =>{
        const useries = await Users.find();
        res.send(useries);
      }
    


      class userController {
    //   static async deleteOne(req, res) {
    //     const user = await Users.findById(req.params.id);
    //     if (!user) {
    //       return res.status(404).json({
    //         status: 'fail',
    //         message: 'user not found',
    //       });
    //     }
    //     try {
    //       await Users.findOneAndDelete({ _id: req.params.id });
    //       res.status(200).json({
    //         status: 'success',
    //         users: 'Delete user successfully done',
    //       });
    //     } catch (error) {
    //       res.status(204).json({
    //         status: 'error',
    //         error: 'Delete failed',
    //       });
    //     }
    //   }

    }

    export const updateuser= async (req, res) => {
        try {
          const  useries = await Users.findOne({ _id: req.params.id });
      
          if (req.body. email) {
            useries.email = req.body.email;
          }
      
          if (req.body. name) {
            useries.name = req.body. name;
          }
      
          await  useries.save();
          res.send( useries);
        } catch {
          res.status(404);
          res.send({ error: "Post doesn't exist!" });
        }
      };

      export const deleteuser = async (req, res) => {
        try {
            const  useries = await Users.deleteOne({ _id: req.params.id });
          res.status(204).send();
        } catch {
          res.status(404);
          res.send({ error: "user doesn't exist!" });
        }
      }
    // export default userController;
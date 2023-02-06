import  express  from "express";
import {login, register, findUsers,updateuser,deleteuser } from "../controllers/userController.js";
// import { httpCreateMovie , findQueri} from "../controllers/query.controller.js";
import { body } from "express-validator";
import { validationResultExpress } from "../middleware/validationResult.js";
// import userController  from "../controllers/userController.js";

const userRouter= express.Router();

userRouter.post('/register',[
    body('email','Email is incorrect').trim().isEmail().normalizeEmail(),
    body('name','too wrong password').trim(),
    body('password','require more 6 characters').trim().isLength({min:7}).custom(
        (value, {req}) =>{
            if(value !==req.body.repassword){
                throw new Error('password dismatches')
            }
            return value;
        }
    ),
    
],
validationResultExpress,
register)
userRouter.post('/login',[
    body('email','Email is incorrect').trim().isEmail().normalizeEmail(),
    body('password','require more 6 characters').trim().isLength({min:7})
],
validationResultExpress,
login)

userRouter.patch('/register/:id',updateuser);
userRouter.delete('/register/:id',deleteuser);
userRouter.get('/register',  findUsers);

 export default userRouter;
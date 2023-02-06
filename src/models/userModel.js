import  mongoose from "mongoose";
import bcrptjs from "bcryptjs"

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        trim:true,
        unique: true,
        lowercase:true
    },
    name:{
        type:String,
        required:true,
        trim:true,
        unique: true,
        lowercase:true 
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    repassword:{
    type:String,
     required:true,  
    }
})
    userSchema.pre("save", async function(next){
        const users =this;
        if( !users.isModified("password"))return next();
        try {
            const salt = await bcrptjs.genSalt(10);
            users.password =await bcrptjs.hash(users.password, salt);
            next();
        } catch (error) {
            console.log(error);
            throw new Error(' incorrect hash');
            
        }

    });


    userSchema.methods.comparePassword = async function(candidatePassword){
        return await bcrptjs.compare(candidatePassword,this.password);
    };

    export const Users = mongoose.model("Users",userSchema)
import Blog from "../models/Blogs.model.js";

// import blogImage from "../helpers/imageUpload.js";


import cloudinary  from 'cloudinary';
import   dotenv  from "dotenv"

dotenv.config()
// import uploader from '../config/cloudinary';
cloudinary.v2;

cloudinary.config({
        cloud_name:"dtxq2qcox",
        api_key: "172566471358293",
        api_secret: "qF01khiT0k3xKyn8ixefLfAlbHE",
      });


export const createBlog = async function(req, res){
    console.log("AASASASASA", req.body)
    try {
        // if(req.files) {
            
            const image = await cloudinary.uploader.upload(req.file.path);
            // }
               const blog= await new Blog({
                    title:req.body.title,
                    body:req.body.body,
                    image: image.secure_url,
                })
             
            blog.save()
            .then(result=>{
                console.log(result);
                res.json(result)
            })
            .catch(error=>console.log(error))

    
    }
    catch (err) {
        res.status(500).json(err)
        console.log(err)
    }

};
export const findblog = async(req,res) =>{
    const blogs = await Blog.find();
    res.send(blogs);
  }
  export const findblogbyid = async(req,res) =>{
    const blogs = await Blog.findById({_id: req.params.id});
    res.send(blogs);
  }

  export const deleteblog = async (req, res) => {
    try {
        const  blogs = await Blog.deleteOne({ _id: req.params.id });
      res.status(207).send({ok:'delete success'});
    } catch {
      res.status(406);
      res.send({ error: "blog doesn't exist!" });
    }
  }

  export const addComment = async (req, res) => {
    try {
      const blog = await Blog.findOne({ _id: req.params.id });
      if (!blog) {
        res
          .status(404)
          .json({ status: 404, success: false, message: "Blog doesn't exist" });
        return;
      } else {
        blog.comments = [
          ...blog.comments,
          { comment: req.body.comment, user: req.user, blog: blog },
        ];
        blog.save();
        res.status(201).json({
          success: true,
          message: `Comment added`,
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: `Server Error: Error when adding comment ${error.message}`,
      });
      console.log(`Error while adding comment ${error.message}`);
    }
  };
  
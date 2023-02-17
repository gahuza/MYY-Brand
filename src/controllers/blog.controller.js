import Blog from "../models/Blogs.model.js";
import  { commentSchema } from "../models/commentmod.js";
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
                res.status(201).send({ok:'add  successfully'});
            })
            .catch(error=>console.log(error))

    
    }
    catch (err) {
        res.status(500).json(err)
        console.log(err)
    }

};
// export const getAllBlogs = async(req,res) =>{
//     const blogs = await Blog.find();
//     res.send(blogs);
//   }


  // export const getAllBlogs = async (req, res) => {
  //   try {
  //   const blogs = await Blog.find();
  //   return res.status(200).json({
  //   status: "success",
  //   number: blogs.length,
  //   blogs,
  //   });
  //   } catch (error) {
  //   return res.status(500).json({
  //   status: "failed",
  //   error: error.message,
  //   });
  //   }
  //   };
    export const getAllBlogs = async (req, res) => {
      const blogs = await Blog.find();
      res.status(200).json({ status: 200, success: true, data: blogs });
    };
    


  // export const getBlogById = async(req,res) =>{
  //   const blogs = await Blog.findById({_id: req.params.id});
  //   res.send(blogs);
  // }


  export const getBlogById = async (req, res) => {
    try {
    const blogs = await Blog.findById({_id: req.params.id});
    return res.status(200).json({
    status: "success",
    number: blogs.length,
    blogs,
    });
    } catch (error) {
    return res.status(404).json({
    status: "failed",
    error: error.message,
    });
    }
    };



  export const deleteBlog = async (req, res) => {
    try {
     await Blog.deleteOne({ _id: req.params.id });
      res.status(207).send({ok:'delete success'});
    } catch {
      res.status(406);
      res.send({ error: "blog doesn't exist!" });
    }
  }

  export const updateSingleBlog = async (req, res) => {
    try {
      const blog = await Blog.findOne({ _id: req.params.id });
  
      if (req.body.title) {
        blog.title = req.body.title;
      }
      if (req.body.body) {
        blog.body = req.body.body;
      }
      if (req.file) {
        blog.image = req.file.path;
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: 'portfolio/blogImages',
          public_id: `${blog.title}_image`,
        });
        blog.image = result.url;
      }
      await blog.save();
      res.status(201).json({
        status: 201,
        success: true,
        message: 'Blog updated',
        data: blog,
      });
    } catch (err) {
      res
        .status(400)
        .json({ status: 400, success: false, message: "Blog doesn't exist" });
    }
  };


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
  export const getAllComments = async (req, res) => {
    try {
      const blog = await Blog
        .findOne({ _id: req.params.id })
        .populate({
          path: 'comments.user',
          model: 'User',
          select: 'username',
        })
        .populate({ path: 'comments.blog', model: 'Blog', select: 'title' });
      if (!blog) {
        res.status(404).json({ error: "Blog doesn't exist" });
        return;
      }
  
      res.status(200).send(blog.comments);
    } catch {
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  export const like = async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id);
      if (!blog) {
        return res.status(404).send({
          statusCode: 404,
          success: false,
          data: { message: 'Blog not found!' },
        });
      }
      //check if the blog is already liked
      const alreadyLiked = blog.likes.find(
        (like) => like.user.toString() === req.user._id.toString(),
      );
      //unlike the blog
      if (alreadyLiked) {
        blog.likes = blog.likes.filter(
          (like) => like.user.toString() !== req.user._id.toString(),
        );
      } else {
        blog.likes.push({
          user: req.user._id,
          blog: req.params.blogId,
        });
      }
      await blog.save();
      res.status(201).json({
        statusCode: 201,
        success: true,
        data: [{ message: 'Done', body: blog }],
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: `Server Error: Error when liking or disliking ${error.message}`,
      });
    }
  };
 export const likesCounting = async (req, res) => {
    try {
      const blog = await Blog.findOne({ _id: req.params.id });
      if (!blog) {
        res
          .status(404)
          .json({ status: 404, success: false, message: "Blog doesn't exist" });
      } else {
        res.status(200).json({
          status: 200,
          success: true,
          message: `Number of likes: ${blog.likes.length}`,
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: `Server Error: Error when fetching likes ${error.message}`,
      });
    }
  };
  

 
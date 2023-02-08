import  express  from "express";
import multer  from "multer"
import path  from "path"
import { createBlog , findblog , deleteblog ,findblogbyid, addComment  }  from "../controllers/blog.controller.js";
import { auth } from "../middleware/auth.js";
import { commentsSchema } from "../middleware/validation.js";
import validate from "../middleware/validation.middleware.js";
import { getAllUsers ,getAllUsersById, deleteSingleUserById} from "../controllers/userController.js";
const blogRouter= express.Router();

var upload = multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => {
      let ext = path.extname(file.originalname);
        if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
        cb(new Error("File type is not supported"), false);
        return;
      }
      cb(null, true);
    },
  });



blogRouter.post('/blogs',upload.single("image"),createBlog);

 blogRouter.get('/blogs',findblog)
 blogRouter.get('/signIn',getAllUsers)
 blogRouter.get('/blogs/:id',findblogbyid)
 blogRouter.get('/signIn/:id',getAllUsersById)
blogRouter.delete('/blogs/:id',deleteblog)
blogRouter.delete('/signIn/:id',deleteSingleUserById)
// blogRouter.patch('/blogs/:id',updateBlog)
blogRouter.post(
  '/blogs/:id/comments',
  [auth, validate(commentsSchema)],
  addComment,
);
 export default blogRouter;
import  express  from "express";
import { httpCreateMovie , findQueri, deletequery} from "../controllers/query.controller.js";

const apiRouter= express.Router();

apiRouter.get('/query',findQueri)

apiRouter.post('/query',httpCreateMovie)

apiRouter.delete('/query/:id',deletequery)
 export default apiRouter;
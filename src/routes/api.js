import  express  from "express";
import { httpCreateQuery , findQueri, deletequery} from "../controllers/query.controller.js";

const apiRouter= express.Router();

apiRouter.get('/query',findQueri)

apiRouter.post('/query',httpCreateQuery)

apiRouter.delete('/query/:id',deletequery)
 export default apiRouter;
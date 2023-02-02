const express = require("express")
const Queri = require("./models/query") // new
const router = express.Router()

// Get all posts
router.get("/queries", async (req, res) => {
	// const queries = await Queri.find()
	// res.send(queries)
    try{
		const queries = await Queri.find()
		if(!queries)return res.send("no queries found ")
		res.send(queries)
	}catch(err){
		res.send(err.message)
	}
})

router.get("/queries/:id", async (req, res) => {
    try{
		const queryo = await Queri.findOne({ _id: req.params.id })
		if(!queryo)return res.send("no query found ")
	res.send(queryo)

	}
	catch(err){
		res.send(err.message)
	}
})

router.post("/queries", async (req, res) => {
	const query = new Queri({
        Name: req.body.Name,
        Email: req.body.Email,
        Comment: req.body.Comment,
		
	})
	await query.save()
	res.send(query)
})

router.patch("/queries/:id",async(req,res) =>{
    try{
        const queri = await Queri.findOne({ _id: req.params.id })
        if(req.body.Name){
            queri.body = req.body.name
        }
        if(req.body.Email){
            queri.Email =req.body.Email
        }
        if(req.body.Comment){
            queri.Comment = req.body.Comment
        }
        await queri.save()
        res.send(queri)
    }
    catch{
        res.status(404)
        res.send({error:' query not found'})
    }
})

router.delete("/queries/:id", async(req,res) =>{
	try{
		 await Queri.deleteOne({ _id: req.params.id })
         res.status(204).send()
	}
    catch{
        res.status(404)
        res.send({error:' query not exist'})
    }
})
module.exports = router
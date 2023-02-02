
const express = require("express")
const Blog = require("./models/Blog") // new
const router = express.Router()

// Get all posts
router.get("/blogs", async (req, res) => {

	try{
		const blogs = await Blog.find()
		if(!blogs)return res.send("no blogs found ")
		res.send(blogs)
	}catch(err){
		res.send(err.message)
	}
})
router.get("/blogs/:id", async (req, res) => {
	try{
		const blog = await Blog.findOne({ _id: req.params.id })
		if(!blog)return res.send("no blogs found ")
	res.send(blog)

	}
	catch(err){
		res.send(err.message)
	}
	
})
router.post("/blogs", async (req, res) => {
	const blog = new Blog({
		title: req.body.title,
		content: req.body.content,
	})
	await blog.save()
	res.send(blog)
})

router.patch("/blogs/:id", async (req, res) => {
	try {
		const blog = await Blog.findOne({ _id: req.params.id })

		if (req.body.title) {
			blog.title = req.body.title
		}

		if (req.body.content) {
			blog.content = req.body.content
		}

		await blog.save()
		res.send(blog)
	} catch {
		res.status(404)
		res.send({ error: "Blog doesn't exist!" })
	}
})

router.delete("/blogs/:id", async(req,res) =>{
	try{
		 await Blog.deleteOne({ _id: req.params.id })
         res.status(204).send()
	}
    catch{
        res.status(404)
        res.send({error:' Blog not exist'})
    }
})
module.exports = router
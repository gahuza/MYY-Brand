
const express = require("express")
const Blog = require("./models/Blog") // new
const router = express.Router()

// Get all posts
router.get("/blogs", async (req, res) => {
	const blogs = await Blog.find()
	res.send(blogs)
})
router.post("/blogs", async (req, res) => {
	const blog = new Blog({
		title: req.body.title,
		content: req.body.content,
	})
	await blog.save()
	res.send(blog)
})

module.exports = router
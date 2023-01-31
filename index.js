const express = require("express")
const mongoose = require("mongoose") // new
const routes = require("./routes")

// Connect to MongoDB database
mongoose
	.connect("mongodb+srv://okero:jado@Cluster0.e7fvput.mongodb.net/test", { useNewUrlParser: true })
	.then(() => {
		const app = express()   
        app.use(express.json())
		app.use("/api", routes) 
		app.listen(5000, () => {
			console.log("Server has started!")
		})
	})
const express = require("express")
const mongoose = require("mongoose") // new
const routes = require("./routes")
const route =require("./route")

// Connect to MongoDB database
mongoose
	.connect("mongodb+srv://okero:jado@cluster0.e7fvput.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true })
	.then(() => {
		const app = express()   
        app.use(express.json())
		app.use("/api", routes) 
		app.use("/apii",route)
		app.listen(5000, () => {
			console.log("Server has started!")
		})
	})
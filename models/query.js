const mongoose = require("mongoose")

const schemaa = mongoose.Schema({
	Name: String,
	Email: String,
    Comment: String,
})

module.exports = mongoose.model("query", schemaa)


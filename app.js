require("dotenv").config()

var express = require("express")
var app = express()
var bodyParser = require("body-parser")
var mongoose = require("mongoose")


var blogRoutes = require("./routes/blogs")
var indexRoutes = require("./routes/index")

var MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

app.set("view engine", "ejs")
app.use(express.static(__dirname + "/public"))
app.use(bodyParser.urlencoded({extended: true}))


app.use("/", indexRoutes);
app.use("/blogs", blogRoutes);

app.listen(process.env.PORT || 3000, () => console.log("Blog_App has started"))
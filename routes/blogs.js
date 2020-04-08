var express = require("express");
var router = express.Router();
var Blog = require("../models/blog");


router.get("/", (req, res) => {
    Blog.find({}, (err, blogs) => {
        if(err){
            console.log("ERROR!")
        } else {
            res.render("index", { blogs: blogs })
        }
    })
})

router.get("/new", (req, res) => {
    res.render("new")
})

router.get("/", (req, res) => {
    Blog.creaet(req.body.blog, (err, newBlog) => {
        if(err){
            res.render("new")
        } else {
            res.redirect("/blogs")
        }
    })})


module.exports = router;
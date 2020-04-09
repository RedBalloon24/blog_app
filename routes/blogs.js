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

router.post("/", (req, res) => {
    Blog.create(req.body.blog, (err, newBlog) => {
        if(err){
            res.render("new")
        } else {
            console.log(newBlog)
            res.redirect("/blogs")
        }
    })
})


router.get("/:id", (req, res) => {
    Blog.findById(req.params.id, (err, foundBlog) => {
        if(err){
            res.redirect("/blogs")
        } else {
            res.render("show", { blog: foundBlog })
        }
    })
})


module.exports = router;
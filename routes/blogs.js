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
    req.body.blog.body = req.sanitize(req.body.blog.body)

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

router.get("/:id/edit", (req, res) => {
    Blog.findById(req.params.id, (err, foundBlog) => {
        if(err){
            res.redirect("/")
        } else {
            res.render("edit", { blog: foundBlog })
        }
    })
})

router.put("/:id", (req, res) => {
    req.body.blog.body = req.sanitize(req.body.blog.body)

    Blog.findByIdAndUpdate(req.params.id, req.body.blog, (err, updatedBlog) => {
        if(err){
            res.redirect("/blogs")
        } else {
            res.redirect("/blogs/" + req.params.id)
        }
    })
})

router.delete("/:id", (req, res) => {
    Blog.findByIdAndRemove(req.params.id, (err) => {
        if(err){
            res.redirect("/blogs")
        } else {
            res.redirect("/blogs/")
        }
    })
})


module.exports = router;
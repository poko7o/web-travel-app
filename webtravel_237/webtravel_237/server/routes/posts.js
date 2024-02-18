const router = require("express").Router();
const Post = require("../models/Post");
const Comment = require("../models/Comment");

router
  .post("/", async (req, res) => {
    const newPost = new Post(req.body);
    try {
      const savedPost = await newPost.save();
      res.status(200).json(savedPost);
    } catch (error) {
      res.status(500).json(error);
    }
  })
  .post("/:id/comment", async (req, res) => {
    const post = await Post.findById({ _id: req.params.id });
    const newComment = new Comment({
      username: req.body.username,
      comment: req.body.comment,
      blog: req.params.id,
    });
    await newComment.save();

    try {
      const updatedPost = await Post.findByIdAndUpdate(
        req.params.id,
        //   { $set: req.body },
        { $push: { comments: newComment.comment } },
        { new: true }
      );
      res.status(200).json(updatedPost);
    } catch (error) {
      res.status(500).json(error);
    }
  })
  .put("/:id", async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (error) {
        res.status(500).json(error);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  })
  .delete("/:id", async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      try {
        await post.delete();
        res.status(200).json("Post has been deleted");
      } catch (error) {
        res.status(500).json(error);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  })
  .get("/:id", async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json(error);
    }
  })
  .get("/", async (req, res) => {
    const username = req.query.user;
    const category = req.query.cat;

    try {
      let posts;
      // if username has been queried
      if (username) {
        // if username property in Post model matches username that is queried, can be written as username:username
        posts = await Post.find({ username });
      } else if (category) {
        posts = await Post.find({
          //if(there is category inside categories array find those posts)
          categories: {
            $in: [category],
          },
        });
      } else {
        posts = await Post.find();
      }
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json(error);
    }
  });

module.exports = router;

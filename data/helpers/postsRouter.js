const express = require('express');

const Posts = require('./postDb.js');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const posts = await Posts.get();
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error"
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const post = await Posts.getById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error"
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const newPost = await Posts.insert(req.body);
    res.status(201).json(newPost);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error"
    });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const update = await Posts.update(req.params.id, req.body);
    if (update) {
      res.status(203).json({
        message: "Post Updated"
      });
    } else {
      res.status(404).json({
        message: "Post Not Found"
      });
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "Server Error"
    });
  }
});

router.delete('/:id', async (req, res) => {
  try{
    const deletePost = await Posts.remove(req.params.id);
    if(deletePost){
      res.status(200).json({message: "Post Deleted"})
    }
    else {
      res.status(404).json({message: "Not Found"})
    }
  } catch (error){
    console.log(error);
    res.status(500).json({message: "Server Error"})
  }
});

module.exports = router;
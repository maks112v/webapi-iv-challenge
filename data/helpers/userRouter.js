const express = require('express');

const Users = require('./userDb.js');

const router = express.Router();


function upperCase(req, res, next) {
  req.body.name = req.body.name.toUpperCase();
  next();
}

router.get('/', async (req, res) => {
  try {
    const users = await Users.get();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error"
    });
  }
});

router.get('/:id/posts', async (req, res) => {
  try {
    const userPosts = await Users.getUserPosts(req.params.id);
    res.status(200).json(userPosts);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error"
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const users = await Users.getById(req.params.id);
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error"
    });
  }
});

router.post('/', upperCase, async (req, res) => {
  try {
    const newUser = await Users.insert(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error"
    });
  }
});

router.put('/:id', upperCase, async (req, res) => {
  try {
    const update = await Users.update(req.params.id, req.body);
    if (update) {
      res.status(203).json({
        message: "User Updated"
      });
    } else {
      res.status(404).json({
        message: "User Not Found"
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
  try {
    const deleteUser = await Users.remove(req.params.id);
    if (deleteUser) {
      res.status(200).json({
        message: "User Deleted"
      })
    } else {
      res.status(404).json({
        message: "Not Found"
      })
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error"
    });
  }
});

module.exports = router;
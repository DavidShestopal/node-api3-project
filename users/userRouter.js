const express = require('express');

const User = require('./userDb');
const Post = require('../posts/postDb');

const router = express.Router();

router.post('/', validateUser, (req, res) => {
  // do your magic!
  User.insert(req.body)
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ messsage: "Error couldn't add the user." });
    });
});

router.post('/:id/posts', validatePost, (req, res) => {
  // do your magic!
  Post.insert(req.body)
    .then((userPost) => {
      res.status(201).json(userPost);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ messsage: 'Error adding the post.' });
    });
});

router.get('/', (req, res) => {
  // do your magic!
  User.get()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Error couldn't add the user." });
    });
});

router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
  User.getById(req.params.id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Error couldn't add the user." });
    });
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
  Post.getById(req.params.id)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: 'Error retrieving the posts.' });
    });
});

router.delete('/:id', (req, res) => {
  // do your magic!
  User.remove(req.params.id)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({ message: 'The user has been nuked' });
      } else {
        res.status(404).json({ message: 'The user could not be found' });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: 'Error removing the user',
      });
    });
});

router.put('/:id', validateUserId, (req, res) => {
  // do your magic!
  User.update(req.params.id, req.body)
    .then((user) => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: 'The user could not be found' });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: 'Error updating the user',
      });
    });
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  User.getById(req.params.id).then((user) => {
    if (user) {
      req.user = user;
    } else {
      res.status(400).json({ message: 'invalid user id' });
    }
  });
  next();
}

function validateUser(req, res, next) {
  if (!req.body) {
    res.status(400).json({ message: 'missing user data' });
  } else if (req.body.name === '') {
    res.status(400).json({ message: 'missing required name field' });
  } else {
    next();
  }

  // do your magic!
}

function validatePost(req, res, next) {
  if (!req.body) {
    res.status(400).json({ message: 'missing post data' });
  } else if (req.body.name === '') {
    res.status(400).json({ message: 'missing required text field' });
  } else {
    next();
  }

  // do your magic!
}

module.exports = router;

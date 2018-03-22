const mongoose = require('mongoose');
const Book = require('../models/book_model.js');

export const createPost = (req, res) => {
  console.log('request user:');
  console.log(req.user.username);
  const newPost = {
    title: req.body.title ? req.body.title : 'undefined',
    tags: req.body.tags ? req.body.tags : '',
    cover_url: req.body.cover_url ? req.body.cover_url : '',
    content: req.body.content ? req.body.content : '',
    author: req.user.username,
  };
  console.log(`newPost authorName: ${newPost.author}`);
  const post = new Post(newPost);
  post.save()
    .then((result) => {
      res.json(post);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

const cleanPosts = (posts) => {
  return posts.map((post) => {
    console.log(`username? ${post.author}`);
    return {
      id: post._id, title: post.title, tags: post.tags, cover_url: post.cover_url, author: post.author,
    };
  });
};

export const getPosts = (req, res) => {
  Post.find({})
    .then((result) => {
      const newClean = cleanPosts(result);
      res.json(newClean);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};


export const getPost = (req, res) => {
  console.log('in getPost server');
  Post.findById(req.params.someID)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};


export const deletePost = (req, res) => {
  console.log('in deletePost server');
  Post.remove({ _id: req.params.someID })
    .then((result) => {
      console.log('successfully deleted the result');
      res.json();
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};


export const updatePost = (req, res) => {
  console.log('in updatePost server');

  Post.findById(req.params.someID)
    .then((post) => {
      console.log('found an individual post updatePost');
      post.title = req.body.title;
      post.cover_url = req.body.cover_url;
      post.content = req.body.content;
      post.tags = req.body.tags;
      post.save();
      return (post);
    })
    .then((post1) => {
      console.log('successfully updated the result');
      res.json({ post: post1 });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

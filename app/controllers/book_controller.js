const mongoose = require('mongoose');
const Book = require('../models/book_model.js');

const createBook = (req, res) => {
  console.log('createBook');
  const newBook = {
    title: req.body.title ? req.body.title : undefined,
    author: req.body.author ? req.body.author : '',
    publisher: req.body.publisher ? req.body.publisher : '',
    publish_place: req.body.publish_place ? req.body.publish_place : '',
    id_goodreads: req.body.id_goodreads ? req.body.id_goodreads : undefined,
    isbn: req.body.isbn ? req.body.isbn : undefined,
    ratings: req.body.ratings ? req.body.ratings : 0,
    reviews: req.body.reviews ? req.body.reviews : 0,
    average_rating: req.body.average_rating ? req.body.average_rating : undefined,
    first_publish_year: req.body.first_publish_year ? req.body.first_publish_year : undefined,
  };
  const book = new Book(newBook);
  book.save()
    .then((result) => {
      res.json(book);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

const getBooks = (req, res) => {
  console.log('getBooks');
  Book.find({})
    .then((result) => {
      console.log('result of getting book: ', result);
      //  const newClean = cleanBooks(result);
      res.json(result);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

module.exports = { createBook, getBooks };
//
// const cleanPosts = (posts) => {
//   return posts.map((post) => {
//     console.log(`username? ${post.author}`);
//     return {
//       id: post._id, title: post.title, tags: post.tags, cover_url: post.cover_url, author: post.author,
//     };
//   });
// };
//
// export const getPosts = (req, res) => {
//   Post.find({})
//     .then((result) => {
//       const newClean = cleanPosts(result);
//       res.json(newClean);
//     })
//     .catch((error) => {
//       res.status(500).json({ error });
//     });
// };
//
//
// export const getPost = (req, res) => {
//   console.log('in getPost server');
//   Post.findById(req.params.someID)
//     .then((result) => {
//       res.json(result);
//     })
//     .catch((error) => {
//       res.status(500).json({ error });
//     });
// };
//
//
// export const deletePost = (req, res) => {
//   console.log('in deletePost server');
//   Post.remove({ _id: req.params.someID })
//     .then((result) => {
//       console.log('successfully deleted the result');
//       res.json();
//     })
//     .catch((error) => {
//       res.status(500).json({ error });
//     });
// };
//
//
// export const updatePost = (req, res) => {
//   console.log('in updatePost server');
//
//   Post.findById(req.params.someID)
//     .then((post) => {
//       console.log('found an individual post updatePost');
//       post.title = req.body.title;
//       post.cover_url = req.body.cover_url;
//       post.content = req.body.content;
//       post.tags = req.body.tags;
//       post.save();
//       return (post);
//     })
//     .then((post1) => {
//       console.log('successfully updated the result');
//       res.json({ post: post1 });
//     })
//     .catch((error) => {
//       res.status(500).json({ error });
//     });
// };

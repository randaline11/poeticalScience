const mongoose = require('mongoose');
const Book = require('../models/book_model.js');

const getBooks = (req, res) => {
  console.log('getBooks');
  Book.find({})
    .then((result) => {
      console.log('result of getting book: ', result);
      res.json(result);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

const getBookLocalByTitle = (params) => {
  console.log('getBookLocalByTitle');
  return new Promise((fulfill, reject) => {
    Book.findOne({ title: params.title })
      .then((result) => {
        fulfill(result);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const createBookLocal = (params) => {
  console.log('createBookLocal');
  return new Promise((fulfill, reject) => {
    const newBook = {
      title: params.title ? params.title : undefined,
      author: params.author ? params.author : '',
      publisher: params.publisher ? params.publisher : '',
      publish_place: params.publish_place ? params.publish_place : '',
      id_goodreads: params.id_goodreads ? params.id_goodreads : undefined,
      isbn: params.isbn ? params.isbn : undefined,
      ratings: params.ratings ? params.ratings : 0,
      reviews: params.reviews ? params.reviews : 0,
      average_rating: params.average_rating ? params.average_rating : undefined,
      first_publish_year: params.first_publish_year ? params.first_publish_year : undefined,
    };
    const mybook = new Book(newBook);
    mybook.save()
      .then((result) => {
        fulfill(result);
      })
      .catch((error) => {
        console.log('error in createBookLocal: ', error);
        reject(error);
      });
  });
};

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
  const mybook = Book.create(newBook);
  mybook.save()
    .then((result) => {
      res.json(mybook);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

const updateBookLocal = (params) => {
  console.log('updateBookLocal');
  return new Promise((fulfill, reject) => {
    getBookLocalByTitle({ title: params.title })
      .then((res) => {
        if (!res) {
          createBookLocal(params).then((createdBook) => {
            fulfill(createdBook);
          });
        } else {
          res.title = params.title ? params.title : undefined;
          res.author = params.author ? params.author : '';
          res.publisher = params.publisher ? params.publisher : '';
          res.publish_place = params.publish_place ? params.publish_place : '';
          res.id_goodreads = params.id_goodreads ? params.id_goodreads : undefined;
          res.isbn = params.isbn ? params.isbn : undefined;
          res.ratings = params.ratings ? params.ratings : 0;
          res.reviews = params.reviews ? params.reviews : 0;
          res.average_rating = params.average_rating ? params.average_rating : undefined;
          res.first_publish_year = params.first_publish_year ? params.first_publish_year : undefined;
        }
        res.save()
          .then((result) => {
            fulfill(result);
          })
          .catch((error) => {
            reject(error);
          });
      });
  }); // promises
};

module.exports = {
  createBook, createBookLocal, getBooks, getBookLocalByTitle, updateBookLocal,
};
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

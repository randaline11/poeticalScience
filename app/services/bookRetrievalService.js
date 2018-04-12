const axios = require('axios');
const constants = require('../constants/constants.js');
const BookController = require('../controllers/book_controller.js');
const PoetController = require('../controllers/poet_controller.js');

function formatDocsIntoJSON(docs, poet) {
  console.log('formating DocsIntoJSON for poet ', poet);
  return new Promise((fulfill, reject) => {
    const allBooksPromises = [];
    docs.forEach((doc) => {
      if (doc.author_name == poet) {
        allBooksPromises.push(new Promise((fulfill2, reject) => {
          const newBookParams = {
            title: doc.title ? doc.title : undefined,
            author: doc.author_name ? doc.author_name : '',
            publisher: doc.publisher ? doc.publisher : '',
            publish_place: doc.publish_place ? doc.publish_place : '',
            first_publish_year: doc.first_publish_year ? doc.first_publish_year : 0,
            id_goodreads: doc.id_goodreads ? doc.id_goodreads : undefined,
            isbn: doc.isbn ? doc.isbn[0] : undefined,
            ratings: 0,
            reviews: 0,
            average_rating: 0,
          };
          if (newBookParams.isbn != undefined) {
            retrieveBookOnGoodreads(newBookParams.isbn, newBookParams)
              .then((res) => {
                if (res) {
                  BookController.updateBookLocal(res)
                    .then((book) => {
                      fulfill2(book);
                    })
                    .catch((err) => {
                      console.log('error posting book: ', err);
                      reject();
                    });
                }
              })
              .catch((err) => {
                console.log('error on return of retrieveBookOnGoodreads: ', err);
              });
          } else {
            BookController.updateBookLocal(newBookParams)
              .then((book) => {
                fulfill2(book);
              })
              .catch((err) => {
                console.log('error posting book: ', err);
                reject();
              });
          }
        }));
      }
    });
    Promise.all(allBooksPromises).then((data) => {
      const newPoet = {
        name: poet,
        books: data,
      };
      PoetController.updatePoetLocal(newPoet)
        .then((mongoPoet) => {
          console.log('poet created: ', mongoPoet);
          fulfill(mongoPoet);
        })
        .catch((err) => {
          reject(err);
          console.log('error with new poet created: ', err);
        });
    });
  });
}

function retrieveBookOnGoodreads(isbn, newBookParams) {
  return axios.get(constants.goodreadsBookURL, {
    params: {
      key: constants.goodreadsKey,
      isbns: isbn,
    },
  })
    .then((body) => {
      const firstDoc = body.data.books[0];
      newBookParams.ratings = firstDoc.work_ratings_count ? firstDoc.work_ratings_count : 0;
      newBookParams.reviews = firstDoc.work_reviews_count ? firstDoc.work_reviews_count : 0;
      newBookParams.average_rating = firstDoc.average_rating ? firstDoc.average_rating : 0;
      return newBookParams;
    })
    .catch((error) => {
      if (error.response.status === 404) {
        console.log(`${newBookParams.title} not found on goodreads`);
        return newBookParams;
      } else {
        console.log('unhandled error code in retrieveBookOnGoodreads: ', error.response.status);
        return undefined;
      }
    });
}

module.exports = { formatDocsIntoJSON, retrieveBookOnGoodreads };

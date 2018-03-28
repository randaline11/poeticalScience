const axios = require('axios');
const constants = require('../constants/constants.js');

function formatDocsIntoJSON(docs, poet) {
  console.log('formatDocsIntoJSON');
  return docs.forEach((doc) => {
    if (doc.author_name == poet) {
      const newBookParams = {
        title: doc.title ? doc.title : undefined,
        author: doc.author_name ? doc.author_name : '',
        publisher: doc.publisher ? doc.publisher : '',
        publish_place: doc.publish_place ? doc.publish_place : '',
        id_goodreads: doc.id_goodreads ? doc.id_goodreads : undefined,
        isbn: doc.isbn ? doc.isbn[0] : undefined,
      };
      console.log('newBookParams: ', newBookParams);
      if (newBookParams.isbn != undefined) {
        console.log('about to retrieve poet ', newBookParams.author);
        const retrieve = retrieveBookOnGoodreads(newBookParams.isbn);
        console.log('retrieve: ', retrieve);
      }
    }

    // then, get books on goodreads for reviews
  });
}

function retrieveBookOnGoodreads(isbn) {
  console.log('retrieveBookOnGoodreads');
  console.log('isbn: ', isbn);
  return axios.get(constants.goodreadsBookURL, {
    params: {
      key: constants.goodreadsKey,
      isbns: isbn,
    },
  })
    .then((body) => {
      console.log('body of retrieveBookOnGoodreads: ', body.data);
      console.log('type of body.data: ', typeof body.data);
      if (typeof body.data === 'string') {
        console.log('no books found, type was string');
      } else {
        const firstDoc = body.data.books[0];

        const goodreadsParams = {
          ratings: firstDoc.work_ratings_count ? firstDoc.work_ratings_count : 0,
          reviews: firstDoc.work_reviews_count ? firstDoc.work_reviews_count : 0,
          average_rating: firstDoc.average_rating ? firstDoc.average_rating : 0,
        };
        console.log('goodreadsParams: ', goodreadsParams);
        return goodreadsParams;
      }
    })
    .catch((error) => {
      // console.log('error in retrieveBookOnGoodreads:', error);
      if (error.response.status === 404) {
        console.log('not found on goodreads');
        return 'not found on goodreads';
        const goodreadsParams = {
          ratings: 0,
          reviews: 0,
          average_rating: 0,
        };
        return goodreadsParams;
      } else {
        console.log('unhandled error code in retrieveBookOnGoodreads: ', error.response.status);
      }
    });
}

module.exports = { formatDocsIntoJSON, retrieveBookOnGoodreads };

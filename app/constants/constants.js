const poeturl = 'https://poet.tips/graph/xml/?dl=1';
const filterurl = 'http://openlibrary.org/search.json';
const goodreadsBookURL = 'https://www.goodreads.com/book/review_counts.json';
const goodreadsKey = 'b3DhVHepHoKZHASoj1yKuA';
const mongoURI = process.env.POETICAL_DB_URL;
const apiRootURL = 'https://poeticalscience.herokuapp.com/api';

module.exports = {
  poeturl,
  filterurl,
  goodreadsBookURL,
  goodreadsKey,
  mongoURI,
  apiRootURL,
};

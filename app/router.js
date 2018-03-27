const Express = require('express');
const BookController = require('./controllers/book_controller');
const WeightController = require('./controllers/weight_controller');
const PoetController = require('./controllers/poet_controller');

const Router = Express.Router;
const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'welcome to the poeticalScience api!' });
});

// ----------------------------------------------------
router.route('/books')
  .get(BookController.getBooks)
  .post(BookController.createBook);

router.route('/weights')
  .get(WeightController.getWeights)
  .post(WeightController.createWeight);

router.route('/poets')
  .get(PoetController.getPoets)
  .post(PoetController.createPoet);
//
// router.route('/posts/:someID')
//   .get(Posts.getPost)
//   .put(requireAuth, Posts.updatePost)
//   .delete(requireAuth, Posts.deletePost);

module.exports = { router };

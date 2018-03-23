const Express = require('express');

const Router = Express.Router;
const BookController = require('./controllers/post_controller');
const WeightController = require('./controllers/weight_controller');
const PoetController = require('./controllers/poet_controller');

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'welcome to the poeticalScience api!' });
});

// ----------------------------------------------------
router.route('/books')
  .get(Books.getBooks)
  .post(Books.createBook);

router.route('/weights')
  .get(Weights.getWeights)
  .post(Weights.createWeight);

router.route('/poets')
  .get(Poets.getPoet)
  .post(Poets.createPoet);
//
// router.route('/posts/:someID')
//   .get(Posts.getPost)
//   .put(requireAuth, Posts.updatePost)
//   .delete(requireAuth, Posts.deletePost);

export router;

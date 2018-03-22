import { Router } from 'express';
import * as BookController from './controllers/post_controller';
import * as WeightController from './controllers/user_controller';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'welcome to our blog api!' });
});

// ----------------------------------------------------
router.route('/books')
  // .get(Posts.getPosts)
  .post(Books.createBook);


router.route('/weights')
  // .get(Posts.getPosts)
  .post(Books.createWeight);

router.route('/posts/:someID')
  .get(Posts.getPost)
  .put(requireAuth, Posts.updatePost)
  .delete(requireAuth, Posts.deletePost);

export default router;

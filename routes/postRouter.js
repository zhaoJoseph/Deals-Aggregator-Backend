import postController from '../controllers/postController.js'
import express from 'express';
import error from '../utils/error.js';

var router = express.Router();

/* GET paginated result of posts */
router.get('/total', async (req, res, next) => {
    const data = await postController.getTotal(req, res, next);
    res.status(error.codes.PASS).json(data);
})

/* GET paginated result of posts from search request*/
router.get('/search', async(req, res, next) => {
    const data = await postController.search(req, res, next);
    res.status(error.codes.PASS).json(data);
})

/* GET last build time for posts*/
router.get('/build', async (req, res, next) => {

    const data = await postController.getBuild(req, res, next);
    res.status(error.codes.PASS).json(data);
});

/* GET paginated result of posts from pageNum > 0*/
router.get('/:pageNum?', async (req, res, next) => {

    const data = await postController.getPosts(req, res, next);
    res.status(error.codes.PASS).json(data);
});



export default router;
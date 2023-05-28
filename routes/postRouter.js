import postController from '../controllers/postController.js'
import express from 'express';
import error from '../utils/error.js';

var router = express.Router();

router.get('/total', async (req, res, next) => {
    const data = await postController.getTotal(req, res, next);
    res.status(error.codes.PASS).json(data);
})

router.get('/search', async(req, res, next) => {
    const data = await postController.search(req, res, next);
    res.status(error.codes.PASS).json(data);
})

router.get('/:pageNum?', async (req, res, next) => {

    const data = await postController.getPosts(req, res, next);
    res.status(error.codes.PASS).json(data);
});


export default router;
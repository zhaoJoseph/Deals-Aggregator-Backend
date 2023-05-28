
import Post from '../models/post.js' 
import BaseError from '../utils/baseError.js';
import error from '../utils/error.js';

const postController = {

    async getPosts(req, res, next){

        const {pageNum} = req.query;

        try{
            const data = await Post.get({pageNum});
            return data;
        }catch(err) {
            console.log(err)
            if(!err.code) {
              throw new BaseError(err.error, error.codes.SERVER_ERROR, err.error)
            }else {
              throw new BaseError(err.name, err.code, err.message)
            }
        }
    },

    async getTotal(req, res, next){
        try{
            const data = await Post.getTotal();
            return data;
        }catch(err) {
            console.log(err)
            if(!err.code) {
                throw new BaseError(err.error, error.codes.SERVER_ERROR, err.error)
              }else {
                throw new BaseError(err.name, err.code, err.message)
              }
        }
    },

    async search(req, res, next){
      const {searchParams, pageNum} = req.query;
      try{
        const data = await Post.search({searchParams, pageNum});
        return data;
      }catch(err) {
        console.log(err)
        if(!err.code){
          throw new BaseError(err.error, error.codes.SERVER_ERROR, err.error)
        }else {
          throw new BaseError(err.name, err.code, err.message)
        }
      }
    }

}

export default postController


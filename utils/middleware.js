import error from "./error.js"

const middleware = {
    errorHandler(err, req, res, next) {
        console.log(err)
        return res.status(error.codes.SERVER_ERROR).json({error: err})
    }
}

export default middleware
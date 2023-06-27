import error from "./error.js"

/**
 * Basic error middleware handler
 * 
 * @param {err object} err
 * @param {request object} req
 * @param {response object} res
 * @param {next middleware caller} next
 */

const middleware = {
    errorHandler(err, req, res, next) {
        console.log(err)
        return res.status(error.codes.SERVER_ERROR).json({error: err})
    }
}

export default middleware
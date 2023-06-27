/**
 * Basic class for reporting errors
 * Includes:
 *  - Error name
 *  - Error status code
 *  - Error description/message
 */

export default class BaseError extends Error {
    constructor (name, statusCode, description) {
    super(description)
   
    Object.setPrototypeOf(this, new.target.prototype)
    this.name = name
    this.statusCode = statusCode
    Error.captureStackTrace(this, this.constructor)
    }
   }
   
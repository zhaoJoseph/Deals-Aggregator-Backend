import express from 'express'
import cors from 'cors'
import error from './utils/error.js'
import endpoints from './utils/endpoints.js'


const app = express()

import postRouter from './routes/postRouter.js';
import middleware from './utils/middleware.js'

app.use(express.json())
app.use(cors())

//ROUTES
app.use(endpoints.POST_URL, postRouter);

// ROUTE ERRORS
app.use(middleware.errorHandler);

export default app
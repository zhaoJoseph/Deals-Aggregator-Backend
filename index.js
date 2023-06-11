import app from './app.js'
import  http from 'http'
import EventEmitter from 'events'
import process from 'node:process';

const server = http.createServer(app)

import dotenv from 'dotenv'
dotenv.config()

const { PORT, FILENAME } = process.env;

process.on('warning', (warning) => {

  const myEmitter = new EventEmitter();
  console.log(myEmitter.listeners('close'));

  console.warn(warning.name);    // Print the warning name
  console.warn(warning.message); // Print the warning message
  console.warn(warning.stack);   // Print the stack trace
});

// ################################################ //
//                Server Initialization             //
// ################################################ //

const port = process.env.PORT || 3333;

server.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

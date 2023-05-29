import app from './app.js'
import  http from 'http'
import EventEmitter from 'events'
import process from 'node:process';
import { fork } from 'child_process';
import { CronJob } from 'cron';

const server = http.createServer(app)

import dotenv from 'dotenv'
dotenv.config()

const { PORT, FILENAME } = process.env;

var jobs = [
  new CronJob(
  "00 */5 * * * *",
  function() {
    console.log("Scraper started.")
    const process = fork('./scrape.js');
  }),
  new CronJob(
  "00 5 * * * *",
  function() {
    console.log("Removing Expired.")
    const process = fork('./expired.js');
  }),
]

jobs.forEach(function(job) {
  job.start()
})

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

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
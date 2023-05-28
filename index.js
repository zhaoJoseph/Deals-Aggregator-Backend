import app from './app.js'
import  http from 'http'
import funcs from './scraper/aggregator.js'
import async from 'async'
import readline from 'readline'
import EventEmitter from 'events'
import { Scraper, HTMLGridScrape, TwitterScrape, RedditScrape } from './scraper/scrapeStrategies.js'
import fs from 'fs'
import process from 'node:process';

const server = http.createServer(app)

import dotenv from 'dotenv'
dotenv.config()

const { PORT, FILENAME } = process.env;

const gridScrape = new HTMLGridScrape();
const twitterScrape = new TwitterScrape();
const redditScrape = new RedditScrape();

let strategies = {
    "grid" : gridScrape,
    "twitter" : twitterScrape,
    "reddit" : redditScrape,
}

// read feed.txt
// get strat
// do import 

process.on('warning', (warning) => {

  const myEmitter = new EventEmitter();
  console.log(myEmitter.listeners('close'));

  console.warn(warning.name);    // Print the warning name
  console.warn(warning.message); // Print the warning message
  console.warn(warning.stack);   // Print the stack trace
});


//###################################################//
//                  SCRAPER                          //
//###################################################//

async function startScraper() {

const scraper = new Scraper()

const siteQueue = async.queue(async (siteUrl) => {
    const result = await scrapeSite(siteUrl)
    await funcs.aggregateData(result)
}, 1)

await processSites()

}

async function processSites() {

  const stream = fs.createReadStream(`${FILENAME}`, {encoding: 'utf8'})
  const rl = readline.createInterface({
    input: stream,
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    // Add each site to the queue
    siteQueue.push(line.trim());
  }
  
}

async function scrapeSite(line) {
  const args = line.split(',');
  scraper.setStrategy(strategies[args[1]])
  const paramList = [args[0]].concat(args.slice(2))
  const params = scraper.strategy.setParams(paramList)
  const scraped_data = await scraper.scrape(params)
  return scraped_data
}

// ################################################ //
//                Server Initialization             //
// ################################################ //

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
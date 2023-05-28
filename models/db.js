import postgres from 'postgres';
import pg from 'pg'
import dotenv from 'dotenv'
import BaseError from '../utils/baseError.js';
import format from 'pg-format'

dotenv.config()

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;
const URL = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require&ptions=project%3D${ENDPOINT_ID}`;

const sql = postgres(URL, { ssl: 'require' });

const db = {

    call: async (stmt) =>  {
        try{
            const Client = pg.Client
            const client = new Client({
              connectionString: URL
            });
            await client.connect();
            const query = format(stmt)
            const res = await client.query(query);
            await client.end();
          } catch (err) {
            console.log(err)
            if(!err.code) {
              throw new BaseError(err.error, err.codes.SERVER_ERROR, err.error)
            }else {
              throw new BaseError(err.name, err.code, err.message + ' ' + err.detail)
            }
          } 
    },

    any: async (stmt) => {
        try{
            const Client = pg.Client
            const client = new Client({
              connectionString: URL
            });
            await client.connect();
            const query = format(stmt)
            const res = await client.query(query);
            await client.end();
            return res;
          } catch (err) {
            console.log(err)
            if(!err.code) {
              throw new BaseError(err.error, err.codes.SERVER_ERROR, err.error)
            }else {
              throw new BaseError(err.name, err.code, err.message + ' ' + err.detail)
            }
          } 
    }

};

export default db;



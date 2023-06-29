import db from "./db.js"

   /**
   * Return option from options object,
   * return def if not present
   *
   * @param {options object} 
   * @param {name string} 
   * @param {def object } 
   */
function opt(options, name, def){
    return options && options[name]!==undefined ? options[name] :def;
}

const Post = {
    get:async (options) => {
        var pageNum = opt(options, 'pageNum', null);

        var num = parseInt(pageNum);

        if(!isNaN(num)) {
            return await db.any(`SELECT title, url FROM deals_table ORDER BY deals_table.time_inserted DESC LIMIT 20 OFFSET ${num * 20};`);
        } else {
            return await db.any('SELECT title, url FROM deals_table ORDER BY deals_table.time_inserted DESC LIMIT 20;');
        }   
    },

    getTotal:async () => {
        return await db.any(`SELECT COUNT(*) FROM deals_table;`);
    },

    search:async (options) => {
        var list = opt(options, 'searchParams', []);

        var urlList = opt(options, 'urlParams', '');
        var listRes = list.substring(1,list.length-1).split(',');
        var urlRes = urlList.substring(1, urlList.length-1).split(',');
        var listStr = listRes.join('|').replace(' ', '%');
        var listUrl = urlRes.join('|').replace(' ', '%');
        var pageNum = opt(options, 'pageNum', null);
        var num = parseInt(pageNum);

        var query = `SELECT COUNT(*) from deals_table WHERE  `

        var dataQuery = `SELECT title, url from deals_table WHERE  `

        if(listStr) {
            dataQuery += `  title SIMILAR TO '%(${listStr})%' AND`
            query += ` title SIMILAR TO '%(${listStr})%' AND`
        }

        if(listUrl){
            dataQuery += `  url SIMILAR TO '%(${listUrl})%' AND`
            query += ` url SIMILAR TO '%(${listUrl})%' AND`
        }

        dataQuery = dataQuery.substring(0, dataQuery.length-4)

        query = query.substring(0, query.length-4)

        query += ';'

        dataQuery += ` ORDER BY deals_table.time_inserted DESC LIMIT 20`

        if(!isNaN(num)) {
            dataQuery += ` OFFSET ${num * 20};`
        }else{
            dataQuery += ';'
        }

        const data = await db.any(dataQuery)
        const len = await db.any(query);
        return {data: data, len: len}


    },

    build:async(options) => {
        var query = `SELECT max(time_inserted) FROM deals_table;`
        const time = await db.any(query)
        return {time: time['rows'][0]['max']}
    },
}


export default Post;

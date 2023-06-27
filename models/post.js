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
        var listRes = list.substring(1,list.length-1).split(',');
        var listStr = listRes.join('|').replace(' ', '%');
        var pageNum = opt(options, 'pageNum', null);
        var num = parseInt(pageNum);

        if(!isNaN(num)) {
            const data = await db.any(`SELECT title, url from deals_table WHERE title SIMILAR TO '%(${listStr})%' ORDER BY deals_table.time_inserted DESC LIMIT 20 OFFSET ${num * 20};`)
            const len = await db.any(`SELECT COUNT(*) from deals_table WHERE title SIMILAR TO '%(${listStr})%';`);
            return {data: data, len: len}
        } else {
            const data = await db.any(`SELECT title, url from deals_table WHERE title SIMILAR TO '%(${listStr})%' ORDER BY deals_table.time_inserted DESC LIMIT 20;`);
            const len = await db.any(`SELECT COUNT(*) from deals_table WHERE title SIMILAR TO '%(${listStr})%';`);
            return {data: data, len: len}
        }


    }
}


export default Post;

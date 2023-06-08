class ConfigurationDatabase {
    #detailsDbPsql = {
        myHost:"127.0.0.1" ,
        myUsername:"postgres" ,
        myPassword:"ttknp",
        myPort:"5432", // postgres using this port 5432
        myDatabase:"postgres_demo"
    }
    #postgres = require('pg').Pool
    /* Focus .Pool can use to connect psql database */
    /* use pool of connections. Therefore(adv ดังนั้น), we don’t have to open and close a client each time we make a query.*/
    #pool // will store connect database
    constructor() {
        this.#pool = new this.#postgres({
            user : this.#detailsDbPsql.myUsername ,
            host : this.#detailsDbPsql.myHost ,
            database : this.#detailsDbPsql.myDatabase ,
            password : this.#detailsDbPsql.myPassword ,
            port : this.#detailsDbPsql.myPort
        })
    }

    get pool () {
        return this.#pool
    }
}

/*

check connect to database
const configurationDatabase = new ConfigurationDatabase()
let connect = configurationDatabase.pool
connect.query('SELECT NOW()', (err, res) => {
    console.log(err, res)
    connect.end()
})
*/

module.exports = ConfigurationDatabase // export class for require them

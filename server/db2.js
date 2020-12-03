const Pool = require("pg").Pool

const access = new Pool({
    user: "postgres",
    password: "doghousetv",
    host: "localhost",
    port: 5432,
    database: "EMR_Project"
})

module.exports = access
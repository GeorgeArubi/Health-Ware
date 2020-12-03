const Pool = require("pg").Pool

const pool = new Pool({
    user: "postgres",
    password: "doghousetv",
    host: "localhost",
    port: 5432,
    database: "user_profiles"
})

module.exports = pool
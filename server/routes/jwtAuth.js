const router = require("express").Router()
const pool = require("../database")
const bcrypt = require("bcrypt")
const jwtGenerator = require("../utils/jwtGenerator")
const validInfo = require("../middleware/validinfo")
const authorization = require("../middleware/authorization")

//Registration Route
router.post("/register", validInfo, async (req, res) => {
    try {
        //1. destructure the req.body (name, email, password)

        const { name, email, insurance_id, password } = req.body


        //2. check if user exists, but if the user exists then throw error

        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
            email
        ])

        if(user.rows.length !== 0) {
            return res.status(401).json("User already exists")
        }

        //3. bcrypt the user password

        const saltRound = 10
        const salt = await bcrypt.genSalt(saltRound)
        const bcryptPassword = await bcrypt.hash(password, salt)

        //4. enter the new user inisde our database

        const newUser = await pool.query 
        ("INSERT INTO users (user_name, user_email, insurance_id, user_password) VALUES ($1, $2, $3, $4) RETURNING *",
        [name, email, insurance_id, bcryptPassword])

        //5. generate jwt token

        const token = jwtGenerator(newUser.rows[0].user_id)
        res.json({ token })

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
})

//Login Route
router.post("/login", validInfo, async (req, res) => {
    try {
        //1. destructure the req.body

        const { email, password } = req.body

        //2. check if user doesn't exist, if not throw error

        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
            email
        ])

        if (user.rows.length === 0) {
            return res.status(401).json("Invalid Credentials")
        }

        //3. check if login password is the same as the database password

        const validPassword = await bcrypt.compare(password, user.rows[0].user_password)

        if (!validPassword) {
            return res.status(401).json("Invalid Credintials")
        }

        //4. give jwt token

        const token = jwtGenerator(user.rows[0].user_id)
        res.json({ token })

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error") 
    }
})

//React Route
router.get("/is-verify", authorization, async (req, res) => {
    try { 
        res.json(true)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
})

//Dashboard Route

module.exports = router
const router = require("express").Router()
const pool = require("../database")
const access = require("../db2")
const authorization = require("../middleware/authorization")

router.get("/", authorization, async (req, res) => {
    try {
        //res.json(req.user)
        const user = await pool.query("SELECT insurance_id FROM users WHERE user_id = $1", [req.user])
        //res.json(user.rows[0].insurance_id)
        const patient = await access.query("SELECT * FROM Patient WHERE PatientHealthIn_ID = $1", [user.rows[0].insurance_id])
        res.json(patient.rows[0])

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error") 
    }
})

module.exports = router
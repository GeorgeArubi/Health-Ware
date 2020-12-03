const express = require("express")
const app = express()
const cors = require("cors")

//Middleware
app.use(express.json()) //req.body
app.use(cors())

//Register and Login Routes
app.use("/auth", require("./routes/jwtAuth"))

//Dashboard Route
app.use("/dashboard", require("./routes/dashboard"))

app.listen(5000, () => {
    console.log("Server is running on port 5000")
})
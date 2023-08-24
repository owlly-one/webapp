const express = require('express');

const blogRoutes = require("./routes/blog.route")
const mentalRoutes = require("./routes/mental.route")
const physicalRoutes = require("./routes/physical.route")


const ErrorMidelware = require('./utility/ErrorMidelware');

const cors = require("cors")

const app = express();

/* MIDDELWARES */
app.use(express.json())
app.use(cors({
    origin: [
        "http://localhost:3000",
    ],
    credentials: true,
}))
app.use("/api", blogRoutes)
app.use("/api", mentalRoutes)
app.use("/api", physicalRoutes)


app.use(ErrorMidelware)

app.get("/", (req, res)=>{
    res.send("Server is running")
})
module.exports = app;
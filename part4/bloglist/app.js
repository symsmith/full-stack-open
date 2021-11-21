const config = require("./utils/config")
const blogsRouter = require("./controllers/blogs")
const mongoose = require("mongoose")
const logger = require("./utils/logger")
const cors = require("cors")
const express = require("express")

const app = express()

mongoose
  .connect(config.DB_URI)
  .then(() => {
    logger.info("Connected to MongoDB")
  })
  .catch((error) => {
    logger.error("Error connecting to MongoDB:", error.message)
  })

app.use(cors())
app.use(express.json())
app.use("/api/blogs", blogsRouter)

module.exports = app

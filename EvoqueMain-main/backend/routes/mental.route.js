const MentalController = require("../controllers/mental.controller")
const upload = require("../utility/Multer")

const Router = require("express").Router()

Router.route("/mental").get(MentalController.getAllBlogs)
Router.route("/mental/all").get(MentalController.getAllBlogs)
Router.route("/mental/:id").get(MentalController.getSingleBlog)
Router.route("/mental/create").post(upload.single("image"), MentalController.createBlog)
Router.route("/mental/update").post(MentalController.updateBlog)
Router.route("/mental/delete").post(MentalController.deleteBlog)

module.exports = Router

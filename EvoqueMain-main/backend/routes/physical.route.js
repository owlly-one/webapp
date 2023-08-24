const PhysicalController = require("../controllers/physical.controller")
const upload = require("../utility/Multer")

const Router = require("express").Router()

Router.route("/physical").get(PhysicalController.getAllBlogs)
Router.route("/physical/all").get(PhysicalController.getAllBlogs)
Router.route("/physical/:id").get(PhysicalController.getSingleBlog)
Router.route("/physical/create").post(upload.single("image"), PhysicalController.createBlog)
Router.route("/physical/update").post(PhysicalController.updateBlog)
Router.route("/physical/delete").post(PhysicalController.deleteBlog)

module.exports = Router

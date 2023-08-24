const stream = require("stream")
const CatchAsync = require("../utility/CatchAsync");
const APIError = require("../utility/ApiError");
const MentalModel = require("../models/MentalExercise.model")
const cloudinary = require("cloudinary").v2

class MentalController {
    static recordsPerPage = 11
    // create a blog post
    static createBlog = CatchAsync(async (req, res) => {
        let { title, body, youtubeUrl } = req.body
        if (!req.file) throw new APIError(402, "image is required")

        let validBlog = MentalModel.validateBlog(title, body)

        // upload image
        const readableStream = new stream.PassThrough();
        readableStream.end(req.file.buffer);

        try {
            console.log(process.env.CLOUDINARY_NAME)
            cloudinary.config({
                cloud_name: "dxgk3lc63",
                api_key: "385524412446863",
                api_secret: "DgGlkreOh4Fs5EI5hRZXeeyowBA",
            })
            const options = {
                folder: "blog_images",
                crop: "scale",
                public_id: `${Date.now()}`,
                resource_type: "auto",
            }
            const uploadStream = cloudinary.uploader.upload_stream(options, async (error, result) => {
                if (error) {
                    return res.status(500).send('Failed to upload file to Cloudinary');
                }
                let myCloud = result
                if (validBlog) {
                    await MentalModel.createBlog(title, body, myCloud.secure_url, youtubeUrl)
                } else {
                    throw new APIError(402, "Validation error")
                }
                res.status(200).json({
                    success: true,
                    message: "Blog is successfully created"
                })
            });
            readableStream.pipe(uploadStream);
        } catch (err) {
            throw new APIError(500, "Internal server error - cloudinary")
        }
    })
    // get all blogs
    static getAllBlogs = CatchAsync(async (req, res) => {
        let pageNo = req.query.page || 1

        let blogs = await MentalModel.find().sort({ _id: -1 }).skip((pageNo - 1) * this.recordsPerPage)
            .limit(this.recordsPerPage)

        res.status(200).json({
            success: true,
            page: pageNo,
            blogsLength: blogs.length,
            blogs
        })
    })

    // delete a blog post
    static deleteBlog = CatchAsync(async (req, res) => {
        let { blogId } = req.body

        let targetBlog = await MentalModel.getBlog(blogId)
        if (targetBlog) {
            await MentalModel.deleteBlog(blogId)
        } else {
            throw new APIError(404, "blog not found")
        }
        res.status(200).json({
            success: true,
            message: "Blog is successfully deleted"
        })
    })
    // update a blog post
    static updateBlog = CatchAsync(async (req, res) => {
        let { blogId } = req.body
        let { title, body, url } = req.body

        let targetBlog = await MentalModel.getBlog(blogId)

        if (!targetBlog) {
            throw new APIError(404, "blog not found")
        }
        let updated = await targetBlog.updateBlog(title, body, url)
        if (!updated) throw new APIError(402, "Validation error")
        res.status(200).json({
            success: true,
            message: "Blog is successfully updated"
        })
    })
    // get a single blog
    static getSingleBlog = CatchAsync(async (req, res) => {
        let id = req.params.id

        let blog = await MentalModel.getBlog(id)
        if (!blog) throw new APIError(404, "no blog found against this id")
        res.status(200).json({
            success: true,
            blog
        })
    })
}

module.exports = MentalController
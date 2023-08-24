const mongoose = require("mongoose")
const APIError = require("../utility/ApiError")

const Mental = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "title field can not be empty"],
        maxLength: [200, "blog title must be less than 200 chars"],
        minLength: [1, "blog title must be more than 1 chars"],
    },
    body: {
        type: String,
        required: [true, "blog body field can not be empty"],
        minLength: [1, "blog body must be between 1 to 100000"],
        maxLength: [100000, "product price must be between 1 to 100000"]
    },
    image: {
        type: String,
        required: ["true", "image can  not be empty"]
    },
    youtubeUrl: String,
})

Mental.statics.validateBlog = function (title, body) {
    if (!title) throw new APIError(402, "title field can not be empty")
    else if (!body) throw new APIError(402, "body field can not be empty")
    else return true
}

Mental.statics.createBlog = async function (title, body, url, youtubeUrl = "") {
    try {
        await this.create({
            title,
            body,
            image: url,
            youtubeUrl: youtubeUrl
        })
    } catch (err) {
        throw new APIError(402, err)
    }
}

Mental.statics.getBlog = async function (blogId) {
    return await this.findById(blogId)
}

Mental.statics.deleteBlog = async function (blogId) {
    try {
        await this.findByIdAndDelete(blogId)
    } catch (err) {
        throw new APIError(404, "blog not found or issue")
    }
}

Mental.methods.updateBlog = async function (title, body, url) {
    try {
        if (title) this.title = title
        if (body) this.body = body
        if (url) this.video[0] = url

        return true
    } catch (err) {
        throw new APIError(402, "blog can't be updated")
    }
}
module.exports = mongoose.model("mental", Mental)
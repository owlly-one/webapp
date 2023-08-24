const mongoose = require("mongoose")
const APIError = require("../utility/ApiError")


const Physical = new mongoose.Schema({
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
    muscleWorked: [{
        type: String,
        required: [true, "must have one muscle worked"]
    }],
    typeOfExercise: {
        type: String,
        required: [true, "must have one type of exercise"]
    },
    youtubeUrl: String,
})

Physical.statics.validateBlog = function (title, body, muscleWorked, typeOfExercise) {
    if (!title) throw new APIError(402, "title field can not be empty")
    else if (!body) throw new APIError(402, "body field can not be empty")
    else if (!muscleWorked) throw new APIError(402, "muscle field can not be empty")
    else if (muscleWorked && muscleWorked.length === 0) throw new APIError(402, "must have one muscle worked")
    else if (!typeOfExercise) throw new APIError(402, "type of exercise field can not be empty")
    else return true
}

Physical.statics.createBlog = async function (title, body, url, muscleWorked, typeOfExercise, youtubeUrl = "") {
    try {
        await this.create({
            title,
            body,
            image: url,
            muscleWorked,
            typeOfExercise,
            youtubeUrl: youtubeUrl
        })
    } catch (err) {
        throw new APIError(402, err)
    }
}

Physical.statics.getBlog = async function (blogId) {
    return await this.findById(blogId)
}

Physical.statics.deleteBlog = async function (blogId) {
    try {
        await this.findByIdAndDelete(blogId)
    } catch (err) {
        throw new APIError(404, "blog not found or issue")
    }
}

Physical.methods.updateBlog = function (title, body, url, typeOfExercise) {
    try {
        if (title) this.title = title
        if (body) this.body = body
        if (url) this.video[0] = url
        if (typeOfExercise) this.typeOfExercise = typeOfExercise

        return true
    } catch (err) {
        throw new APIError(402, "blog can't be updated")
    }
}
module.exports = mongoose.model("physical", Physical)
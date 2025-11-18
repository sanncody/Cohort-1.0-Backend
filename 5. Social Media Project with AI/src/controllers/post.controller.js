const postModel = require("../models/post.model");
const generateCaption = require("../service/ai.service");
const uploadFile = require("../service/storage.service");

const createPost = async (req, res) => {
    const file = req.file;
    const base64Image = Buffer.from(file.buffer).toString('base64');

    const caption = await generateCaption(base64Image);
    const result = await uploadFile(file);

    const post = await postModel.create({
        postImg: result.url,
        caption,
        user: req.user._id
    });
    
    res.status(201).json({ message: "Post created successfully", post });
};

module.exports = { createPost };
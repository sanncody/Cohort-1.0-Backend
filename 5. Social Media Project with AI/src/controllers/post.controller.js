const postModel = require("../models/post.model");
const generateCaption = require("../service/ai.service");
const uploadFile = require("../service/storage.service");

const createPost = async (req, res) => {
    const fileData = await uploadFile(req.file);

    const base64Image = Buffer.from(req.file.buffer).toString('base64');

    const caption = await generateCaption(base64Image);

    // const post = await postModel.create({
    //     postImg: fileData.url,
    //     caption
    // });
    
    res.json({ caption });
};

module.exports = { createPost };
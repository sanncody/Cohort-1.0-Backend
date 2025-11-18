const ImageKit = require("imagekit");
const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

async function uploadFile(file) {
    const response = await imagekit.upload({
        file: file.buffer,
        fileName: `${uuidv4()}-${file.originalname}`,
        folder: "Post-Images"
    });

    return response;
}

module.exports = uploadFile;
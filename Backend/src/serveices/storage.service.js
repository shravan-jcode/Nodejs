const ImageKit = require("@imagekit/nodejs/index.js");
const { URLEndpoints } = require("@imagekit/nodejs/resources/accounts/url-endpoints.js");

const imagekit = new ImageKit({

    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: "https://ik.imagekit.io/jdvelnbec",
})

async function uploadFile(buffer) {

    const result = await imagekit.files.upload({
        file: buffer.toString("Base64"),
        fileName: "image.jpg"
    })

    return result;
}

module.exports = uploadFile;
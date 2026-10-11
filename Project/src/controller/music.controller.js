const jwt = require("jsonwebtoken");
const musicModel = require("../models/music.model");
const albumModel = require("../models/album.model")
const { uploadFile } = require("../services/storage.service");

async function getAllMusics(req,res){
    const musics =await musicModel.find().limit(2).populate("artist")


    res.status(200).json({
        message:"music fetched successfully",
        musics:musics,
    })

}

async function createMusic(req, res) {
    try {
        const { title } = req.body;
        const file = req.file;

        if (!title) {
            return res.status(400).json({
                message: "Title is required"
            });
        }

        if (!file) {
            return res.status(400).json({
                message: "Music file is required"
            });
        }

        const result = await uploadFile(
            file.buffer.toString("base64")
        );

        const music = await musicModel.create({
            url: result.url,
            title,
            artist: req.user.id
        });

        return res.status(201).json({
            message: "Music created successfully",
            music: {
                id: music._id,
                url: music.url,
                title: music.title,
                artist: music.artist
            }
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Failed to create music"
        });
    }
}

async function createAlbum(req, res) {
    try {
        const { title, musics } = req.body;

        if (!title) {
            return res.status(400).json({
                message: "Album title is required"
            });
        }

        const album = await albumModel.create({
            title,
            artist: req.user.id,
            musics
        });

        return res.status(201).json({
            message: "Album created successfully",
            album: {
                id: album._id,
                title: album.title,
                artist: album.artist,
                musics: album.musics
            }
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Failed to create album"
        });
    }
}

async function getAllAlbums(req,res){
    const albums =await albumModel.find().select("title artist").populate("artist","username email")

    res.status(200).json({
        message:"album get successfully",
        albums:albums,
    })
}

async function getAllAlbumsById(req, res) {
    const albumId = req.params.albumId;

    const album = await albumModel
        .findById(albumId)
        .populate("artist", "username email")
        .populate("musics");

    return res.status(200).json({
        message: "Album fetched successfully",
        album: album
    });
}

module.exports = { createMusic ,createAlbum,getAllMusics,getAllAlbums,getAllAlbumsById};



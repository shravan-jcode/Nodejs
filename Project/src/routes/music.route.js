// music.route.js
const express = require("express");
const musicController = require("../controller/music.controller");
const authMiddleware =require("../middlewares/auth.middleware")
const multer = require("multer");

const upload = multer({
    storage: multer.memoryStorage()
});

const router = express.Router();

router.get("/",authMiddleware.authUser,musicController.getAllMusics)

router.post(
    "/upload",
    authMiddleware.authArtist,
    upload.single("music"),
    musicController.createMusic
);

router.post("/album",authMiddleware.authArtist,musicController.createAlbum)
router.get("/albums",authMiddleware.authUser,musicController.getAllAlbums)
router.get("/albums/:albumId",authMiddleware.authUser,musicController.getAllAlbumsById)

module.exports = router;
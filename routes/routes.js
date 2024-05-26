const express = require("express");
const router = express.Router();
const ytdl = require("ytdl-core");
const axios = require("axios");
const errorHandler = require("./error-handler");

const jsonParser = express.json();
const urlEncodedParser = express.urlencoded({ extended: false });

const customHeaders = (req, res, next) => {
    res.set("X-Powered-By", "YT-Down Servers");
    next();
};
router.use(errorHandler);

router.all("*", customHeaders);

router.get('/', (req, res) => {
    res.json({
        Message: `Welcome to YT Down api!`
    });
});

router.post("/download", urlEncodedParser, jsonParser, async (req, res) => {
    try {
        const { url, format } = req.body;
        
        if (!url || !format) {
            return res.status(400).send(`Bad Request! Please ensure that Video URL and Format are properly sent to the server!`);
        }

        let tempURL;
        const info = await ytdl.getInfo(url);
        
        if (format === "mp3") {
            console.log(`Converting video present at ${url} to mp3...`);
            const audioFormat = ytdl.filterFormats(info.formats, "audioonly");
            tempURL = audioFormat[0].url;
            console.log(`Video has been converted to mp3 successfully!`);
        } else if (format === "mp4") {
            console.log(`Converting video present at ${url} to mp4...`);
            const videoFormat = ytdl.filterFormats(info.formats, "videoandaudio");
            tempURL = videoFormat[0].url;
            console.log(`Video has been converted to mp4 successfully!`);
        } else {
            console.log(`Bad request by Client from ${req.ip}`);
            return res.status(400).send(`Bad Request! Unrecognized format: ${format}!`);
        }

        console.log(`Redirecting client to ${tempURL}...`);
        res.redirect(tempURL);
        
    } catch (error) {
        console.error(`An error occurred: ${error}`);
        res.status(500).send(`Error Fetching video: ${error}`);
    }
});

router.all("*", (req, res) => {
    res.status(404).send(`404 not found!`);
});

module.exports = router;

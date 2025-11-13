const db = require("../db/db");
const { exec } = require("child_process");
const ffmpegInstaller = require("@ffmpeg-installer/ffmpeg");
let path = require("path");
const fs = require("fs");


// media count based on their extensions 
async function getMediaCounts(userId) {
    const [{ images_count }] = await db("posts")
        .where("userId", userId)
        .andWhere(function () {
            this.where("media_url", "like", "%.jpg")
                .orWhere("media_url", "like", "%.jpeg")
                .orWhere("media_url", "like", "%.png");
        })
        .count("id as images_count");

    const [{ reels_count }] = await db("posts")
        .where("userId", userId)
        .andWhere(function () {
            this.where("media_url", "like", "%.mp4")
                .orWhere("media_url", "like", "%.mov")
                .orWhere("media_url", "like", "%.mpeg");
        })
        .count("id as reels_count");

    const [{ all_media_count }] = await db("posts")
        .where("userId", userId)
        .count("id as all_media_count");

    return {
        images_count: Number(images_count) || 0,
        reels_count: Number(reels_count) || 0,
        all_media_count: Number(all_media_count) || 0,
    };
}

// mediaFilter.js
function applyMediaTypeFilter(query, media_type) {
    if (media_type === "images") {
        query = query.where(function () {
            this.where("media_url", "like", "%.jpg")
                .orWhere("media_url", "like", "%.jpeg")
                .orWhere("media_url", "like", "%.png");
        });
    }
    else if (media_type === "reels") {
        query = query.where(function () {
            this.where("media_url", "like", "%.mp4")
                .orWhere("media_url", "like", "%.mov")
                .orWhere("media_url", "like", "%.mpeg");
        });
    }

    return query; // Always return query back
}

// generateVideoThumbnail of user post and story
function generateVideoThumbnail(videoPath, folderName) {
    return new Promise((resolve, reject) => {
        const thumbFolder = path.join(
            process.cwd(),
            "public",
            "assets",
            "images",
            "thumbnail",
            folderName
        );

        if (!fs.existsSync(thumbFolder)) fs.mkdirSync(thumbFolder, { recursive: true });

        const thumbName =
            path.basename(videoPath, path.extname(videoPath)) + "-thumb.png";
        const thumbPath = path.join(thumbFolder, thumbName);

        // const ffmpegCmd = `"${ffmpegInstaller.path}" -i "${videoPath}" -ss 00:00:02 -vframes 1 -vf scale=400:300 "${thumbPath}"`;
        const ffmpegCmd = `"${ffmpegInstaller.path}" -i "${videoPath}" -ss 00:00:02 -vframes 1 "${thumbPath}"`;

        exec(ffmpegCmd, (error, stdout, stderr) => {
            if (error) {
                console.error("Thumbnail generation failed:", stderr || error.message);
                reject(error);
            } else {
                resolve(`${thumbName}`);
            }
        });
    });
}




module.exports = { getMediaCounts, applyMediaTypeFilter, generateVideoThumbnail };
const express = require("express");
const router = express.Router();

const fs = require("fs");

const { uploader, s3 } = require("../middleware");

const { addImage } = require("../db");

// / / / / / / / I M A G E  / / / / / / /
router.post("/images", uploader.single("file"), (req, res) => {
    //req.file available from multer
    // console.log("file here", req.file);
    // console.log("req body here", req.body);

    if (req.file) {
        const { filename, mimetype, size, path } = req.file;

        const promise = s3
            .putObject({
                Bucket: "spicedling",
                ACL: "public-read",
                Key: filename, //filename property of the req.file object created by multer = name of file in bucket
                Body: fs.createReadStream(path), //pass path of uploaded file (comes from req.file)
                ContentType: mimetype,
                ContentLength: size,
            })
            .promise(); //returned object has promise method to get one

        promise
            .then(() => {
                //console.log("success");

                addImage({
                    url: `https://s3.amazonaws.com/spicedling/${req.file.filename}`,
                    id: req.session.userId,
                    // // username: req.body.username,
                    // // title: req.body.title,
                    // // description: req.body.description,
                })
                    .then((newImage) => {
                        //console.log("newImg", newImage);
                        //if successfully added to database, write json for img fetch irouter.js
                        res.json({
                            success: true,
                            message: "File upload successful",
                            url: `https://s3.amazonaws.com/spicedling/${req.file.filename}`,
                            // description: req.body.description,
                            id: newImage.id,
                        });
                    })
                    .catch((err) => {
                        console.log(err);
                        res.json({ success: false });
                    });
            })
            .catch((err) => {
                console.log(err);
            });
    } else {
        res.json({
            success: false,
            message: "File upload failed",
        });
    }
});

module.exports = router;

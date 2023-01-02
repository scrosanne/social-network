const express = require("express");
const router = express.Router();

const { getUserById, updateUserBio } = require("../db");

// / / / / / / / / / BIO EDITOR / / / / / / / / / / / / / / /

router.post("/bio", (req, res) => {
    const userId = req.session.userId;
    const { newBio } = req.body;

    updateUserBio(newBio, userId).then((bio) => {
        res.json(bio);
    });
});

// / / / / / / /USER ID (START.JS) / / / / / / / / / / / / / /

router.get("/user/id.json", (req, res) => {
    res.json({
        userId: req.session.userId,
    });
    // // res.status(401).json({
    // //     userId: req.session.userId,
    // // });
});

// / / / / / / / / / / / / / / / / / / / / / / / / / / / /

router.get("/user/data.json", (req, res) => {
    getUserById(req.session.userId)
        .then((userData) => {
            res.json({
                userId: req.session.userId,
                firstName: userData.firstname,
                lastName: userData.lastname,
                profilePicUrl: userData.profile_pic_url,
                bio: userData.bio,
            });
        })
        .catch((err) => console.log(err));

    // // if (req.session.userId) {
    // //     return res.json({
    // //         userId: req.session.userId,
    // //         firstName: "lev",
    // //         lastName: "hausen",
    // //         profilePicUrl: "https://picsum.photos/200/300",
    // //     });
    // // }
    // // return res.json({});
});

// / / / / / / / / / / / / / / / / / / / / / / / / / / / /

router.get("/user/:id.json", (req, res) => {
    const userId = req.params.id;

    getUserById(userId)
        .then((userData) => {
            res.json({
                userId: userData.id,
                firstName: userData.firstname,
                lastName: userData.lastname,
                profilePicUrl: userData.profile_pic_url,
                bio: userData.bio,
            });
        })
        .catch((err) => console.log(err));
});

module.exports = router;

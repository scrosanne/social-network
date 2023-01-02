const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const { getUserByEmail, registerUsers } = require("../db");

// / / / / / / / L O G  I N  / / / / / / /
router.post("/login", (req, res) => {
    const { email, password } = req.body.input;

    if (!email || !password) {
        res.json({ success: false });
        return;
    }

    getUserByEmail(email).then((user) => {
        if (bcrypt.compareSync(password, user.password)) {
            req.session.userId = user.id;
            return res.json({ success: true });
        } else {
            res.json({ success: false });
        }
    });
});

// / / / / / / / L O G  O U T  / / / / / / /
router.get("/logout", function (req, res) {
    req.session = null;
    return res.json("logged out");
});

// / / / / R E G I S T R A T I O N / / / /
router.post("/register", (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
        res.json({ success: false });
        return;
    }

    const salt = bcrypt.genSaltSync(); //generate salt
    const hashedRegisterInput = bcrypt.hashSync(password, salt);

    //console.log(req.body);
    registerUsers({
        firstname: firstName,
        lastname: lastName,
        email: email,
        password: hashedRegisterInput,
    })
        .then((userData) => {
            req.session.userId = userData.id;

            //response necessarry, else nothing to fetch!
            if (req.session.userId) {
                res.json({ success: true });
            } else {
                res.json({ success: false });
            }
        })
        .catch((err) => console.log(err));
});

module.exports = router;

const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const cryptoRandomString = require("crypto-random-string"); //for reset code

const {
    getUserByEmail,
    insertResetCode,
    findResetCodeByEmail,
    updatePassword,
} = require("../db");

// / / / / / / / R E S E T  / / / / / / /
//verify email
router.post("/password/reset/start", (req, res) => {
    //const { email } = req.body;
    const email = req.body.input.email;

    //console.log("typed in email:", email);
    getUserByEmail(email).then((result) => {
        if (!result) {
            //no user found by email
            res.json({ success: false });
        } else {
            //1. generate keycode
            const secretCode = cryptoRandomString({
                length: 6,
            });
            //2.1 store email in session-cookie
            req.session.email = email;
            // 2.store in db
            insertResetCode({
                code: secretCode,
                email: email,
            }).then((resetCodeOutput) => {
                //3.log in terminal
                console.log("my reset code: " + resetCodeOutput.code);
                res.json({ success: true });
            });
            //4. send to email
        }
    });
});

//verify code
router.post("/password/reset/verify", (req, res) => {
    const email = req.body.input.email;
    const code = req.body.input.code;
    const password = req.body.input.password;

    //1. find email from before
    //2. is there a code for this email, that is not yet expired?
    //3. Confirm that the code in request body === code from db
    findResetCodeByEmail({ email, code }).then((result) => {
        if (code === result.code) {
            //4. Hash the password
            const salt = bcrypt.genSaltSync(); //generate salt
            const hashedRegisterInput = bcrypt.hashSync(password, salt);

            //5. replace in db
            updatePassword({
                password: hashedRegisterInput,
                email: email,
            }).then((result) => {
                if (result) {
                    res.json({ success: true });
                } else {
                    res.json({ success: false });
                }
            });
        }
    });
});

module.exports = router;

const express = require("express");
const router = express.Router();

const {
    FindPeople,
    getFriendStatus,
    handleFriendRequests,
    getFriendslist,
} = require("../db");

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

router.get("/find-people/:q?", (req, res) => {
    const searchQuery = req.params.q || "";

    FindPeople(searchQuery).then((users) => {
        res.json(users);
    });
});

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

router.get("/friendslist", (req, res) => {
    getFriendslist(req.session.userId).then((result) => {
        res.json(result.rows);
    });
});

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
//friendStatus gets sent back and changes button in useEffect

router.get("/friends/:otherProfileId", (req, res) => {
    getFriendStatus(req.session.userId, req.params.otherProfileId).then(
        (friendStatus) => {
            console.log(friendStatus);
            if (!friendStatus) {
                res.json("none"); //add
                //
            } else if (
                friendStatus.accepted === false &&
                friendStatus.sender_id === req.session.userId
            ) {
                res.json("pendingCancel"); //cancel
                //
            } else if (
                friendStatus.accepted === false &&
                friendStatus.recipient_id === req.session.userId
            ) {
                res.json("pendingAccept"); //accept
                //
            } else if (friendStatus.accepted === true) {
                res.json("friends"); //end
            }
        }
    );
});

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
//for every :action, different query in db
//"add" INSERT
//"accept" UPDATE to true
//"cancel"/"end" DELETE

router.post("/friends/:action/:otherProfileId", (req, res) => {
    handleFriendRequests(
        req.session.userId,
        req.params.otherProfileId,
        req.params.action
    ).then((users) => {
        users ? res.json({ success: true }) : res.json({ success: true });
    });
});

module.exports = router;

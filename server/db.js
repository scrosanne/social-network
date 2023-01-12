const spicedPg = require("spiced-pg");
const { USER, PASSWORD } = process.env;

const user = USER;
const password = PASSWORD;
const database = "socialnetwork";

const db = spicedPg(
    process.env.DATABASE_URL ||
        `postgres:${user}:${password}@localhost:5432/${database}`
);

// / / / / / / /  t a b l e  u s e r s / / / / / / / / / / / 
// / / / / / / / / / / / / / / / / / / / / / / / / / / / / / 

function registerUsers({ firstname, lastname, email, password }) {
    return db
        .query(
            `INSERT INTO users (
                firstname, lastname, email, password)
    VALUES ($1, $2, $3, $4)
    RETURNING *`,
            [firstname, lastname, email, password]
        )
        .then((result) => result.rows[0]);
}

function getUserByEmail(email) {
    return db
        .query("SELECT * FROM users WHERE email = $1", [email])
        .then((result) => result.rows[0]);
}

function getUserById(id) {
    return db
        .query(`SELECT * FROM users WHERE id = $1`, [id])
        .then((result) => result.rows[0]);
}

function addImage({ url, id }) {
    return db.query(
        `UPDATE users 
                        SET profile_pic_url = $1
                        WHERE id = $2`,
        [url, id]
    );
}

function updateUserBio(bio, userId) {
    return db.query(`UPDATE users SET bio=$1 WHERE id=$2 RETURNING bio`, [bio, userId]).then((result) => result.rows);
}

// / / / / / / /  f i n d  p e o p l e / / / / / / / / / / / 
// / / / / / / / / / / / / / / / / / / / / / / / / / / / / / 

function FindPeople(searchterm, limit = 10) {
    return (searchterm == ""
        ? db.query(
            `SELECT * FROM users ORDER BY created_at DESC LIMIT ${limit} `
        )
        : db.query(
            `SELECT * FROM users WHERE firstname ILIKE $1 ORDER BY created_at DESC LIMIT ${limit};`,
            [searchterm + "%"]
        )).then((result) => result.rows);
}

// / / / / / / /  f r i e n d s h i p s / / / / / / / / / / /
// / / / / / / / / / / / / / / / / / / / / / / / / / / / / / 

function getFriendStatus(user1, user2) {
    return db.query(
        `SELECT * FROM friendships
        WHERE (sender_id = $1 AND recipient_id = $2)
        OR (sender_id = $2 AND recipient_id = $1)`,
        [user1, user2]
    ).then((result) => result.rows[0]);
}

function handleFriendRequests(userId, recipId, action) {
    switch(action) {
        case "add":
            return db
                .query(`INSERT INTO friendships (sender_id, recipient_id)
        VALUES ($1, $2)
        RETURNING *`, [userId, recipId])
                .then((result) => result.rows).catch(err => console.log(err));

        case "accept":
            return db
                .query(`UPDATE friendships SET accepted = true
       WHERE (sender_id=$1 AND recipient_id =$2) OR (sender_id=$2 AND recipient_id =$1)  
        `, [userId, recipId])
                .then((result) => result.rows).catch(err => console.log(err));

        case "cancel":
        case "end":
            return db
                .query(`DELETE FROM friendships
       WHERE (sender_id=$1 AND recipient_id =$2) OR (sender_id=$2 AND recipient_id =$1)  
        `, [userId, recipId])
                .then((result) => result.rows).catch(err => console.log(err));

    }
}

function getFriendslist(userId) {
    return db.query(
        `SELECT users.id, firstname, lastname, accepted, profile_pic_url FROM users
JOIN friendships
ON (accepted = true AND recipient_id = $1 AND users.id = friendships.sender_id)
OR (accepted = true AND sender_id = $1 AND users.id = friendships.recipient_id)
OR (accepted = false AND recipient_id = $1 AND users.id = friendships.sender_id)`,
        [userId]
    );
}

// / / / / / / /  m e s s a g e s / / / / / / / / / / / / / / 
// / / / / / / / / / / / / / / / / / / / / / / / / / / / / / 

function addMessage(sender_id, message) {
    return db.query(
        `INSERT INTO messages (sender_id, message) VALUES ($1, $2) RETURNING *`,
        [sender_id, message]
    ).then((result) => result.rows);
}

function getLastMessages() {
    return db.query(
        "SELECT messages.id, messages.sender_id, messages.message, users.firstname, users.lastname, users.profile_pic_url FROM messages JOIN users ON messages.sender_id=users.id ORDER BY messages.created_at DESC LIMIT 10"
    ).then((result) => result.rows);
}


function getLatestMessage() {
    return db.query(
        "SELECT messages.id, messages.sender_id, messages.message, users.firstname, users.lastname, users.profile_pic_url FROM messages JOIN users ON messages.sender_id=users.id ORDER BY id DESC LIMIT 1"
    ).then((result) => result.rows);
        
}

// / / / / / / /  t a b l e  r e s e t c o d e / / / / / / /
// / / / / / / / / / / / / / / / / / / / / / / / / / / / / / 
function insertResetCode({ code, email }) {
    return db
        .query(
            `INSERT INTO resetcode (code, email)
    VALUES ($1, $2)
    ON CONFLICT (email)
    DO UPDATE SET code = $1, created_at=CURRENT_TIMESTAMP
    RETURNING *
        `,
            [code, email]
        )
        .then((result) => result.rows[0]);
}

function findResetCodeByEmail({ email, code }) {
    return db.query(
        `SELECT * FROM resetcode 
        WHERE email = $1 AND code = $2
        `,
        [email, code]
    ).then((result) => result.rows[0]);
}
// AND CURRENT_TIMESTAMP = created_at < INTERVAL '10 minutes'

function updatePassword({ password, email }) {
    return db.query(
        `UPDATE users 
                        SET password = $1
                        WHERE email = $2`,
        [password, email]
    );
}

module.exports = {
    registerUsers,
    getUserByEmail,
    getUserById,

    FindPeople,

    insertResetCode,
    findResetCodeByEmail,

    addImage,
    updatePassword,
    updateUserBio,

    handleFriendRequests,
    getFriendStatus,
    getFriendslist,

    getLastMessages,
    addMessage,
    getLatestMessage
};

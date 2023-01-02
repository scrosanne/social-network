require("dotenv").config();

const express = require("express");
const app = express();
const server = require("http").Server(app); //for socket.io

const compression = require("compression");
const path = require("path");
const { PORT = 3001 } = process.env;

// / / d b / / / / / / / / / / / /
const { getLastMessages, addMessage, getLatestMessage } = require("./db");
// / / r o u t e r / / / / / / / / / / / /
const friendsRouter = require("./routes/friends");
const registerRouter = require("./routes/register");
const resetRouter = require("./routes/reset");
const imageRouter = require("./routes/image");
const userdataRouter = require("./routes/userdata");

// / / c o o k i e  s e s s i o n / / / / /
const cookieSession = require("cookie-session");

const cookieSessionMiddleware = cookieSession({
    secret: `I'm always angry.`,
    maxAge: 1000 * 60 * 60 * 24 * 14,
});

// / / socket / / / / / / / / / / / / / /
const io = require("socket.io")(server, {
    allowRequest: (req, callback) =>
        callback(null, req.headers.referer.startsWith("http://localhost:3000")),
});

app.use(cookieSessionMiddleware);

io.use((socket, next) => {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

// / / m i d d l e w a r e / / / / / / /
app.use(compression());

app.use(express.json()); //server parses incoming json/application requests

app.use(express.static(path.join(__dirname, "..", "client", "public")));

app.use(friendsRouter);
app.use(registerRouter);
app.use(resetRouter);
app.use(imageRouter);
app.use(userdataRouter);

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

//connection event
io.on("connection", (socket) => {
    const userId = socket.request.session.userId;

    //Confirm user is logged in by finding id in socket.request.session, if not: disconnect
    if (!userId) {
        return socket.disconnect(true);
    }

    //Retrieve the last 10 messages + emit event for client
    getLastMessages().then((lastMsgs) => {
        console.log("last msgs", lastMsgs);
        //'chatMessages' event must be emitted to the one socket that just connected
        socket.emit("latestChatMessages", lastMsgs);
    });

    //Listen for message event that client will emit to send a chat message with socket.on()
    socket.on("newMessage", (message) => {
        //store newMessage in database
        addMessage(userId, message).then(() => {
            //get last one with user info + emit
            getLatestMessage().then((latestMsg) => {
                socket.emit("chatMessage", latestMsg);
            });
        });
    });
});

// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

//catch all route
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

server.listen(PORT, function () {
    console.log(`Express server listening on port ${PORT}`);
});

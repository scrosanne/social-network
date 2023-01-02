import { io } from "socket.io-client";
//import action creators from chatSlice
import { chatMsgReceived, chatMsgsReceived } from "./redux/chat/chatSlice";

//socket object gets passed to Chat.jsx, to be able to call socket.emit()
export let socket;

//gets passed redux store in start.js, so it has access to the dispatch function
export const init = (store) => {
    //socket connection with the server must be established, when logged in user first arrives
    if (!socket) {
        socket = io.connect();

        socket.on("latestChatMessages", (messages) => {
            return store.dispatch(chatMsgsReceived(messages));
        });

        socket.on("chatMessage", (msg) => {
            return store.dispatch(chatMsgReceived(msg));
        });
    }
};

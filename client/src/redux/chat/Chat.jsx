import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

//import socket object, to call socket.emit()
import { socket } from "../../socket";

export default function Chat() {
    const [message, setMessage] = useState("");

    //retrieve chat messages from the Redux state (dispatched in socket.js)
    const messages = useSelector((state) => {
        console.log("hi state", state);
        return state.chat;
    });

    // // //listens to emitted event from server, already done and dispatched in socket.js
    // // socket.on("latestChatMessages", (lastMsgs) => {
    // //     console.log(lastMsgs);
    // // });

    const msgInputChange = (e) => {
        setMessage(e.target.value);
    };

    const msgSend = () => {
        //emit event that server listens to with socket.on
        socket.emit("newMessage", message.trim());
        setMessage(""); //clear input field
    };

    return (
        <div className="chat">
            <h2>chatroom</h2>
            {/* I N P U T  A R E A */}
            <div>
                <div className="send-area">
                    <textarea
                        name="message"
                        placeholder="write smth here "
                        onChange={(e) => msgInputChange(e)}
                        value={message}
                    ></textarea>
                    <button className="friends-btn" onClick={() => msgSend()}>
                        Send
                    </button>
                </div>
            </div>

            {/* L A S T  M E S S A G E S*/}
            <ul>
                {messages?.map((message) => {
                    return (
                        <li key={message.id}>
                            <div className="friend-result-pic">
                                <img src={message.profile_pic_url} alt="" />
                            </div>

                            <div className="message">
                                <p>{message.message}</p>

                                <p>
                                    {message.firstname} {message.lastname}
                                </p>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

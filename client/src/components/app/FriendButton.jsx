import { useParams } from "react-router";
import { useState, useEffect } from "react";

export default function FriendButton() {
    const otherProfileId = useParams().id;
    const [btnState, setBtnState] = useState("add"); //add, cancel, accept, end

    //checks state and sets button accordingly
    useEffect(() => {
        fetch(`/friends/${otherProfileId}`, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((status) => {
                switch (status) {
                    case "none":
                        setBtnState("add");
                        break;
                    case "pendingCancel":
                        setBtnState("cancel");
                        break;
                    case "pendingAccept":
                        setBtnState("accept");
                        break;
                    case "friends":
                        setBtnState("end");
                        break;
                }
            });
    });

    //post request on click, action depending on current state/button
    //after success updates button
    const postRequest = (e) => {
        fetch(`/friends/${btnState}/${otherProfileId}`, {
            method: "POST",
        })
            .then((res) => res.json())
            .then((status) => {
                //update btn depending on before status if action was successful
                if (status.success) {
                    switch (btnState) {
                        case "add":
                            setBtnState("cancel");
                            break;
                        case "cancel":
                        case "end":
                            setBtnState("add");
                            break;
                        case "accept":
                            setBtnState("end");
                            break;
                    }
                }
            });
    };

    return (
        <div>
            <button className="friends-btn" onClick={(e) => postRequest(e)}>
                {btnState}
            </button>
        </div>
    );
}

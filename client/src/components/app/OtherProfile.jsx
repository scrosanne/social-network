import { useState, useEffect } from "react";
import { useParams } from "react-router";
import FriendButton from "./FriendButton.jsx";

export default function OtherProfile() {
    const [user, setUser] = useState({});

    const { id } = useParams(); //get id from url

    useEffect(() => {
        fetch(`/user/${id}.json`)
            .then((res) => res.json())
            .then((user) => {
                if (user) {
                    setUser(user);
                    //"success true"
                } else {
                    //"success false"
                }
            });
    }, []);

    return (
        <div className="profile">
            <div className="profile-pic-big">
                <img src={user.profilePicUrl} alt={user.lastName} />
            </div>

            <div className="user-info">
                <h1>
                    {user.firstName} {user.lastName}
                </h1>
                <p>{user.bio}</p>
                <FriendButton />
            </div>
        </div>
    );
}

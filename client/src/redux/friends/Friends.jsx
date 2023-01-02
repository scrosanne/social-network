import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { allFriends, acceptFriendship, endFriendship } from "./friendsSlice";

export default function Friends() {
    const dispatch = useDispatch();

    const requests = useSelector((state) => {
        //if state.friends(redux store holds friends array) --> filter!
        return (
            state.friends && state.friends.filter((friend) => !friend.accepted)
        );
    });

    //Grab the friends from the Redux store
    const friends = useSelector((state) => {
        return (
            state.friends && state.friends.filter((friend) => friend.accepted)
        );
    });

    useEffect(() => {
        fetch("/friendslist")
            .then((result) => result.json())
            .then((friendsArray) => {
                console.log(friendsArray);
                dispatch(allFriends(friendsArray));
            });
    }, []);

    const acceptFriend = (id) => {
        fetch(`/friends/accept/${id}`, {
            method: "POST",
        }).then(() => {
            ////dispatch action to reducer
            const action = acceptFriendship(id);
            dispatch(action);
        });
    };

    const endFriend = (id) => {
        fetch(`/friends/end/${id}`, {
            method: "POST",
        }).then(() => {
            dispatch(endFriendship(id));
        });
    };

    return (
        <div>
            <h2>Friendship Requests</h2>
            <div className="search-results">
                <ul>
                    {requests?.map((request) => {
                        return (
                            <li key={request.id}>
                                <div className="friend-result-pic">
                                    <img src={request.profile_pic_url} alt="" />
                                </div>
                                <h5>
                                    {request.firstname} {request.lastname}
                                </h5>
                                <button
                                    className="friends-btn"
                                    onClick={() => acceptFriend(request.id)}
                                >
                                    Accept
                                </button>
                                <button
                                    className="friends-btn"
                                    onClick={() => endFriend(request.id)}
                                >
                                    Decline
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </div>

            <h2>Your Friends</h2>
            <div className="search-results">
                <ul>
                    {friends?.map((request) => {
                        return (
                            <li key={request.id}>
                                <div className="friend-result-pic">
                                    <img src={request.profile_pic_url} alt="" />
                                </div>
                                <h5>
                                    {request.firstname} {request.lastname}
                                </h5>
                                <button
                                    className="friends-btn"
                                    onClick={() => endFriend(request.id)}
                                >
                                    End
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}

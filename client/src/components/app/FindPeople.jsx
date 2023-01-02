import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function FindFriends() {
    //funtion call returns array with two elements
    //first = state itself //second = setState method

    const [query, setQuery] = useState(""); //search query
    const [friends, setFriends] = useState([]); //store filtered friends

    //put search term into query state
    const getSearchQuery = (e) => {
        setQuery(e.currentTarget.value);
    };

    const navigate = useNavigate();

    const showPublicProfile = (e, id) => {
        navigate(`/user/${id}`);
    };

    useEffect(() => {
        fetch(`/find-people/${query}`)
            .then((res) => res.json())
            .then((users) => {
                if (users) {
                    console.log(users);
                    //"success true"
                    setFriends([...users]); //content of users array into friends ...
                } else {
                    //"success false"
                }
            });
    }, [query]);

    return (
        <div className="find-people">
            <div>
                {/* <h2>Find Friends</h2> */}
                <input
                    onChange={(e) => getSearchQuery(e)}
                    type="text"
                    name="query"
                    id=""
                />
            </div>

            {/* //iterate though friends state array and render in ul */}
            <div className="search-results">
                <ul>
                    {friends.map((friend) => {
                        return (
                            <li key={friend.id}>
                                <div
                                    className="friend-result-pic"
                                    onClick={(e) =>
                                        showPublicProfile(e, friend.id)
                                    }
                                >
                                    <img src={friend.profile_pic_url} alt="" />
                                </div>
                                <h5>{`${friend.firstname} ${friend.lastname}`}</h5>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}

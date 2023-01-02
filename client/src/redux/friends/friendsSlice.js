// * * * * * * * * * * * * R E D U C E R * * * * * * * * * * * *
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
export default function friendsReducer(friends = [], action) {
    if (action.type == "friends/all") {
        return [...action.payload];
    }

    if (action.type == "friends/accept") {
        let updatedFriendlist = friends.map((friend) => {
            if (friend.id === action.payload) {
                return { ...friend, accepted: true };
            }
            return friend;
        });
        return updatedFriendlist;
    }

    if (action.type == "friends/end") {
        let updatedFriendlist = friends.filter((friend) => {
            return friend.id != action.payload;
        });
        return updatedFriendlist;
    }

    //return new state (not! modified)
    return friends;
}

// * * * * * * * * * A C T I O N  C R E A T O R S * * * * * *
// * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

// 1. update state with data from server, Payload: all friends & requests.
export function allFriends(friendsArray) {
    return {
        type: "friends/all",
        payload: friendsArray,
    };
}

// 2. accept a single friend, Payload: the friend's id.
export function acceptFriendship(id) {
    return {
        type: "friends/accept",
        payload: id,
    };
}

// 3. unfriend a single friend, Payload: the friend's id.
export function endFriendship(id) {
    return {
        type: "friends/end",
        payload: id,
    };
}

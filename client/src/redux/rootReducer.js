import { combineReducers } from "redux";
import friendsReducer from "./friends/friendsSlice";
import messagesReducer from "./chat/chatSlice";

//combine sub-reducer functions into one root reducer
const rootReducer = combineReducers({
    friends: friendsReducer,
    chat: messagesReducer,
});

export default rootReducer;

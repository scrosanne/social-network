// * * * * * * * * * * * * R E D U C E R * * * * * * * * * * * *
export default function messagesReducer(messages = [], action) {
    if (action.type == "msg/received") {
        console.log(messages);
        console.log(action.payload);
        let updatedMessages = messages.concat(action.payload);
        return updatedMessages;
    }

    if (action.type == "msgs/received") {
        return action.payload;
    }

    return messages;
}

// * * * * * * * * * A C T I O N  C R E A T O R S * * * * * * * *
export function chatMsgReceived(message) {
    return {
        type: "msg/received",
        payload: message,
    };
}

export function chatMsgsReceived(messages) {
    return {
        type: "msgs/received",
        payload: messages,
    };
}

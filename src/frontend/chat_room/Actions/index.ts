import {IUserProps} from "../../shared/interfaces/IUserProps";
import {Action, Dispatch} from "redux";
import {chatRoomStore} from "../components/App";

export enum ChatRoomActions{
    RECEIVE_INITIAL_MESSAGE,
    SEND_MESSAGE,
    SEND_MESSAGE_PENDING,
    SEND_MESSAGE_ERROR
}

export const sendMessage = (text: string, sender: IUserProps) => {
    return function (dispatch: Dispatch<Action>) {
        dispatch({
            type: ChatRoomActions.SEND_MESSAGE_PENDING,
            message: text,
            sender: sender
        });

        fetch('/api/v1/chats', {
            // TODO
        }).then((res) => {
            dispatch({
                type: ChatRoomActions.SEND_MESSAGE,
                message:text,
                sender: sender
            })
        }).catch((err) => {
            dispatch({
                type: ChatRoomActions.SEND_MESSAGE_ERROR,
                message:text,
                sender: sender
            })
        })
    }

};

export const getInitialMessages = () => {
    return async function(dispatch: Dispatch<Action>) {
        let res = await fetch('/api/v1/chats');
        let data = await res.json();
        let messages = data.allMessages;
        dispatch({
            type: ChatRoomActions.RECEIVE_INITIAL_MESSAGE,
            message: messages,
        })
    }
};

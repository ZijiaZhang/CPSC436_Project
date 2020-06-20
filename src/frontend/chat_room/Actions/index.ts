import {IUserProps} from "../../shared/interfaces/IUserProps";

export enum ChatRoomActions{
    RECEIVE_MESSAGE,
    SEND_MESSAGE
}

export const sendMessage = (text: string, sender: IUserProps) => {
    return {
        type: ChatRoomActions.SEND_MESSAGE,
        message: text,
        sender: sender
    };
};

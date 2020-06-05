import * as React from 'react';
import {ChatRoomChatArea} from "./ChatRoomChatArea";
import {MessageStatus} from "./ChatRoomBubbles";
import {ChatRoomInputBox} from "./ChatRoomInputBox";
import {ChatRoomSendButton} from "./ChatRoomSendButton";
import {ChatRoomTitle} from "./ChatRoomTitle";


const ChatRoom = () => {   //this is how you make a functional component
  return (
      <div>
          <ChatRoomTitle name={'Gary'}/>
        <ChatRoomChatArea messages={[{message: "Hello", status : MessageStatus.RECEIVED},
                                      {message: "Hello", status : MessageStatus.SENT},
          {message: "Hello", status : MessageStatus.NOT_SENT} ]} />
      <div className={'chat-room-input-area'}>
        <ChatRoomInputBox/>
        <ChatRoomSendButton/>
      </div>
      </div>
  );
};

export default ChatRoom;

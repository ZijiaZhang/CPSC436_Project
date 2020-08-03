import * as React from 'react';
import {applyMiddleware, createStore} from "redux";
import reducer from "../reducer"
import thunk from "redux-thunk";
import {Provider} from "react-redux";
import ChatList from "./ChatList";

export const chatsPageStore = createStore(reducer, applyMiddleware(thunk));

class ChatsPage extends React.Component<{}, {}> {
    render() {
        return <Provider store={chatsPageStore}>
            <div>
                <button>+</button>
                <ChatList/>
            </div>
        </Provider>
    }
}

export default ChatsPage;

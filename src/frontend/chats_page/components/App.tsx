import * as React from 'react';
import {applyMiddleware, createStore} from "redux";
import reducer from "../reducer"
import thunk from "redux-thunk";
import {Provider} from "react-redux";
import ChatList from "./ChatList";
import CreateGroupForm from "./CreateGroupForm";

export const chatsPageStore = createStore(reducer, applyMiddleware(thunk));

interface IChatPageState {
    isCreateGroupOpened: boolean
}

class ChatsPage extends React.Component<{}, IChatPageState> {
    constructor(props: {}) {
        super(props);
        this.state = {isCreateGroupOpened: false}
    }

    render() {
        return <Provider store={chatsPageStore}>
            {this.state.isCreateGroupOpened ?
                <CreateGroupForm closeForm={this.closeCreateGroupForm}/>
                :
                <div>
                    <button onClick={this.openCreateGroupForm}>+</button>
                    <ChatList/>
                </div>
            }
        </Provider>
    }

    openCreateGroupForm = () => {
        this.setState({isCreateGroupOpened: true});
    };

    closeCreateGroupForm = () => {
        this.setState({isCreateGroupOpened: false});
    }
}

export default ChatsPage;

import * as React from 'react';
import FriendsPanelItem from "./FriendsPanelItem";
import {IUserProps} from "../interfaces/IUserProps";


export interface IFriendsPanelProps {
    friends: IUserProps[]
}

class FriendsPanel extends React.Component<IFriendsPanelProps, {}> {
    public rightCollapse = React.createRef<HTMLDivElement>();
    width: number = 0;

    toggleFriendList = () => {
        const node = this.rightCollapse.current;
        if (node) {
            this.width = this.width || node.clientWidth;
            node.style.width = node.style.width =='0px' ? this.width.toString() :'0px';
        }
    };

    render() {
        return (
            <div>
                <a className="glyphicon glyphicon-search right-open-button" onClick={() => this.toggleFriendList()}/>
                <div ref={this.rightCollapse} className="right_collapse">
                <ul className="myFriend">
                    <p> Friends</p>
                    {this.props.friends.map((friend) => <FriendsPanelItem key={friend.name} avatarPath={friend.avatarPath} name={friend.name}/>)}
                </ul>
                </div>
            </div>
            
        );
    }
}

export default FriendsPanel;

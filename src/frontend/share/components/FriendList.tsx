import * as React from 'react';
import FriendBanner, {FriendBannerProps} from "./FriendBanner";


export interface FriendListProps {
    friends: FriendBannerProps[]
}

class FriendList extends React.Component<FriendListProps, {}> {
    public right_panel = React.createRef<HTMLDivElement>();
    collapseRight = () => {
        const node = this.right_panel.current;
        if (node) {
        node.style.display = 'None';
        }
    };

    openRight = () => {
        const node = this.right_panel.current;
        if (node) {
            node.style.display = 'Block';
        }
    };

    render() {
        return (
            <div>
                <a className="glyphicon glyphicon-user right-open-button" onClick={() => this.openRight()}/>
                <div ref={this.right_panel}>
                    <a className="closebtn right-close-button" onClick={() => this.collapseRight()}>&times;</a>
                <ul className="myFriend">
                    <p> Friends</p>
                    {this.props.friends.map((friend) => <FriendBanner key={friend.name} image_path={friend.image_path} name={friend.name}/>)}
                </ul>
                </div>
            </div>
            
        );
    }
}

export default FriendList;

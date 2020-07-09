import React from "react";
import {IUser} from "../../posts_page/components/UserBlock";

interface IProfileFriendBlockProps{
    friend: IUser
}

class ProfileFriendBlock extends React.Component<IProfileFriendBlockProps, {}>{
    render() {
        return (
            <div>
                <div className="settings-user-block">
                    <div className="settings-user-block-user-info">
                        <img className="settings-user-block-avatar" src={this.props.friend.avatarPath} alt="img not found"/>
                        <p className="settings-user-block-name">{this.props.friend.name}</p>
                    </div>
                    <div className="settings-user-block-interactions">
                        <button className="settings-user-block-message-button">More</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProfileFriendBlock;

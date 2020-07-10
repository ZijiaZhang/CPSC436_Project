import React, {CSSProperties} from "react";
import {IUser} from "../../posts_page/components/UserBlock";
import Dropdown from "react-bootstrap/Dropdown";

interface IProfileFriendBlockProps{
    friend: IUser
}

class ProfileFriendBlock extends React.Component<IProfileFriendBlockProps, {}>{

    render() {
        let dropDownStyle: CSSProperties = {
            color: 'royalblue',
            background: 'none',
            border: 'none',
            width: '15px',
            paddingRight: '24px'
        };
        return (
            <div>
                <div className="settings-user-block">
                    <div className="settings-user-block-user-info">
                        <img className="settings-user-block-avatar" src={this.props.friend.avatarPath} alt="img not found"/>
                        <p className="settings-user-block-name">{this.props.friend.name}</p>
                    </div>
                    <div className="settings-user-block-interactions">
                        <Dropdown>
                            <Dropdown.Toggle className="settings-user-block-message-button" style={dropDownStyle} variant="success" id="dropdown-basic">
                                <span className={"glyphicon glyphicon-option-horizontal"} />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item className="profile-drop-down-button">
                                    <span className={'glyphicon glyphicon-user'}/> Add Friend</Dropdown.Item>
                                <Dropdown.Item className="profile-drop-down-button">
                                    <span className={'fa fa-comments-o'}/> Send Message</Dropdown.Item>
                                <Dropdown.Item className="profile-drop-down-button">
                                    <span className={'fa fa-share-square-o'}/> See Profile</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProfileFriendBlock;

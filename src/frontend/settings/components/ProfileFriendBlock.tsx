import React from "react";
import {IUser} from "../../../shared/ModelInterfaces";
import {connect} from "react-redux";
import {loadDisplayedFriends, loadDisplayedUser} from "../actions";
import {Link} from "react-router-dom";
import {getManyUsersInfo} from "../../shared/globleFunctions";

interface IProfileFriendBlockProps{
    friend: IUser,
    displayedUser: IUser,
    displayedFriends: IUser[]
    loadDisplayedFriends: any,
    loadDisplayedUser: any,
    isSettingsPage: boolean,
    updatePostList: any
}

class ProfileFriendBlock extends React.Component<IProfileFriendBlockProps, {}>{

    constructor(props: IProfileFriendBlockProps) {
        super(props);
    }

    gotoUserProfile = async () => {
        this.props.loadDisplayedUser(this.props.friend);
        let friendInfoList: IUser[] = await getManyUsersInfo(this.props.friend.friendUsernames);
        this.props.loadDisplayedFriends(friendInfoList);
        await this.props.updatePostList();
    };

    render() {
        return (
            <div className="settings-user-block" key={this.props.friend._id}>
                {this.props.isSettingsPage ?
                    <Link to={"/settings"} onClick={this.gotoUserProfile}>
                        <div className="settings-user-block-user-info">
                            <img className="settings-user-block-avatar" src={this.props.friend.avatarPath ? this.props.friend.avatarPath : "./images/photoP.png"} alt="img not found"/>
                            <p className="settings-user-block-name">{this.props.friend.fullname}</p>
                        </div>
                    </Link>
                    :
                    <div>
                        <div className="settings-user-block-user-info">
                            <img className="settings-user-block-avatar" src={this.props.friend.avatarPath ? this.props.friend.avatarPath : "./images/photoP.png"} alt="img not found"/>
                            <p className="settings-user-block-name">{this.props.friend.fullname}</p>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

const mapStateToProps = (state: {displayedUser: any, displayedFriends: any }) => {
    return {
        displayedUser: state.displayedUser,
        displayedFriends: state.displayedFriends
    };
};

export default connect(mapStateToProps, {loadDisplayedFriends, loadDisplayedUser})(ProfileFriendBlock);

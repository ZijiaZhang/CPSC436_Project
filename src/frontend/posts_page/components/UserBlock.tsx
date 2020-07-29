import React, {CSSProperties} from "react";
import {connect} from "react-redux";
import {loadUserFriends, loadUserInfo, loadDisplayedUser, loadDisplayedFriends} from "../../settings/actions";
import {getManyUsersInfo, updateUserInfo} from "../../shared/globleFunctions";
import {IUser} from "../../../shared/ModelInterfaces";
import {Link} from "react-router-dom";
import {AddFriendRecUser} from "../actions";
import Dropdown from "react-bootstrap/Dropdown";
import {requestAPIJson} from "../../shared/Networks";

interface IUserBlockProps {
    displayedUser: IUser,
    loadUserInfo: any,
    userInfo: IUser,
    userFriends: any,
    loadUserFriends: any,
    AddFriendRecUser: any,
    loadDisplayedUser: any,
    loadDisplayedFriends: any,
    viewProfile: any,
    setPersonalPageUser: any
}

class UserBlock extends React.Component<IUserBlockProps, {}> {

    constructor(props: IUserBlockProps) {
        super(props);
        this.state = {
        };
    };

    addFriend = async () => {
        if (!this.props.userInfo.friendUsernames.includes(this.props.displayedUser.username)
            && !this.props.displayedUser.friendUsernames.includes(this.props.userInfo.username)
            && !this.props.userInfo.blackListUserIds.includes(this.props.displayedUser._id)
            && !this.props.displayedUser.blackListUserIds.includes(this.props.userInfo._id)) {
            let userFriends = this.props.userInfo.friendUsernames.slice();
            let friendFriends = this.props.displayedUser.friendUsernames.slice();
            userFriends.push(this.props.displayedUser.username);
            friendFriends.push(this.props.userInfo.username);
            await this.updateUserInfo(userFriends, friendFriends);
        }
    };

    updateUserInfo = async (userFriends: string[], friendFriends: string[]) => {
        let updatedUser = {
            friendUsernames: userFriends
        };
        let updatedFriend = {
            friendUsernames: friendFriends
        };
        let responseUserData = await updateUserInfo(this.props.userInfo.username, updatedUser);
        let responseFriendData = await updateUserInfo(this.props.displayedUser.username, updatedFriend);
        let friendsInfo = await getManyUsersInfo(responseUserData.friendUsernames);
        this.props.loadUserInfo(responseUserData);
        this.props.loadUserFriends(friendsInfo);
        this.props.AddFriendRecUser(this.props.displayedUser.username, responseFriendData.friendUsernames);
    };

    deleteFriend = async () => {
        if (this.props.userInfo.friendUsernames.includes(this.props.displayedUser.username)
        && this.props.displayedUser.friendUsernames.includes(this.props.userInfo.username)) {
            let userIndex = this.props.userInfo.friendUsernames.indexOf(this.props.displayedUser.username);
            let friendIndex = this.props.displayedUser.friendUsernames.indexOf(this.props.userInfo.username);
            let userFriends = this.props.userInfo.friendUsernames.slice();
            let friendFriends = this.props.displayedUser.friendUsernames.slice();
            userFriends.splice(userIndex, 1);
            friendFriends.splice(friendIndex, 1);
            await this.updateUserInfo(userFriends, friendFriends);
        }
    };

    updateBlacklist = async () => {
        let newBlacklist: any[];
        if (this.props.userInfo.blackListUserIds.includes(this.props.displayedUser._id)) {
            let userBlacklistIndex = this.props.userInfo.blackListUserIds.indexOf(this.props.displayedUser._id);
            newBlacklist = this.props.userInfo.blackListUserIds.slice();
            newBlacklist.splice(userBlacklistIndex, 1);
        } else {
            newBlacklist = this.props.userInfo.blackListUserIds.slice().concat(this.props.displayedUser._id);
            if (this.props.userInfo.friendUsernames.includes(this.props.displayedUser.username)) {
                await this.deleteFriend();
            }
        }
        const update = {
            blackListUserIds: newBlacklist
        };
        let responseUserData = await updateUserInfo(this.props.userInfo.username, update);
        this.props.loadUserInfo(responseUserData);
    };

    getMutualFriends = () => {
        let numMutual = 0;
        for (let user of this.props.userInfo.friendUsernames) {
            for (let display of this.props.displayedUser.friendUsernames) {
                if (user === display) {
                    numMutual++;
                }
            }
        }
        return numMutual;
    };

    gotoUserProfile = async () => {
        this.props.loadDisplayedUser(this.props.displayedUser);
        let friendInfoList: IUser[] = await getManyUsersInfo(this.props.displayedUser.friendUsernames);
        this.props.loadDisplayedFriends(friendInfoList);
        this.props.viewProfile();
    };

    gotoUserPosts = () => {
        this.props.setPersonalPageUser(this.props.displayedUser);
    };

    render() {
        const dropDownButtonStyle: CSSProperties = {
            background: "lightskyblue",
            color: "black",
            marginRight: "10px",
            borderRadius: "3px",
            padding: "0 8px"
        };
        const dropDownStyle: CSSProperties = {
            display: "inline-block",
            float: "right",
            marginRight: "10px",
        };
        const dropDownMenuStyle: CSSProperties = {
            width: "200px"
        };
        const numMutual = this.getMutualFriends();
        return (
            <div className="post-block" key={this.props.displayedUser._id}>
                <div className="user-block-user-info">
                    <img className="user-block-avatar" src={this.props.displayedUser.avatarPath ? this.props.displayedUser.avatarPath : './images/photoP.png'} alt="img not found"/>
                    <div className="user-block-user-detail">
                        {
                            numMutual === 0 ?
                                <p className="user-block-name">{this.props.displayedUser.fullname}</p>
                                :
                                <div>
                                    <p className="user-block-name">{this.props.displayedUser.fullname}</p>
                                    <p className="user-block-mutual-friends">{numMutual} mutual friends</p>
                                </div>
                        }
                    </div>
                </div>
                <div className="user-block-interactions">
                    {this.props.userInfo.friendUsernames.includes(this.props.displayedUser.username) ?
                        <button className="user-block-friends-button" onClick={this.deleteFriend}>
                            <span className="fa fa-check" /> Friends</button>
                        :
                        <button className="user-block-stranger-button" onClick={this.addFriend}>
                            <span className={'fa fa-user-plus'} /> Add Friend</button>}
                    <Link to={{pathname: "/chatRoom", search: "?user=" +this.props.displayedUser.username}}>
                        <button className="user-block-message-button">
                            <span className={'fa fa-comments-o'}/> Send Message
                        </button>
                    </Link>
                    <Dropdown style={dropDownStyle}>
                        <Dropdown.Toggle className="user-block-message-button" style={dropDownButtonStyle} variant="success" id="dropdown-basic">
                            More <span className={'fa fa-sort-down'} id="profile-button-more-icon"/>
                        </Dropdown.Toggle>
                        <Dropdown.Menu style={dropDownMenuStyle}>
                            <Dropdown.Item className="profile-drop-down-button" onClick={this.gotoUserProfile}>
                                <span className={'fa fa-id-card-o'} /> View Profile</Dropdown.Item>
                            <Dropdown.Item className="profile-drop-down-button" onClick={this.gotoUserPosts}>
                                <span className={'fa fa-navicon'} />  View Posts</Dropdown.Item>
                            {this.props.userInfo.friendUsernames.includes(this.props.displayedUser.username) ?
                                <Dropdown.Item className="profile-drop-down-button" onClick={this.deleteFriend}>
                                    <span className={'fa fa-user-times'}/> Delete Friend</Dropdown.Item>
                                :
                                ""
                            }
                            {this.props.userInfo.blackListUserIds.includes(this.props.displayedUser._id) ?
                                <Dropdown.Item className="profile-drop-down-button" onClick={this.updateBlacklist}>
                                    <span className={'fa fa-unlock'} /> Remove From Blacklist</Dropdown.Item>
                                :
                                <Dropdown.Item className="profile-drop-down-button" onClick={this.updateBlacklist}>
                                    <span className={'fa fa-lock'} />  Add To Blacklist</Dropdown.Item>
                            }
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: { userInfo: any, userFriends: any }) => {
    return {
        userInfo: state.userInfo,
        userFriends: state.userFriends,
    };
};

export default connect(mapStateToProps, {loadUserInfo, loadUserFriends, AddFriendRecUser, loadDisplayedUser, loadDisplayedFriends})(UserBlock);

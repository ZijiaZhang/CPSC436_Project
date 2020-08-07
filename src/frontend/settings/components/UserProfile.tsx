import React from "react";
import {TagContainer} from "./TagContainer";
import ProfilePostBlock from "./ProfilePostBlock";
import ProfileFriendBlock from "./ProfileFriendBlock";
import SettingsForm from "./SettingsForm";
import {connect} from "react-redux";
import {loadDisplayedFriends, loadDisplayedUser, loadTags, loadUserFriends, loadUserInfo} from "../actions";
import SettingsProfilePhoto from "./SettingsProfilePhoto";
import {getAllTags, getManyUsersInfo, getPostsByUserId, updateUserInfo, userAddFriends, userDeleteFriends} from "../../shared/globleFunctions";
import {IUser} from "../../../shared/ModelInterfaces";
import {Link} from "react-router-dom";
import UserTimeTable from "./UserTimeTable";

interface IUserProfileProps {
    userInfo: IUser,
    loadUserInfo: any,
    curUser: IUser,
    loadUserFriends: any,
    userFriends: any,
    displayedUser: IUser,
    displayedFriends: IUser[],
    loadDisplayedUser: any,
    loadDisplayedFriends: any,
    postList: any[]
    isSettingsPage: boolean,
    loadTags: any
}


interface IUserProfileState {
    infoEditorOpened: boolean,
    avatarEditorOpened: boolean,
    isUser: boolean,
    dropDown: boolean,
    name: string,
    gender: string,
    department: string,
    avatarPath: string,
    major: string,
    level: string,
    tags: any[],
    posts: any[]
}

class UserProfile extends React.Component<IUserProfileProps, IUserProfileState>{
    constructor(props: IUserProfileProps) {
        super(props);
        this.state = {
            infoEditorOpened: false,
            avatarEditorOpened: false,
            isUser: false,
            dropDown: false,
            name: this.props.userInfo.fullname,
            gender: this.props.userInfo.gender,
            department: this.props.userInfo.department,
            avatarPath: this.props.userInfo.avatarPath,
            major: this.props.userInfo.major,
            level: this.props.userInfo.level,
            tags: this.props.userInfo.tags,
            posts: []
        }
    }

    userInfoOnChange = (event: any) => {
        switch (event.target.name) {
            case "name":
                this.setState({name: event.target.value});
                break;
            case "gender":
                this.setState({gender: event.target.value});
                break;
            case "department":
                this.setState({department: event.target.value});
                break;
            case "major":
                this.setState({major: event.target.value});
                break;
            case "level":
                this.setState({level: event.target.value});
                break;
            default:
                break;
        }
    };

    userAvatarOnChange = (newPath: string) => {
        this.setState({avatarPath: newPath});
    };

    interestsOnChange = (newValue: any) => {
        this.setState({tags: newValue});
    };

    async componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
        this.props.loadUserInfo(this.props.curUser);
        const friendInfoList: IUser[] = await getManyUsersInfo(this.props.curUser.friendUsernames);
        this.props.loadUserFriends(friendInfoList);
        if(this.props.isSettingsPage) {
            this.props.loadDisplayedUser(this.props.curUser);
            this.props.loadDisplayedFriends(friendInfoList);
        }
        const postList = await getPostsByUserId(this.props.displayedUser._id, this.props.curUser);
        this.setState({posts: postList});
        const tags = await getAllTags();
        this.props.loadTags(tags);
    }

    convertTagsToOptions = () => {
        let options = [];
        for (let tag of this.props.userInfo.tags) {
            options.push({value: tag.name, label: tag.name})
        }
        return options;
    };

    startEditProfile = () => {
        this.setState({
            name: this.props.userInfo.fullname,
            gender: this.props.userInfo.gender,
            department: this.props.userInfo.department,
            avatarPath: this.props.userInfo.avatarPath,
            major: this.props.userInfo.major,
            level: this.props.userInfo.level,
            tags: this.convertTagsToOptions(),
        });
        this.setState({infoEditorOpened: !this.state.infoEditorOpened});
    };

    startEditAvatar = () => {
        this.setState({
            avatarPath: this.props.userInfo.avatarPath,
        });
        this.setState({avatarEditorOpened: !this.state.avatarEditorOpened});
    };

    showDropDown = () => {
        this.setState({dropDown: true})
    };

    handleClickOutside = (event: any) => {
        if (!event.target.matches('#profile-interaction-button-with-drop-down')
            && !event.target.matches('.profile-drop-down-button')
            && this.state.dropDown) {
            this.setState({dropDown: false})
        }
    };

    updatePostList = async () => {
        const postList = await getPostsByUserId(this.props.displayedUser._id, this.props.curUser);
        this.setState({posts: postList});
        return postList;
    };

    addFriend = async () => {
        if (!this.props.userInfo.friendUsernames.includes(this.props.displayedUser.username)
            && !this.props.displayedUser.friendUsernames.includes(this.props.userInfo.username)
            && !this.props.userInfo.blackListUserIds.includes(this.props.displayedUser._id)
            && !this.props.displayedUser.blackListUserIds.includes(this.props.userInfo._id)) {
            let updatedInfo = {
                user: {
                    username: this.props.userInfo.username,
                    newFriend: this.props.displayedUser.username
                },
                friend: {
                    username: this.props.displayedUser.username,
                    newFriend: this.props.userInfo.username
                }
            };
            let responseData = await userAddFriends(updatedInfo);
            await this.updateUserInfo(responseData);
        }
    };

    updateUserInfo = async (responseData: any) => {
        let friendsInfo = await getManyUsersInfo(responseData[0].friendUsernames);
        this.props.loadUserInfo(responseData[0]);
        this.props.loadUserFriends(friendsInfo);
        this.props.loadDisplayedUser(responseData[1]);
        this.setState({dropDown: false});
    };

    deleteFriend = async () => {
        if (this.props.userInfo.friendUsernames.includes(this.props.displayedUser.username)
            && this.props.displayedUser.friendUsernames.includes(this.props.userInfo.username)) {
            let updatedInfo = {
                user: {
                    username: this.props.userInfo.username,
                    oldFriend: this.props.displayedUser.username
                },
                friend: {
                    username: this.props.displayedUser.username,
                    oldFriend: this.props.userInfo.username
                }
            };
            let responseData = await userDeleteFriends(updatedInfo);
            await this.updateUserInfo(responseData);
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

    render() {
        const postList = this.state.posts.slice();
        const posts = postList.reverse().slice(0,4).map(post =>
            <ProfilePostBlock key={post.id} post={post} user={this.props.displayedUser}/>
        );
        const friends = this.props.displayedFriends.map((friend: any) =>
            <ProfileFriendBlock key={friend._id} friend={friend} isSettingsPage={this.props.isSettingsPage} updatePostList={this.updatePostList}/>
        );
        return (
            <div className="user-profile-page">
                <div className="user-profile-page-avatar-block">
                    <img className="user-avatar" src={this.props.displayedUser.avatarPath ? this.props.displayedUser.avatarPath : './images/photoP.png' } alt="image not found" />
                    {this.props.userInfo.username === this.props.displayedUser.username ?
                        <button className="profile-change-profile-photo" onClick={this.startEditAvatar}>
                            <p className={'fa fa-camera'} id="upload-profile-photo-icon"/>
                            <p className="upload-profile-photo-title">Upload Picture</p>
                        </button>
                        :
                        ""
                    }
                </div>
                <div className="profile-listed-detail-left-block">
                    <p className="profile-detail-user-name">{this.props.displayedUser.fullname}</p>
                    <p className="profile-detail-user-department">{this.props.displayedUser.fullname}, in {this.props.displayedUser.level} of {this.props.displayedUser.department} program</p>
                    <p className="profile-detail-user-major">Major in {this.props.displayedUser.major}</p>
                    <div className="profile-interaction-button-list">
                        {this.props.userInfo.username === this.props.displayedUser.username ?
                            <button className="profile-interaction-button" onClick={this.startEditProfile}>
                                <span className={'fa fa-edit'}/> Edit Profile</button>
                            :
                            <div>
                                {this.props.userInfo.friendUsernames.includes(this.props.displayedUser.username) ?
                                    <button className="profile-interaction-button">
                                        <span className={'fa fa-check"'}/> Friend</button>
                                    :
                                    <button className="profile-interaction-button" onClick={this.addFriend}>
                                        <span className={'fa fa-user-plus'}/> Add Friend</button>}
                                <button className="profile-interaction-button" id="profile-interaction-button-with-drop-down" onClick={this.showDropDown}>
                                    More <span className={'fa fa-sort-down'} id="profile-button-more-icon"/>
                                    <div className="profile-interaction-drop-down-buttons" style={this.state.dropDown ? {display: 'block'} : {display: 'none'}}>
                                        {this.props.userInfo.friendUsernames.includes(this.props.displayedUser.username) ?
                                            <a className="profile-drop-down-button" onClick={this.deleteFriend}>
                                                <span className={'fa fa-user-times'}/> Delete Friend</a>
                                            :
                                            ""}
                                        {this.props.userInfo.blackListUserIds.includes(this.props.displayedUser._id) ?
                                            <a className="profile-drop-down-button" onClick={this.updateBlacklist}>
                                                <span className={'fa fa-unlock'}/> Remove From Blacklist</a>
                                            :
                                            <a className="profile-drop-down-button" onClick={this.updateBlacklist}>
                                                <span className={'fa fa-lock'}/> Add To Blacklist</a>}
                                        <Link className="profile-drop-down-button" to={{pathname: "/chatRoom", search: "?user=" +this.props.displayedUser.username}}>
                                            <span className={'fa fa-comments-o'}/> Send Message
                                        </Link>
                                    </div>
                                </button>
                            </div>}
                    </div>
                </div>
                <div className="profile-listed-detail-right-block">
                    <div className="profile-detail-user-interests">
                        <p className="user-interests-block-title">Interests</p>
                        <div className="user-interests-block-content">
                            <TagContainer tags={this.props.displayedUser.tags} />
                        </div>
                    </div>
                </div>
                <div>
                    <UserTimeTable />
                </div>
                <div className="profile-detail-user-recent-posts">
                    <div className="settings-post-block">
                        <p className="profile-block-title">Recent Posts</p>
                    </div>
                    {posts}
                </div>
                <div className="profile-detail-user-friend-list">
                    <div className="settings-user-block">
                        <p className="profile-block-title">Friend List</p>
                    </div>
                    {friends}
                </div>
                <SettingsForm opened={this.state.infoEditorOpened} interestsOnChange={this.interestsOnChange} userInfoOnChange={this.userInfoOnChange}
                              name={this.state.name} gender={this.state.gender} department={this.state.department}
                              major={this.state.major} level={this.state.level} tags={this.state.tags}/>
                <SettingsProfilePhoto curAvatar={this.state.avatarPath} opened={this.state.avatarEditorOpened} userAvatarOnChange={this.userAvatarOnChange}
                                      avatarPath={this.state.avatarPath}/>
            </div>
        );
    }
}

const mapStateToProps = (state: { userInfo: any, userFriends: any, displayedUser: any, displayedFriends: any, postList: any }) => {
    return {
        userInfo: state.userInfo,
        userFriends: state.userFriends,
        displayedUser: state.displayedUser,
        displayedFriends: state.displayedFriends,
        postList: state.postList,
    };
};

export default connect(mapStateToProps, {loadUserInfo, loadUserFriends, loadDisplayedUser, loadDisplayedFriends, loadTags})(UserProfile);

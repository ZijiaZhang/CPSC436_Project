import React from "react";
import {IUser} from "../../posts_page/components/UserBlock";
import {TagContainer} from "./TagContainer";
import {IPost} from "../../posts_page/components/PostBlock";
import ProfilePostBlock from "./ProfilePostBlock";
import ProfileFriendBlock from "./ProfileFriendBlock";
import SettingsForm from "./SettingsForm";
import {connect} from "react-redux";
import {loadUserFriends, loadUserInfo} from "../actions";
import SettingsProfilePhoto from "./SettingsProfilePhoto";
import {getManyUsersInfo, getUserInfo} from "../../shared/globleFunctions";

interface IUserProfileProps {
    userInfo: IUser,
    loadUserInfo: any,
    curUser: any,
    loadUserFriends: any,
    userFriends: any
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
    tags: string[]
}

const samplePostList: IPost[] = [{
    id: '2',
    time: "2019/10/11 22:22",
    name: "Denise",
    detail: "False modesty is as bad as false pride. Know exactly what you are " +
        "capable of at any moment, and act accordingly. Any other path is folly—and could be deadly in battle.",
    avatarPath: './images/test2.png',
    image: '',
    numLikes: 20,
    comments: [],
    type: 'post',
    visibility: 'public',
    tags: [],
    liked: false,
    hidden: false,
},
    {
        id: '3',
        time: "2019/12/1 4:10",
        name: "Denise",
        detail: "They say truth is the first causality of war.",
        avatarPath: './images/test2.png',
        image: './images/nobu!.png',
        numLikes: 18,
        comments: [],
        type: 'post',
        visibility: 'public',
        tags: [],
        liked: false,
        hidden: false,
    },];

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
            tags: this.props.userInfo.tags
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
        let tagList = [];
        for (let tag of newValue) {
            tagList.push(tag.value);
        }
        this.setState({tags: tagList});
    };

    async componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
        this.props.loadUserInfo(this.props.curUser);
        let friendInfoList: IUser[] = await getManyUsersInfo(this.props.userInfo.friendUsernames);
        this.props.loadUserFriends(friendInfoList);
    }

    startEditProfile = () => {
        this.setState({
            name: this.props.userInfo.fullname,
            gender: this.props.userInfo.gender,
            department: this.props.userInfo.department,
            avatarPath: this.props.userInfo.avatarPath,
            major: this.props.userInfo.major,
            level: this.props.userInfo.level,
            tags: this.props.userInfo.tags,
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
        if (!event.target.matches('#profile-interaction-button-with-drop-down') && !event.target.matches('.profile-drop-down-button')) {
            this.setState({dropDown: false})
        }
    };

    viewAllPosts = () => {
        console.log('view all posts')
    };

    render() {
        const posts = samplePostList.map(post =>
            <ProfilePostBlock post={post} />
        );
        const friends = this.props.userFriends.map((friend: any) =>
            <ProfileFriendBlock friend={friend} />
        );
        return (
            <div className="user-profile-page">
                <div className="user-profile-page-avatar-block">
                    <img className="user-avatar" src={this.props.userInfo.avatarPath ? this.props.userInfo.avatarPath : './images/photoP.png' } alt="image not found" />
                    <button className="profile-change-profile-photo" onClick={this.startEditAvatar}>
                        <p className={'fa fa-camera'} id="upload-profile-photo-icon" />
                        <p className="upload-profile-photo-title">Upload Picture</p>
                    </button>
                </div>
                <div className="profile-listed-detail-left-block">
                    <p className="profile-detail-user-name">{this.props.userInfo.fullname}</p>
                    <p className="profile-detail-user-department">{this.props.userInfo.fullname}, in {this.props.userInfo.level} of {this.props.userInfo.department} program</p>
                    <p className="profile-detail-user-major">Major in {this.props.userInfo.major}</p>
                    <div className="profile-interaction-button-list">
                        <button className="profile-interaction-button" onClick={this.startEditProfile}>
                            <span className={'fa fa-edit'}/> Edit Profile</button>
                        <button className="profile-interaction-button" id="profile-interaction-button-with-drop-down" onClick={this.showDropDown}>
                            More
                            <span className={'fa fa-sort-down'} id="profile-button-more-icon"/>
                            <div className="profile-interaction-drop-down-buttons" style={this.state.dropDown ? {display: 'block'} : {display: 'none'}}>
                                <a className="profile-drop-down-button" onClick={this.viewAllPosts} >
                                    <span className={'glyphicon glyphicon-list-alt'} /> View All Posts</a>
                                <a className="profile-drop-down-button">
                                    <span className={'glyphicon glyphicon-user'}/> View All Friends</a>
                                <a className="profile-drop-down-button">
                                    <span className={'fa fa-comments-o'}/> Send Message</a>
                            </div>
                        </button>
                    </div>
                </div>
                <div className="profile-listed-detail-right-block">
                    <div className="profile-detail-user-interests">
                        <p className="user-interests-block-title">Interests</p>
                        <div className="user-interests-block-content">
                            <TagContainer tags={this.props.userInfo.tags} />
                        </div>
                    </div>
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

const mapStateToProps = (state: { userInfo: any, userFriends: any }) => {
    return {
        userInfo: state.userInfo,
        userFriends: state.userFriends
    };
};

export default connect(mapStateToProps, {loadUserInfo, loadUserFriends})(UserProfile);

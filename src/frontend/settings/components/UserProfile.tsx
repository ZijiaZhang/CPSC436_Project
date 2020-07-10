import React from "react";
import {IUser} from "../../posts_page/components/UserBlock";
import {TagContainer} from "./TagContainer";
import {IPost} from "../../posts_page/components/PostBlock";
import ProfilePostBlock from "./ProfilePostBlock";
import ProfileFriendBlock from "./ProfileFriendBlock";
import SettingsForm from "./SettingsForm";
import {connect} from "react-redux";

interface IUserProfileProps {
    userInfo: IUser
}

interface IUserProfileState {
    opened: boolean,
    isUser: boolean,
    dropDown: boolean,
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

const sampleFriendList =[
    {
        name: 'Will',
        avatarPath: './images/dora.png',
        gender: "male",
        department: "Science",
        major: "Computer Science",
        level: "Bachelor",
        interests: ['music', 'basketball', 'math'],
        friends: ['Denise'],
    },
    {
        name: 'Gary',
        avatarPath: './images/test.png',
        gender: "male",
        department: "Computer Science",
        major: "Computer Science",
        level: "Bachelor",
        interests: ['music', 'basketball', 'math', 'games'],
        friends: ['Rommel', 'Denise', 'Will'],

    },
    {
        name: 'Rommel',
        avatarPath: './images/1.ico',
        gender: "male",
        department: "Science",
        major: "CMJ Computer Science And Math",
        level: "Bachelor",
        interests: ['math', 'coding', 'games'],
        friends: ['Gary', 'Denise'],
    }
];

class UserProfile extends React.Component<IUserProfileProps, IUserProfileState>{
    constructor(props: IUserProfileProps) {
        super(props);
        this.state = {
            opened: false,
            isUser: false,
            dropDown: false,
        }
    }

    startEditProfile = () => {
        this.openCloseEditor();
    };

    openCloseEditor = () => {
        this.setState({opened: !this.state.opened});
    };

    showDropDown = () => {
        this.setState({dropDown: true})
    };

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

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
        const friends = sampleFriendList.map(friend =>
            <ProfileFriendBlock friend={friend} />
        );
        return (
            <div className="user-profile-page">
                <div className="user-profile-page-avatar-block">
                    <img className="user-avatar" src={this.props.userInfo.avatarPath} alt="image not found" />
                </div>
                <div className="profile-listed-detail-left-block">
                    <p className="profile-detail-user-name">{this.props.userInfo.name}</p>
                    <p className="profile-detail-user-department">{this.props.userInfo.name}, in {this.props.userInfo.level} of {this.props.userInfo.department} program</p>
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
                            <TagContainer tags={this.props.userInfo.interests} />
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
                <SettingsForm opened={this.state.opened} />
            </div>
        );
    }
}

const mapStateToProps = (state: { userInfo: any }) => {
    return {
        userInfo: state.userInfo,
    };
};

export default connect(mapStateToProps)(UserProfile);

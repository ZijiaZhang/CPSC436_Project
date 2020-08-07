import React from "react";
import UserBlock from "./UserBlock";
import PostBlock from "./PostBlock";
import {connect} from "react-redux";
import {IComponentsType} from "./HomePage";
import {getAllUsersInfo} from "../../shared/globleFunctions";
import {IUser} from "../../../shared/ModelInterfaces";
import PersonalPage from "./PersonalPage";
import {loadRecommendedUsers} from "../actions";
import Modal from "react-modal";
import UserProfile from "../../settings/components/UserProfile";

interface IComponentsContainerProps {
    postList: any[],
    componentsType: IComponentsType,
    userInfo: IUser,
    savedPosts: any,
    registeredUser: IUser
    recommendedUsers: IUser[],
    loadRecommendedUsers: any,
    getOthersPosts: any
}

interface IComponentsContainerState {
    profileView: boolean,
    viewPageUser: any
}

class ComponentsContainer extends React.Component<IComponentsContainerProps, IComponentsContainerState> {
    constructor(props: IComponentsContainerProps) {
        super(props);
        this.state = {
            profileView: false,
            viewPageUser: undefined
        }
    }

    async componentDidMount() {
        let userList = await getAllUsersInfo(this.props.registeredUser);
        this.props.loadRecommendedUsers(userList);
    }

    viewProfile = () => {
        this.setState({profileView: !this.state.profileView})
    };

    setPersonalPageUser = (user: IUser) => {
        this.setState({viewPageUser: user});
        this.props.getOthersPosts();
    };

    render() {
        let listComponents: any;
        switch (this.props.componentsType) {
            case IComponentsType.posts:
                let postList: any[] = [];
                for (let post of this.props.postList) {
                    if (!this.props.userInfo.hiddenPostIds.includes(post.id)) {
                        postList.push(post);
                    }
                }
                listComponents = postList.reverse().map((post) =>
                    <PostBlock key={post.id} post={post} />
                );
                break;
            case IComponentsType.users:
                const userList: IUser[] = this.props.recommendedUsers.slice();
                listComponents = userList.map((user) =>
                    user.username === this.props.userInfo.username ? "" :
                        <UserBlock key={user._id} displayedUser={user} viewProfile={this.viewProfile} setPersonalPageUser={this.setPersonalPageUser}/>
                );
                break;
            case IComponentsType.personal:
                listComponents = <PersonalPage userDisplayInfo={this.props.userInfo} userInfo={this.props.userInfo}/>;
                break;
            case IComponentsType.others:
                listComponents = <PersonalPage userDisplayInfo={this.state.viewPageUser} userInfo={this.props.userInfo}/>;
        }
        return (
            <div id="all-components">
                {listComponents}
                <Modal isOpen={this.state.profileView} className="post-page-profile-view">
                    <button onClick={this.viewProfile} className="post-page-profile-view-close-button">
                        <span className={'glyphicon glyphicon-remove'} />
                    </button>
                    <UserProfile curUser={this.props.userInfo} isSettingsPage={false} />
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state: { postList: any[], savedPosts: any[], recommendedUsers: any, userInfo: any} ) => {
    return {
        postList: state.postList,
        savedPosts: state.savedPosts,
        recommendedUsers: state.recommendedUsers,
        userInfo: state.userInfo
    };
};

export default connect(mapStateToProps, {loadRecommendedUsers})(ComponentsContainer);

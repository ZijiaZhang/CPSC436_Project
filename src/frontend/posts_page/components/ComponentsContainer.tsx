import React from "react";
import UserBlock from "./UserBlock";
import PostBlock from "./PostBlock";
import {connect} from "react-redux";
import {IComponentsType} from "./HomePage";
import {getAllUsersInfo} from "../../shared/globleFunctions";
import {IPost, IUser} from "../../../shared/ModelInterfaces";
import PersonalPage from "./PersonalPage";
import {loadRecommendedUsers} from "../actions";

interface IComponentsContainerProps {
    postList: IPost[],
    componentsType: IComponentsType,
    registeredUser: IUser,
    savedPosts: any,
    recommendedUsers: IUser[],
    loadRecommendedUsers: any
}

class ComponentsContainer extends React.Component<IComponentsContainerProps, {}> {
    constructor(props: IComponentsContainerProps) {
        super(props);
    }

    async componentDidMount() {
        let userList = await getAllUsersInfo(this.props.registeredUser);
        this.props.loadRecommendedUsers(userList);
    }

    render() {
        let listComponents: any;
        switch (this.props.componentsType) {
            case IComponentsType.posts:
                const postList: IPost[] = this.props.postList.slice().reverse();
                listComponents = postList.map((post) =>
                    <PostBlock post={post} />
                );
                break;
            case IComponentsType.users:
                const userList: IUser[] = this.props.recommendedUsers.slice().reverse();
                listComponents = userList.map((user) =>
                    user.username === this.props.registeredUser.username ? "" :
                        <UserBlock displayedUser={user} />
                );
                break;
            case IComponentsType.personal:
                listComponents = <PersonalPage />;
                break;
        }

        return (
            <div id="all-components">
                {listComponents}
            </div>
        );
    }
}

const mapStateToProps = (state: { postList: IPost[], savedPosts: any[], recommendedUsers: any} ) => {
    return {
        postList: state.postList,
        savedPosts: state.savedPosts,
        recommendedUsers: state.recommendedUsers
    };
};

export default connect(mapStateToProps, {loadRecommendedUsers})(ComponentsContainer);

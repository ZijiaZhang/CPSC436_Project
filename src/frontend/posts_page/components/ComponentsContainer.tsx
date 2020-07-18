import React from "react";
import UserBlock from "./UserBlock";
import PostBlock from "./PostBlock";
import {connect} from "react-redux";
import {IComponentsType} from "./HomePage";
import {getAllUsersInfo} from "../../shared/globleFunctions";
import {IPost, IUser} from "../../../shared/ModelInterfaces";
import PersonalPage from "./PersonalPage";

interface IComponentsContainerProps {
    postList: IPost[],
    componentsType: IComponentsType,
    registeredUser: IUser,
    savedPosts: any;
}

interface IComponentsContainerState {
    userList: IUser[]
}


class ComponentsContainer extends React.Component<IComponentsContainerProps, IComponentsContainerState> {
    constructor(props: IComponentsContainerProps) {
        super(props);
        this.state= {
            userList: []
        }
    }

    async componentDidMount() {
        let userList = await getAllUsersInfo();
        this.setState({userList: userList});
    }

    render() {
        let listComponents: any;
        switch (this.props.componentsType) {
            case IComponentsType.posts:
                const postList: IPost[] = this.props.postList.slice().reverse();
                listComponents = postList.map((post) =>
                    <PostBlock post={post} user={this.props.registeredUser} />
                );
                break;
            case IComponentsType.users:
                const userList: IUser[] = this.state.userList.slice().reverse();
                listComponents = userList.map((user) =>
                    <UserBlock registeredUser={this.props.registeredUser} displayedUser={user} />
                );
                break;
            case IComponentsType.personal:
                listComponents = <PersonalPage user={this.props.registeredUser} savedPosts={this.props.savedPosts}/>;
                break;
        }

        return (
            <div id="all-components">
                {listComponents}
            </div>
        );
    }
}

const mapStateToProps = (state: { postList: IPost[], savedPosts: any[]} ) => {
    return {
        postList: state.postList,
        savedPosts: state.savedPosts
    };
};

export default connect(mapStateToProps)(ComponentsContainer);

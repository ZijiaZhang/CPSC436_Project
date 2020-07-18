import React from "react";
import UserBlock, {IUser} from "./UserBlock";
import PostBlock, {IPost} from "./PostBlock";
import {connect} from "react-redux";
import {IComponentsType} from "./HomePage";
import {getAllUsersInfo} from "../../shared/globleFunctions";

interface IComponentsContainerProps {
    postList: IPost[],
    componentsType: IComponentsType,
    registeredUser: IUser,
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
                    <PostBlock post={post} />
                );
                break;
            case IComponentsType.users:
                const userList: IUser[] = this.state.userList.slice().reverse();
                listComponents = userList.map((user) =>
                    <UserBlock registeredUser={this.props.registeredUser} displayedUser={user} />
                );
                break;
        }
        return (
            <div id="all-components">
                {listComponents}
            </div>
        );
    }
}

const mapStateToProps = (state: { postList: IPost[]} ) => {
    return {
        postList: state.postList
    };
};

export default connect(mapStateToProps)(ComponentsContainer);

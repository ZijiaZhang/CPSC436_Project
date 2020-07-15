import React from "react";
import UserBlock, {IUser} from "./UserBlock";
import PostBlock, {IPost} from "./PostBlock";
import {connect} from "react-redux";
import {IComponentsType} from "./HomePage";

interface IComponentsContainerProps {
    userList: IUser[],
    postList: IPost[],
    componentsType: IComponentsType,
    registeredUser: IUser,
    contentSearch: String,
    searchContent: any
}

interface IComponentsContainerState {
}


class ComponentsContainer extends React.Component<IComponentsContainerProps, IComponentsContainerState> {
    constructor(props: IComponentsContainerProps) {
        super(props);
        this.state= {
            
        }
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
                const userList: IUser[] = this.props.userList.slice().reverse();
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

const mapStateToProps = (state: { postList: IPost[], userList: IUser[]} ) => {
    return {
        postList: state.postList,
        userList: state.userList
    };
};

export default connect(mapStateToProps)(ComponentsContainer);

import React from "react";
import InputBlock from "./InputBlock";
import ComponentsContainer from "./ComponentsContainer";
import SearchBlock from "./SearchBlock";
import {IUser} from "./UserBlock";

interface IHomePageProps {
    user: IUser
}

interface IHomePageState {
    componentsType: IComponentsType
}

export enum IComponentsType {
    posts = 'posts',
    users = 'users',
}

class HomePage extends React.Component<IHomePageProps, IHomePageState> {
    constructor(props: IHomePageProps) {
        super(props);
        this.state = {
            componentsType: IComponentsType.posts
        }
    }

    getPosts = () => {
        this.setState({componentsType: IComponentsType.posts})
    };

    getUsers = () => {
        this.setState({componentsType: IComponentsType.users})
    };

    render() {
        return (
            <div id="post-blog-page">
                <SearchBlock user={this.props.user} getPosts={this.getPosts} getUsers={this.getUsers} />
                <div className="home-page-body">
                    <InputBlock user={this.props.user} />
                    <ComponentsContainer registeredUser={this.props.user} componentsType={this.state.componentsType} />
                </div>

            </div>
        );
    }

}

export default HomePage;
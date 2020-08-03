import React from "react";
import InputBlock from "./InputBlock";
import ComponentsContainer from "./ComponentsContainer";
import SearchBlock from "./SearchBlock";
import {getAllUsersInfo, getPosts} from "../../shared/globleFunctions";
import {connect} from "react-redux";
import {loadPosts, loadRecommendedUsers} from "../actions";
import {IUser} from "../../../shared/ModelInterfaces";

interface IHomePageProps {
    user: IUser,
    loadPosts: any,
    loadRecommendedUsers: any
}

interface IHomePageState {
    componentsType: IComponentsType
}

export enum IComponentsType {
    posts = 'posts',
    users = 'users',
    personal = 'personal',
    others = 'others'
}

class HomePage extends React.Component<IHomePageProps, IHomePageState> {
    constructor(props: IHomePageProps) {
        super(props);
        this.state = {
            componentsType: IComponentsType.posts
        }
    }

    async componentDidMount() {
        let postList: any[] = await getPosts("", this.props.user);
        this.props.loadPosts(postList);
    }

    getPosts = () => {
        this.setState({componentsType: IComponentsType.posts})
    };

    getUsers = () => {
        this.setState({componentsType: IComponentsType.users})
    };

    getPersonal = () => {
        this.setState({componentsType: IComponentsType.personal})
    };

    getOthersPosts = () => {
        this.setState({componentsType: IComponentsType.others})
    };

    searchContent = async (content: string) => {
        if (!content) return;

        if (this.state.componentsType === IComponentsType.posts) {
            let postList: any[] = await getPosts(`content=${content}`, this.props.user);
            this.props.loadPosts(postList);
        } else if (this.state.componentsType === IComponentsType.users) {
            let userList = await getAllUsersInfo(this.props.user, `content=${content}`);
            this.props.loadRecommendedUsers(userList);
        }
    };

    render() {
        return (
            <div id="post-blog-page">
                <SearchBlock user={this.props.user} getPosts={this.getPosts} getUsers={this.getUsers}
                             getPersonal={this.getPersonal} searchContent={this.searchContent}/>
                <div className="home-page-body">
                    {this.state.componentsType === IComponentsType.posts ?
                        <InputBlock user={this.props.user}/>
                        :
                        ""
                    }
                    <ComponentsContainer registeredUser={this.props.user} componentsType={this.state.componentsType}
                                         getOthersPosts={this.getOthersPosts}/>
                </div>
            </div>
        );
    }

}

const mapStateToProps = (state: { postList: any }) => {
    return {
        postList: state.postList
    };
};
export default connect(mapStateToProps, {loadPosts, loadRecommendedUsers})(HomePage);

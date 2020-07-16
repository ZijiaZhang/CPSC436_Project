import React from "react";
import InputBlock from "./InputBlock";
import ComponentsContainer from "./ComponentsContainer";
import SearchBlock from "./SearchBlock";
import {IUser} from "./UserBlock";

interface IHomePageProps {
    user: IUser
}

interface IHomePageState {
    componentsType: IComponentsType,
    contentSearch: String
}

export enum IComponentsType {
    posts = 'posts',
    users = 'users',
}

class HomePage extends React.Component<IHomePageProps, IHomePageState> {
    constructor(props: IHomePageProps) {
        super(props);
        this.state = {
            componentsType: IComponentsType.posts,
            contentSearch: ""
        }
    }

    getPosts = () => {
        this.setState({componentsType: IComponentsType.posts})
    };

    getUsers = () => {
        this.setState({componentsType: IComponentsType.users})
    };

    changeContent = (e: any) => {
        this.setState({contentSearch: e.target.value});
    }

    searchContentByName = (content: String, objList: any) => {
        let retval: any = [];
        for (let i=0; i < objList.length; i++) {
            if (objList[i].fullname.toLowerCase().includes(content.toLowerCase())) {
                retval.push(objList[i]);
            }
        }
        return retval;
    }


    searchContentByPostDetail = (content: String, objList: any) => {
        let retval: any = [];
        for (let i=0; i < objList.length; i++) {
            if (objList[i].detail.toLowerCase().includes(content.toLowerCase())) {
                retval.push(objList[i]);
            }
        }
        return retval.reverse();
    }

    searchContent = (content: String, objList: any) => {
        let retList: any = [];
        if (content === "") return objList;
        if (this.state.componentsType ===IComponentsType.posts) {
            retList = this.searchContentByPostDetail(content, objList);
        } else {
            retList = this.searchContentByName(content, objList);
        }
        return retList.reverse();
    }

    render() {
        return (
            <div id="post-blog-page">
                <SearchBlock user={this.props.user} getPosts={this.getPosts} getUsers={this.getUsers} searchContent={this.searchContent} changeContent={this.changeContent} componentsType={this.state.componentsType} contentSearch={this.state.contentSearch} />
                <div className="home-page-body">
                    <InputBlock user={this.props.user} />
                    <ComponentsContainer registeredUser={this.props.user} componentsType={this.state.componentsType} searchContent={this.searchContent} contentSearch={this.state.contentSearch} />
                </div>
            </div>
        );
    }

}

export default HomePage;
import React from "react";
import {IUser} from "./UserBlock";
import {IPost} from "./PostBlock";
import {connect} from "react-redux";
import {IComponentsType} from "./HomePage";


export interface ISearchBlockProps {
    user: IUser,
    getPosts: any,
    getUsers: any,
    searchContent: any,
    changeContent: any,
    componentsType: any,
    postList: any,
    userList: any,
    contentSearch: String
}

interface ISearchBlockState {
}

class SearchBlock extends React.Component<ISearchBlockProps, ISearchBlockState> {

    constructor(props: ISearchBlockProps) {
        super(props);
        this.state = {
        }
    }

    render() {
        const content = this.props.contentSearch;
        let objectList: any;
        if (this.props.componentsType === IComponentsType.posts) {
            objectList = this.props.postList;
        } else {
            objectList = this.props.userList;
        }
        return (
            <div className="search-block">
                <div className="search-block-search-bar">
                    <input type="text" className="search-input-block" placeholder="Search" onChange={this.props.changeContent}/>
                    <button className="search-submit-button" onClick={()=> {this.props.searchContent(content, objectList)}}>Search</button>
                </div>
                <div className="search-block-nav-buttons">
                    <button className="nav-button-to-some-page">
                        <img src={this.props.user.avatarPath} alt="img not found" height="30px" width="30px" />
                        <span>{this.props.user.fullname}</span>
                    </button>
                    <button className="nav-button-to-some-page" onClick={this.props.getPosts}>Home</button>
                    <button className="nav-button-to-some-page" onClick={this.props.getUsers}>Friends</button>
                </div>
                <div className="search-block-search-filters">
                    <button className="search-filter-buttons">All</button>
                    <button className="search-filter-buttons">Posts</button>
                    <button className="search-filter-buttons">People</button>
                    <button className="search-filter-buttons">Tags</button>
                    <button className="search-filter-buttons">Articles</button>
                </div>
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

export default connect(mapStateToProps)(SearchBlock);
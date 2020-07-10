import React from "react";
import {IUser} from "./UserBlock";

interface ISearchBlockProps {
    user: IUser,
    getPosts: any,
    getUsers: any,
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
        return (
            <div className="search-block">
                <div className="search-block-search-bar">
                    <input type="text" className="search-input-block" placeholder="Search"/>
                    <button className="search-submit-button">Search</button>
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

export default SearchBlock;
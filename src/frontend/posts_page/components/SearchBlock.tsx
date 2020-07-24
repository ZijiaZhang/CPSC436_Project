import React from "react";
import {IUser} from "../../../shared/ModelInterfaces";

interface ISearchBlockProps {
    user: IUser,
    getPosts: any,
    getUsers: any,
    getPersonal: any
    searchContent: any
}

interface ISearchBlockState {
    content: string
}

class SearchBlock extends React.Component<ISearchBlockProps, ISearchBlockState> {
    constructor(props: ISearchBlockProps) {
        super(props);
        this.state = {
            content: ''
        }
    }

    changeContent = (e: any) => {
        this.setState({content: e.target.value});
    };

    render() {
        return (
            <div className="search-block">
                <div className="search-block-search-bar">
                    <input type="text" className="search-input-block" placeholder="Search" onChange={this.changeContent}/>
                    <button className="search-submit-button" onClick={() => this.props.searchContent(this.state.content)}>Search</button>
                </div>
                <div className="search-block-nav-buttons">
                    <button className="nav-button-to-some-page" onClick={this.props.getPersonal}>
                        <img src={this.props.user.avatarPath ? this.props.user.avatarPath : './images/photoP.png'} alt="img not found" height="30px" width="30px" />
                        <span>{this.props.user.fullname}</span>
                    </button>
                    <button className="nav-button-to-some-page" onClick={this.props.getPosts}>Home</button>
                    <button className="nav-button-to-some-page" onClick={this.props.getUsers}>Find Friends</button>
                </div>
            </div>
        );
    }
}

export default SearchBlock;
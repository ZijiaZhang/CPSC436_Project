import React, {CSSProperties} from "react";
import PostBlock from "./PostBlock";
import {IUser} from "../../../shared/ModelInterfaces";
import Dropdown from "react-bootstrap/Dropdown";
import {getPostsByIds, getPostsByUserId} from "../../shared/globleFunctions";
import {connect} from "react-redux";
import {loadHiddenPosts, loadSavedPosts} from "../actions";

interface IPersonalPageProps {
    loadSavedPosts: any,
    loadHiddenPosts: any,
    hiddenPosts: any[],
    savedPosts: any[],
    userDisplayInfo: IUser,
    userInfo: any
}

interface IPersonalPageState {
    viewOption: string,
    personalPostList: any[],

}

class PersonalPage extends React.Component<IPersonalPageProps, IPersonalPageState> {
    constructor(props: IPersonalPageProps) {
        super(props);
        this.state = {
            viewOption: 'personal',
            personalPostList: []
        }
    }

    async componentDidMount() {
        this.setState({personalPostList: await getPostsByUserId(this.props.userDisplayInfo._id, this.props.userInfo)});
        this.props.loadSavedPosts(await getPostsByIds(this.props.userDisplayInfo.savedPostIds, this.props.userInfo));
        this.props.loadHiddenPosts(await getPostsByIds(this.props.userDisplayInfo.hiddenPostIds, this.props.userInfo));
    }

    viewPersonalPosts = async () => {
        if(this.state.viewOption !== 'personal') {
            this.setState({
                viewOption: 'personal',
                personalPostList: await getPostsByUserId(this.props.userDisplayInfo._id, this.props.userInfo)
            });
        }
    };

    viewSavedPosts = async () => {
        if(this.state.viewOption !== 'saved') {
            this.setState({viewOption: 'saved'});
        }
    };

    viewHiddenPosts = async () => {
        if(this.state.viewOption !== 'hidden') {
            this.setState({viewOption: 'hidden'});
        }
    };

    getDisplayedPosts = () => {
        let postList = [];
        switch (this.state.viewOption) {
            case 'personal':
                postList = this.state.personalPostList.slice().reverse();
                break;
            case 'saved':
                postList = this.props.savedPosts.slice().reverse();
                break;
            case 'hidden':
                postList = this.props.hiddenPosts.slice().reverse();
                break;
        }
        return postList.map((post) =>
            <PostBlock post={post}  />
        );
    };

    getNumOfPosts = () => {
        switch (this.state.viewOption) {
            case 'personal':
                return this.state.personalPostList.length.toString();
            case 'saved':
                return this.props.savedPosts.length.toString();
            case 'hidden':
                return this.props.hiddenPosts.length.toString();
        }
    };

    render() {
        const savedPosts = this.getDisplayedPosts();
        const numPosts = this.getNumOfPosts();
        let dropDownStyle: CSSProperties = {
            marginRight: '12px',
            float: 'right',
            display: 'inline-block',
            fontSize: '12pt',
            position: "relative",
            top: "30px"
        };
        const buttonStyle: CSSProperties = {
            color: 'black',
            background: 'lightskyblue',
            boxShadow: "2px 2px 2px 2px lightgray",
            border: 'none',
            marginRight: '24px',
        };
        return (
            <div>
                <div className="post-block">
                    <div className="personal-posts-navigation-block">
                    <div className="personal-posts-info-block">
                        <img src={this.props.userDisplayInfo.avatarPath ? this.props.userDisplayInfo.avatarPath : './images/photoP.png'} alt={'Image Not Found'}
                             className="personal-posts-info-avatar"/>
                        <div className="personal-posts-info-detail">
                            <p className="personal-posts-info-name">{this.props.userDisplayInfo.fullname}</p>
                            <p className="personal-posts-info-number">{numPosts} {this.state.viewOption === "personal" ? "" : this.state.viewOption + " "}posts</p>
                        </div>
                    </div>
                    <Dropdown style={dropDownStyle}>
                        <Dropdown.Toggle className="settings-user-block-message-button" style={buttonStyle} variant="success" id="dropdown-basic">
                            <span className={"glyphicon glyphicon-option-horizontal"} /> View Posts
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item className="profile-drop-down-button" onClick={this.viewPersonalPosts}>
                                <span className={'glyphicon glyphicon-user'}/> Personal Posts</Dropdown.Item>
                            <Dropdown.Item className="profile-drop-down-button" onClick={this.viewSavedPosts}>
                                <span className={'fa fa-comments-o'}/> Saved Posts</Dropdown.Item>
                            <Dropdown.Item className="profile-drop-down-button" onClick={this.viewHiddenPosts}>
                                <span className={'fa fa-share-square-o'}/> Hidden Posts</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    </div>
                </div>
                {savedPosts}
            </div>
        );
    }
}

const mapStateToProps = (state: {hiddenPosts: any[], savedPosts: any[] }) => {
    return {
        hiddenPosts: state.hiddenPosts,
        savedPosts: state.savedPosts
    };
};

export default connect(mapStateToProps, {loadSavedPosts, loadHiddenPosts})(PersonalPage);

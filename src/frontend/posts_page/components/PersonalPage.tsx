import React, {CSSProperties} from "react";
import PostBlock from "./PostBlock";
import {IUser} from "../../../shared/ModelInterfaces";
import Dropdown from "react-bootstrap/Dropdown";
import {getPostsByIds, getPostsByUserId} from "../../shared/globleFunctions";
import {connect} from "react-redux";
import {loadHiddenPosts, loadSavedPosts} from "../actions";

interface IPersonalPageProps {
    userInfo: IUser,
    loadSavedPosts: any,
    loadHiddenPosts: any,
    hiddenPosts: any[],
    savedPosts: any[]
}

interface IPersonalPageState {
    viewOption: string,
    personalPostList: any[]
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
        this.setState({personalPostList: await getPostsByUserId(this.props.userInfo._id)});
        this.props.loadSavedPosts(await getPostsByIds(this.props.userInfo.savedPostIds));
        this.props.loadHiddenPosts(await getPostsByIds(this.props.userInfo.hiddenPostIds));
    }

    viewPersonalPosts = async () => {
        if(this.state.viewOption !== 'personal') {
            this.setState({
                viewOption: 'personal',
                personalPostList: await getPostsByUserId(this.props.userInfo._id)
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
            <PostBlock post={post} />
        );
    };

    render() {
        const savedPosts = this.getDisplayedPosts();
        let dropDownStyle: CSSProperties = {
            color: 'royalblue',
            background: 'none',
            border: 'none',
            paddingRight: '24px'
        };
        return (
            <div>
                <div className="post-block">
                    <div className="personal-posts-navigation-block">
                        <Dropdown>
                            <Dropdown.Toggle className="settings-user-block-message-button" style={dropDownStyle} variant="success" id="dropdown-basic">
                                <span className={"glyphicon glyphicon-option-horizontal"} /> View Options
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
                    <div className="personal-posts-management-block">
                        <p>Management</p>
                        <button>Recent Notifications</button>
                        <button>Manage Posts</button>
                    </div>
                </div>
                {savedPosts}
            </div>
        );
    }
}

const mapStateToProps = (state: { userInfo: any, hiddenPosts: any[], savedPosts: any[] }) => {
    return {
        userInfo: state.userInfo,
        hiddenPosts: state.hiddenPosts,
        savedPosts: state.savedPosts
    };
};

export default connect(mapStateToProps, {loadSavedPosts, loadHiddenPosts})(PersonalPage);

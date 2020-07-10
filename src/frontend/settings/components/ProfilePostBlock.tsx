import React from "react";
import {IPost} from "../../posts_page/components/PostBlock";

interface IProfilePostBlockProps{
    post: IPost
}

class ProfilePostBlock extends React.Component<IProfilePostBlockProps, {}> {
    render() {
        return (
            <div className="settings-post-block">
                <div className="settings-profile-photo-block">
                    <img src={this.props.post.avatarPath} alt="ProfilePhoto" className="settings-profile-photo"/>
                </div>
                <div className="settings-post-detail-block">
                    <p className="settings-post-user-name">{this.props.post.name}</p>
                    <div className="settings-post-detail">
                        {this.props.post.detail}
                    </div>
                    <div className="images">
                        {this.props.post.image ? <img className="settings-inserted-image" src={this.props.post.image} alt={''}/>: ''}
                    </div>
                    <p className="settings-post-time">{this.props.post.time}</p>
                </div>
            </div>
        );
    }
}

export default ProfilePostBlock;

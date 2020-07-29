import React from "react";
import {IUser} from "../../../shared/ModelInterfaces";

interface IProfilePostBlockProps{
    post: any,
    user: IUser
}

class ProfilePostBlock extends React.Component<IProfilePostBlockProps, {}> {
    render() {
        return (
            <div className="settings-post-block">
                <div className="settings-profile-photo-block">
                    <img src={this.props.user.avatarPath ? this.props.user.avatarPath : './images/photoP.png'} alt="ProfilePhoto" className="settings-profile-photo"/>
                </div>
                <div className="settings-post-detail-block">
                    <p className="settings-post-user-name">{this.props.user.fullname}</p>
                    <div className="settings-post-detail">
                        {this.props.post.detail}
                    </div>
                    <div className="images">
                        {this.props.post.image ? this.props.post.image.map(((image: { path: string | undefined; }) =>
                                <img className="settings-inserted-image" src={image.path} alt={''}/>
                        )) : ''}
                    </div>
                    <p className="settings-post-time">{this.props.post.time}</p>
                </div>
            </div>
        );
    }
}

export default ProfilePostBlock;

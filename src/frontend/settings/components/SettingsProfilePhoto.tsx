import * as React from "react";
import Modal from "react-modal";
import {connect} from "react-redux";
import {loadDisplayedUser, loadUserInfo} from "../actions";
import {IUser} from "../../../shared/ModelInterfaces";
import {requestAPIJson} from "../../shared/Networks";
import {updateUserInfo} from "../../shared/globleFunctions";

interface ISettingsProfilePhotoProps {
    opened: boolean,
    curAvatar: string,
    userAvatarOnChange: any,
    avatarPath: string,
    loadUserInfo: any,
    userInfo: IUser,
    loadDisplayedUser: any
}

interface ISettingsProfilePhotoState {
    editing: boolean,
    imageFile: any,
    imagePreview: any
}

class SettingsProfilePhoto extends React.Component<ISettingsProfilePhotoProps, ISettingsProfilePhotoState>{
    constructor(props: ISettingsProfilePhotoProps) {
        super(props);
        this.state = {
            editing: false,
            imageFile: null,
            imagePreview: "",
        }
    }

    uploadFileOnChange = (event: any) => {
        this.setState( {imageFile: event.target.files[0]});
        this.setState( {imagePreview: URL.createObjectURL(event.target.files[0])});
    };

    uploadFileSubmit = async (event: any) => {
        event.preventDefault();
        let imageFileData = new FormData();
        imageFileData.append('file', this.state.imageFile);
        let responsePost = await fetch('/api/v1/users/uploadAvatar',
            {
                method: 'POST',
                body: imageFileData});
        let responsePostData = await responsePost.text();
        const updatedInfo = {
            avatarPath: responsePostData,
        };
        let responsePatchData = await updateUserInfo(this.props.userInfo.username, updatedInfo);
        await fetch('/api/v1/users/deleteAvatar', {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({oldPath: this.props.userInfo.avatarPath})
        });
        this.props.loadUserInfo(responsePatchData);
        this.props.loadDisplayedUser(responsePatchData);
        this.cancelEdit();
    };

    cancelEdit = () => {
        this.setState({editing: !this.state.editing});
    };

    render() {
        return (
            <Modal className="user-profile-editor" isOpen={this.props.opened != this.state.editing}>
                <div className={'settings-avatar-item'}>
                    <label className={'settings-avatar-item-label'}>Profile Photo</label>
                    <p className={'settings-avatar-item-label-description'}>Select Your Profile Picture</p>
                    <div className="profile-picture-previews">
                        <img className={'settings-avatar-item-preview'} src={this.state.imagePreview ==='' ?  this.props.curAvatar : this.state.imagePreview}
                             width={'320px'} height={'320px'} alt={'not uploaded'} />
                        <img className={'settings-avatar-item-preview'} src={this.state.imagePreview ==='' ?  this.props.curAvatar : this.state.imagePreview}
                             width={'240px'} height={'240px'} alt={'not uploaded'} />
                        <img className={'settings-avatar-item-preview'} src={this.state.imagePreview ==='' ?  this.props.curAvatar : this.state.imagePreview}
                             width={'160px'} height={'160px'} alt={'not uploaded'} />
                        <img className={'settings-avatar-item-preview'} src={this.state.imagePreview ==='' ?  this.props.curAvatar : this.state.imagePreview}
                             width={'80px'} height={'80px'} alt={'not uploaded'} />
                    </div>
                    <input className={'settings-avatar-item-input'} type="file" name="avatar" onChange={this.uploadFileOnChange} />
                </div>
                <div className="settings-avatar-buttons-lock">
                    <button className="settings-avatar-button" onClick={this.uploadFileSubmit}>Save</button>
                    <button className="settings-avatar-button" onClick={this.cancelEdit}>Cancel</button>
                </div>
            </Modal>
        );
    }
}
const mapStateToProps = (state: { userInfo: any }) => {
    return {
        userInfo: state.userInfo,
    };
};

export default connect(mapStateToProps, {loadUserInfo, loadDisplayedUser})(SettingsProfilePhoto);

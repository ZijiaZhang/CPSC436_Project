import React from "react";
import {connect} from "react-redux";
import {addPost, saveInputDraft} from "../actions";
import VisibilitySetting from "./VisibilitySetting";
import CreatableSelect from 'react-select/creatable';
import Modal from "react-modal";
import {ITag, IUploadedFile, IUser} from "../../../shared/ModelInterfaces";
import {addTag, loadTags} from "../../settings/actions";
import {addNewTag, getAllTags, updateUserInfo} from "../../shared/globleFunctions";
import {requestAPIJson} from "../../shared/Networks";
import EmojiBlock from "./EmojiBlock";

interface ITextareaProps {
    addPost: any,
    saveInputDraft: any,
    inputDraft: string,
    opened: boolean,
    postList: any[],
    user: IUser,
    tagList: ITag[],
    loadTags: any,
    addTag: any
}

interface ITextareaState {
    editing: boolean,
    message: string,
    visibility: string,
    selectedTags: any[],
    emojiDropDown: boolean,
    uploadedFiles: any[],
    filesPreview: any,
    imageOption: boolean
}

class TextInputEditor extends React.Component<ITextareaProps, ITextareaState> {

    constructor(props: ITextareaProps) {
        super(props);
        this.state = {
            editing: false,
            message: this.props.inputDraft,
            visibility: 'public',
            selectedTags: [],
            emojiDropDown: false,
            uploadedFiles: [],
            filesPreview: [],
            imageOption: false
        };
    }

    async componentDidMount() {
        const tags = await getAllTags();
        this.props.loadTags(tags);
    }

    inputOnChange = (event: any) => {
        this.setState({message: event.target.value});
    };

    sendPost = async (event: any) => {
        event.preventDefault();
        if (this.state.message.trim() !== '') {
            let d = new Date();
            let time = d.getHours() + ':' + d.getMinutes();
            let date = d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate();
            let tagList = [];
            const fileList = await this.uploadFileSubmit();
            if (this.state.selectedTags !== null) {
                for (let nextTag of this.state.selectedTags) {
                    let matchTag = this.props.tagList.find(tag => tag.name === nextTag.value);
                    if (matchTag === undefined) {
                        let newTag = await addNewTag(nextTag.value);
                        this.props.addTag(newTag);
                        tagList.push(newTag);
                    } else {
                        tagList.push(matchTag);
                    }
                }
            }
            let newPost = {time: date + ' ' + time, userId: this.props.user._id, detail: this.state.message,
                type: 'post', visibility: this.state.visibility, tags: tagList, uploadedFiles: fileList, likedUserIds: []};
            let responseData = await requestAPIJson('/api/v1/posts',  'POST',
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                newPost);
            this.props.addPost({
                id: responseData._id,
                time: responseData.time,
                name: this.props.user.fullname,
                userId: responseData.userId,
                detail: responseData.detail,
                avatarPath: this.props.user.avatarPath,
                image: responseData.uploadedFiles,
                likedUserIds: [],
                comments: [],
                type: responseData.type,
                visibility: responseData.visibility,
                tags: responseData.tags
            });
            this.setState({message: '', editing: !this.state.editing, imageOption: false});
        }
    };

    setPublic = () => {
        this.setState({visibility: 'public'});
    };

    setFriendsOnly = () => {
        this.setState({visibility: 'friendsOnly'});
    };

    setPrivate = () => {
        this.setState({visibility: 'private'});
    };

    saveDraft = () => {
        this.props.saveInputDraft(this.state.message);
    };

    cancelEdit = () => {
        this.setState({editing: !this.state.editing})
    };

    tagSelectionHandleChange = (newValue: any) => {
        this.setState({selectedTags: newValue});
    };

    convertTagsToOptions = () => {
        let options = [];
        for (let tag of this.props.tagList) {
            options.push({value: tag.name, label: tag.name})
        }
        return options;
    };

    addEmoji = (emoji: any) => {
        this.setState({message: this.state.message + emoji})
    };

    showEmojiDropdown = () => {
        this.setState({emojiDropDown: !this.state.emojiDropDown});
    };

    uploadFileOnChange = (event: any) => {
        this.setState( {uploadedFiles: event.target.files});
        let previewList = [];
        for (let file of event.target.files) {
            let preview =  URL.createObjectURL(file);
            previewList.push(preview);
        }
        this.setState( {filesPreview: previewList});
    };

    uploadFileSubmit = async () => {
        let fileList: IUploadedFile[] = [];
        for (let image of this.state.uploadedFiles) {
            let imageFileData = new FormData();
            imageFileData.append('file', image);
            let responsePost = await fetch('/api/v1/users/uploadAvatar',
                {
                    method: 'POST',
                    body: imageFileData});
            let responsePostData = await responsePost.text();
            fileList.push({fileType: "image", path: responsePostData})
        }
        return fileList;
    };

    showImageOptions = () => {
        this.setState({imageOption: true});
    };

    render() {
        const options = this.convertTagsToOptions();
        return (
            <Modal className="main-text-input-editor" isOpen = {this.state.editing != this.props.opened}>
                <button id="text-editor-close-on-x" onClick={this.cancelEdit}>
                    X
                </button>
                <VisibilitySetting visibility={this.state.visibility} setPublic={this.setPublic}
                                   setPrivate={this.setPrivate} setFriendsOnly={this.setFriendsOnly}/>
                <div id="select-tags">
                    <span id="tag-selection-title" className="selector-title">Tags:</span>
                    <CreatableSelect id="tag-list" options={options} isMulti={true}
                            onChange={this.tagSelectionHandleChange}/>
                </div>
                <div id="text-input-block">
                    <textarea id="message-area" placeholder="Type your message here" value={this.state.message} onChange={this.inputOnChange} />
                    <div id="post-add-on-buttons">
                        <button className="add-on-button" onClick={this.showEmojiDropdown}>Emoji
                            <div className="profile-interaction-drop-down-buttons" style={this.state.emojiDropDown ? {display: 'block'} : {display: 'none'}}>
                                <EmojiBlock addEmoji={this.addEmoji}/>
                            </div>
                        </button>
                        <button className="add-on-button" onClick={this.showImageOptions}>Image</button>
                    </div>
                    <div className="browse-image-files" style={this.state.imageOption ? {display: 'block'} : {display: 'none'}}>
                        <input className='settings-avatar-item-input' type="file" name="avatar" accept=".jpg,.png,.jpeg" multiple onChange={this.uploadFileOnChange} />
                        <div className="profile-picture-previews">
                            {this.state.filesPreview.map((image: string | undefined) =>
                                <img className={'post-editor-image-preview'} src={image}
                                     width={'128px'} height={'128px'} alt={'not uploaded'} /> )}
                        </div>
                    </div>
                    <div id="Post-buttons">
                        <button id="send-post" className="post-finalize-button" onClick={this.sendPost}>Post My Message!</button>
                        <button className="post-finalize-button" onClick={this.saveDraft}>Save Draft</button>
                        <button className="post-finalize-button" onClick={this.cancelEdit}>Cancel</button>
                    </div>
                </div>
            </Modal>
        );
    }
}

const mapStateToProps = (state: { postList: any; inputDraft: any; tagList: any}) => {
    return {
        postList: state.postList,
        inputDraft: state.inputDraft,
        tagList: state.tagList
    };
};

export default connect(mapStateToProps, {addPost, saveInputDraft, loadTags, addTag})(TextInputEditor);

import React from "react";
import {connect} from "react-redux";
import {addPost, saveInputDraft} from "../actions";
import VisibilitySetting from "./VisibilitySetting";
import CreatableSelect from 'react-select/creatable';
import TextEditorSetting from "./TextEditorSetting";
import Modal from "react-modal";
import {ITag, IUser} from "../../../shared/ModelInterfaces";
import {addTag, loadTags} from "../../settings/actions";
import {addNewTag, getAllTags} from "../../shared/globleFunctions";

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
    selectedTags: any[]
}

class TextInputEditor extends React.Component<ITextareaProps, ITextareaState> {

    constructor(props: ITextareaProps) {
        super(props);
        this.state = {
            editing: false,
            message: this.props.inputDraft,
            visibility: 'public',
            selectedTags: []
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
                type: 'post', visibility: this.state.visibility, tags: tagList, uploadedFiles: [], likedUserIds: []};
            let response = await fetch('/api/v1/posts', {method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newPost)});
            let responseData = await response.json();
            this.props.addPost({
                id: responseData._id,
                time: responseData.time,
                name: this.props.user.fullname,
                userId: responseData.userId,
                detail: responseData.detail,
                avatarPath: this.props.user.avatarPath,
                image: '',
                likedUserIds: [],
                comments: [],
                type: responseData.type,
                visibility: responseData.visibility,
                tags: responseData.tags
            });
            this.setState({message: ''});
            this.setState({editing: !this.state.editing})
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
                <TextEditorSetting />
                <div id="text-input-block">
                    <textarea id="message-area" placeholder="Type your message here" value={this.state.message} onChange={this.inputOnChange} />
                    <div id="Post-buttons">
                        <button id="send-post" onClick={this.sendPost}>Post My Message!</button>
                        <button id="save-draft" onClick={this.saveDraft}>Save Draft</button>
                        <button id="cancel-edit" onClick={this.cancelEdit}>Cancel</button>
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

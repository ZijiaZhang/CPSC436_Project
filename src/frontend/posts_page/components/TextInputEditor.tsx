import React from "react";
import {Post} from "./PostBlock";
import {connect} from "react-redux";
import {addPost, saveInputDraft} from "../actions";
import SetPublic from "./SetPublic";
import CreatableSelect from 'react-select/creatable';
import SetTextEditor from "./SetTextEditor";
import Modal from "react-modal";

interface ITextareaProps {
    addPost: any,
    saveInputDraft: any,
    inputDraft: string,
    opened: boolean,
    postList: Post[]
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

    inputOnChange = (event: any) => {
        this.setState({message: event.target.value});
    };

    sendPost = () => {
        if (this.state.message.trim() !== '') {
            let d = new Date();
            let time = d.getHours() + ':' + d.getMinutes();
            let date = d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate();
            let tags = [];
            for (let index in this.state.selectedTags) {
                tags.push(this.state.selectedTags[index].value);
            }
            let newPost: Post = {id: this.props.postList.length.toString(), time: date + ' ' + time, name:'N/A', detail: this.state.message,
                avatar: './images/nobu!.png', image: '', numLikes: 0, comments: [], type: 'post',
                visibility: this.state.visibility, tags: tags, liked: false};
            this.props.addPost(newPost);
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

    render() {
        const options = [
            { value: 'Course Staff', label: 'Course Staff' },
            { value: 'Campus Event', label: 'Campus Event' },
            { value: 'Entertainment', label: 'Entertainment' },
        ];
        return (
            <Modal className="main-text-input-editor" isOpen = {this.state.editing != this.props.opened}>
                <button id="text-editor-close-on-x" onClick={this.cancelEdit}>
                    X
                </button>
                <SetPublic setPublic={this.setPublic} setFriendsOnly={this.setFriendsOnly}
                           setPrivate={this.setPrivate} visibility={this.state.visibility}/>
                <div id="select-tags">
                    <span id="tag-selection-title" className="selector-title">Tags:</span>
                    <CreatableSelect id="tag-list" options={options} isMulti={true}
                            onChange={this.tagSelectionHandleChange}/>
                </div>
                <SetTextEditor />
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

const mapStateToProps = (state: { postList: any; inputDraft: any; }) => {
    return {
        postList: state.postList,
        inputDraft: state.inputDraft
    };
};

export default connect(mapStateToProps, {addPost, saveInputDraft})(TextInputEditor);

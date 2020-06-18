import React from "react";
import {Post} from "./PostBlock";
import {connect} from "react-redux";
import {addPost, saveInputDraft} from "../actions";
import SetPublic from "./SetPublic";
import Select from "react-select";
import SetTextEditor from "./SetTextEditor";
import Modal from "react-modal";

interface TextareaProps {
    addPost: any,
    saveInputDraft: any,
    inputDraft: string,
    opened: boolean,
    postList: Post[]
}

interface TextareaState {
    editing: boolean,
    message: string,
}

class TextInputEditor extends React.Component<TextareaProps, TextareaState> {

    constructor(props: TextareaProps) {
        super(props);
        this.state = {
            editing: false,
            message: this.props.inputDraft
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
            let newPost: Post = {id: this.props.postList.length.toString(), time: date + ' ' + time, name:'N/A', detail: this.state.message,
                avatar: './images/nobu!.png', image: '', numLikes: 0, comments: [], type: 'post',
                visibility: 'public', tags: []};
            console.log(newPost);
            this.props.addPost(newPost);
            this.setState({message: ''});
            this.setState({editing: !this.state.editing})
        }
    };

    saveDraft = () => {
        this.props.saveInputDraft(this.state.message);
    };

    cancelEdit = () => {
        this.setState({editing: !this.state.editing})
    };

    setTextEditor() {

    };

    addPicture() {

    };

    addLink() {

    };

    render() {
        const options = [
            { value: 'Course Staff', label: 'Course Staff' },
            { value: 'Campus Event', label: 'Campus Event' },
            { value: 'Entertainment', label: 'Entertainment' }
        ];
        return (
            <Modal isOpen = {this.state.editing != this.props.opened}>
                <button id="text-editor-close-on-x" onClick={this.cancelEdit}>
                    X
                </button>
                <SetPublic />
                <div id="select-tags">
                    <span id="selector-title">Tags:</span>
                    <Select id="tag-list" options={options} isMulti={true} placeholder="Select Tags"/>
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
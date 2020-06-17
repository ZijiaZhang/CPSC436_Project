import React from "react";
import VisibilitySetting from './VisibilitySetting';
import Select from 'react-select';
import TextEditorSetting from './TextEditorSetting';

interface IInputBlockState {
    editing: boolean,
    message: string,
}

class InputBlock extends React.Component<{}, IInputBlockState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            editing: false,
            message: ''
        };
    }

    startEditor = () => {
        document.getElementById("all-posts")!.style.height = "65vh";
        this.setState({editing: !this.state.editing})
    };

    inputOnChange = (event: any) => {
        this.setState({message: event.target.value});
    };

    sendPost = () => {

    };

    saveDraft = () => {

    };

    cancelEdit = () => {
        document.getElementById("all-posts")!.style.height = "85vh";
        this.setState({editing: !this.state.editing})
    };

    addTag() {

    }

    setPublicOnChange() {

    }

    setTextEditor() {

    }

    addPicture() {

    }

    addLink() {

    }


    render() {
        const options = [
            { value: 'Course Staff', label: 'Course Staff' },
            { value: 'Campus Event', label: 'Campus Event' },
            { value: 'Entertainment', label: 'Entertainment' }
        ];
        return(<div id="new-post-editor">
            <textarea id="text-area" placeholder="Type your message here" onClick={this.startEditor} style={{display: this.state.editing ? 'none' : 'block'}}/>
            <div id="text-editor" style={{display: this.state.editing ? 'block' : 'none'}}>
                <VisibilitySetting />
                <div id="select-tags">
                    <span id="selector-title">Tags:</span>
                    <Select id="tag-list" options={options} isMulti={true} placeholder="Select Tags"/>
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
            </div>
            </div>);
    }
}

export default InputBlock;

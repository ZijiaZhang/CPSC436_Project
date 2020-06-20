import React from "react";
import {connect} from "react-redux";
import {addPost, saveInputDraft} from "../actions";
import TextInputEditor from "./TextInputEditor";

interface IInputBlockProps {
    addPost: any,
    saveInputDraft: any,
    inputDraft: string
}

interface IInputBlockState {
    editing: boolean,
    message: string,
}

class InputBlock extends React.Component<IInputBlockProps, IInputBlockState> {
    constructor(props: IInputBlockProps) {
        super(props);
        this.state = {
            editing: false,
            message: ''
        };
    }

    startEditor = () => {
        this.setState({editing: !this.state.editing});
        this.setState({message: this.props.inputDraft});
    };

    render() {
        const options = [
            { value: 'Course Staff', label: 'Course Staff' },
            { value: 'Campus Event', label: 'Campus Event' },
            { value: 'Entertainment', label: 'Entertainment' }
        ];
        return(<div className="post-block">
            <div id="new-post-editor">
                <img src={"./images/nobu!.png"} alt="ProfilePhoto" className="post-profile-photo" id="input-bar-user-avatar"/>
                <input id="text-area" type="submit" value="Type your message here" onClick={this.startEditor} />
            </div>
            <TextInputEditor opened={this.state.editing}/>
        </div>);
    }
}

const mapStateToProps = (state: { postList: any; inputDraft: any; }) => {
    return {
        postList: state.postList,
        inputDraft: state.inputDraft
    };
};

export default connect(mapStateToProps, {addPost, saveInputDraft})(InputBlock);
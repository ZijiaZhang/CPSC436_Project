import React from "react";
import TextInputEditor from "./TextInputEditor";
import {IUser} from "../../../shared/ModelInterfaces";

interface IInputBlockProps {
    user: IUser
}

interface IInputBlockState {
    editing: boolean,
}

class InputBlock extends React.Component<IInputBlockProps, IInputBlockState> {
    constructor(props: IInputBlockProps) {
        super(props);
        this.state = {
            editing: false,
        };
    }

    startEditor = () => {
        this.setState({editing: !this.state.editing});
    };

    render() {
        return(<div className="post-block">
            <div id="new-post-editor">
                <img src={this.props.user.avatarPath ? this.props.user.avatarPath : './images/photoP.png'} alt="ProfilePhoto" className="post-profile-photo" id="input-bar-user-avatar"/>
                <input id="text-area" type="submit" value="Type your message here" onClick={this.startEditor} />
            </div>
            <TextInputEditor user={this.props.user} opened={this.state.editing}/>
        </div>);
    }
}

export default InputBlock;

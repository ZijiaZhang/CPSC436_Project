import * as React from 'react';
import {connect} from "react-redux";
import {createGroup, loadFriends} from "../actions";
import {IUser} from "../../../shared/ModelInterfaces";
import FriendBlock from "./FriendBlock";

interface ICreateGroupFormProps {
    userFriends: IUser[];
    selectedFriends: string[];
    createGroup: any;
    loadFriends: any;
    closeForm: () => void;
}

interface ICreateGroupFormState {
    groupName: string,
}

class CreateGroupForm extends React.Component<ICreateGroupFormProps, ICreateGroupFormState> {
    constructor(props: ICreateGroupFormProps) {
        super(props);
        this.state = {groupName: ''};
    }

    render() {
        return <div className="post-block">
            <label className="create-group-chat-label">Please Enter A Group Name: </label>
            <input className="create-group-chat-name-input" type="text" onChange={this.changeGroupName}/>
            <button className="create-group-chat-submit-button" onClick={this.handleCreate}>
                <span className="fa fa-check" /> Confirm
            </button>
            <button className="create-group-chat-submit-button" onClick={this.props.closeForm}>
                <span className="fa fa-times" /> Cancel
            </button>
            <label className="create-group-chat-label">Please Add At Least Two More Group Members:</label>
            {this.props.userFriends.map(friend => {
                return <FriendBlock friend={friend}/>
            })}
        </div>;
    }

    componentDidMount(): void {
        this.props.loadFriends();
    }

    changeGroupName = (e: any) => {
        this.setState({groupName: e.target.value});
    };

    handleCreate = () => {
        if (!this.state.groupName || this.props.selectedFriends.length < 2) {
            return;
        }
        this.props.createGroup(this.props.selectedFriends, this.state.groupName);
    };
}

const mapStateToProps = (state: any) => {
    return {userFriends: state.userFriends, selectedFriends: state.selectedFriends}
};

export default connect(mapStateToProps, {createGroup, loadFriends})(CreateGroupForm);

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
        return <div>
            <label>Group Name</label>
            <input type="text" onChange={this.changeGroupName}/>
            <button onClick={this.handleCreate}>Done</button>
            <span className="close" onClick={this.props.closeForm}>&times;</span>
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

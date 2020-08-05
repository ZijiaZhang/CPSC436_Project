import * as React from "react";
import {connect} from "react-redux";
import {deselectFriend, selectFriend} from "../actions";
import {IUser} from "../../../shared/ModelInterfaces";

interface IFriendBlockProps {
    friend: IUser
    selectFriend: any,
    deselectFriend: any
}

interface IFriendBlockState {
    blockStatus: BlockStatus
}

enum BlockStatus {
    selected,
    deselected
}

class FriendBlock extends React.Component<IFriendBlockProps, IFriendBlockState> {
    constructor(props: IFriendBlockProps) {
        super(props);
        this.state = {blockStatus: BlockStatus.deselected};
    }

    render() {
        return <div className="select-group-members-user-block" onClick={this.changeBlockStatus}>
            <div className={this.state.blockStatus === BlockStatus.selected ? 'selected' : 'deselected'}>
                <span id="create-group-check-box" className="fa fa-check"/>
            </div>
            <img className="select-group-members-user-avatar" src={this.props.friend.avatarPath ? this.props.friend.avatarPath : './images/photoP.png'} alt={'Image Not Found'}/>
            <span className="select-group-members-user-username">{this.props.friend.fullname}</span>
        </div>
    }

    changeBlockStatus = () => {
        this.state.blockStatus === BlockStatus.selected ? this.props.deselectFriend(this.props.friend.username) : this.props.selectFriend(this.props.friend.username);
        this.setState(state => ({blockStatus: state.blockStatus === BlockStatus.selected ? BlockStatus.deselected : BlockStatus.selected}));
    }
}

export default connect(null, {selectFriend, deselectFriend})(FriendBlock);

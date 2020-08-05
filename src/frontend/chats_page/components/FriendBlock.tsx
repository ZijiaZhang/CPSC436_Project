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
        return <div onClick={this.changeBlockStatus}>
            <span className={this.state.blockStatus === BlockStatus.selected ? 'selected' : 'deselected'}/>
            <img src={this.props.friend.avatarPath ? this.props.friend.avatarPath : './images/photoP.png'} alt={'Image Not Found'}/>
            <span>{this.props.friend.fullname}</span>
        </div>
    }

    changeBlockStatus = () => {
        this.state.blockStatus === BlockStatus.selected ? this.props.deselectFriend(this.props.friend.username) : this.props.selectFriend(this.props.friend.username);
        this.setState(state => ({blockStatus: state.blockStatus === BlockStatus.selected ? BlockStatus.deselected : BlockStatus.selected}));
    }
}

export default connect(null, {selectFriend, deselectFriend})(FriendBlock);

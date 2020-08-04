import * as React from 'react';
import FriendsPanelItem from "./FriendsPanelItem";
import {connect} from "react-redux";
import {getCurrentUser, getManyUsersInfo, refresh_unread, setUnread, user} from "../globleFunctions";
import {loadUserFriends, loadUserInfo} from "../../settings/actions";
import {IUser} from "../../../shared/ModelInterfaces";
import {requestAPIJson} from "../Networks";


export interface IFriendsPanelProps {
    userInfo: IUser,
    loadUserFriends: any,
    userFriends: IUser[],
    loadUserInfo: any
}

interface IFriendPanelState {
    unreads: string[]
}

class FriendsPanel extends React.Component<IFriendsPanelProps, IFriendPanelState> {
    public rightCollapse = React.createRef<HTMLDivElement>();
    width: number = 0;
    constructor(props: IFriendsPanelProps) {
        super(props);
        this.state = {unreads: []}

    }

    toggleFriendList = () => {
        const node = this.rightCollapse.current;
        if (node) {
            node.style.width =='0px' ? this.expand(): this.retract();
        }
    };

    retract(){
        let element = this.rightCollapse.current;
        if (element) {
            element.style.width = "0px";
        }
    }

    expand() {
        let element = this.rightCollapse.current;
        if (element) {
            element.style.width = '';
        }
    }

    async componentDidMount() {
        if (window.innerWidth < 1100){
            this.retract();
        }
        const curUser = await getCurrentUser();
        this.props.loadUserInfo(curUser);
        const userFriendList = await getManyUsersInfo(this.props.userInfo.friendUsernames);
        this.props.loadUserFriends(userFriendList);
        setInterval(async () => {
                if (refresh_unread) {
                    let response = await requestAPIJson('/api/v1/chats/unreads');
                    this.setState({unreads: response.unread_users});
                    setUnread(false);
                }
            }, 1000)
    }

    render() {
        return (
            <div  className="right_collapse" ref={this.rightCollapse}>
                <button className = "glyphicon glyphicon-search openbtn onright" onClick={() => this.toggleFriendList()}>
                </button>
                <div>
                <ul className="myFriend">
                    <p> Friends</p>
                    {this.props.userFriends.map((friend) =>
                        <FriendsPanelItem key={friend.username} avatarPath={friend.avatarPath} name={friend.fullname} username={friend.username} unread={this.state.unreads.includes(friend.username)}/>)}
                </ul>
                </div>
            </div>
            
        );
    }

    componentDidUpdate(prevProps: Readonly<IFriendsPanelProps>, prevState: Readonly<{}>, snapshot?: any): void {
        if (window.innerWidth < 1100){
            this.retract();
        }
    }

}
const mapStateToProps = (state: { userInfo: any, userFriends: any }) => {
    return {
        userInfo: state.userInfo,
        userFriends: state.userFriends
    };
};

export default connect(mapStateToProps, {loadUserFriends, loadUserInfo})(FriendsPanel);

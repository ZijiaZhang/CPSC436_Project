import React from "react";
import {createStore} from "redux";
import {connect, Provider} from "react-redux";
import HomePage from "./HomePage";
import {getCurrentUser, getPosts, getUserInfo} from "../../shared/globleFunctions";
import {RouteComponentProps} from "react-router-dom";
import {StaticContext} from "react-router";
import {loadUserInfo} from "../../settings/actions";

type LocationState = {
    from: Location;
};

interface IPostsPageProps extends RouteComponentProps<{}, StaticContext, LocationState> {
    loadUserInfo: any
}

interface IPostsPageState {
    user: any,
}
class PostPage extends React.Component<IPostsPageProps, IPostsPageState>{

    constructor(props: IPostsPageProps) {
        super(props);
        this.state = {user: undefined};
    }

    async componentDidMount() {
        let user_id = new URLSearchParams(this.props.location.search).get("user");
        if (!user_id){
            let user = await getCurrentUser();
            this.setState({user});
            this.props.loadUserInfo(user);
            return
        }
        try {
            let user = await getUserInfo(user_id);
            this.setState({user: user});
            this.props.loadUserInfo(user);
        } catch (e) {
            let user = null;
            this.setState({user: user});
        }
    }

    render() {
        if (this.state.user) {
            return (
                <div>
                    <HomePage user={this.state.user} />
                </div>
            );
        } else if (this.state.user === null){
            return (<h1>Error User Not Found</h1>)
        } else if (this.state.user === undefined){
            return (<h1>Loading</h1>)
        }

    }
}

const mapStateToProps = (state: { userInfo: any}) => {
    return {
        userInfo: state.userInfo
    };
};

export default connect(mapStateToProps, {loadUserInfo})(PostPage);

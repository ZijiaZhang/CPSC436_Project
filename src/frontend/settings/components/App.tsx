import * as React from 'react';
import UserProfile from "./UserProfile";
import {RouteComponentProps, StaticContext} from "react-router";
import {getCurrentUser, getUserInfo} from "../../shared/globleFunctions";

type LocationState = {
    from: Location;
};

interface ISettingsPageState {
    user: any
}

class Settings extends React.Component<RouteComponentProps<{}, StaticContext, LocationState>, ISettingsPageState> {
    constructor(props: RouteComponentProps<{}, StaticContext, LocationState>) {
        super(props);
        this.state = {
            user: undefined
        }
    }

    async componentDidMount() {
        let user_id = new URLSearchParams(this.props.location.search).get("user");
        if (!user_id){
            let user = await getCurrentUser();
            this.setState({user: user});
            return
        }
        try {
            let user = await getUserInfo(user_id);
            this.setState({user: user});
        } catch (e) {
            let user = null;
            this.setState({user: user});
        }
    }

    render() {
        if (this.state.user) {
            return (
                <div className={'height-lg'}>
                    <UserProfile curUser={this.state.user} isSettingsPage={true}/>
                </div>
            );
        } else if (this.state.user === null){
            return (<h1>Error User Not Found</h1>)
        } else if (this.state.user === undefined){
            return (<h1>Loading</h1>)
        }
    }
}


export default Settings;

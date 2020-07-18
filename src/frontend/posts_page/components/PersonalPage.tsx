import React from "react";
import PostBlock from "./PostBlock";
import {IUser} from "../../../shared/ModelInterfaces";

interface IPersonalPageProps {
    savedPosts: any[],
    user: IUser
}

interface IPersonalPageState {

}

class PersonalPage extends React.Component<IPersonalPageProps, IPersonalPageState> {
    constructor(props: IPersonalPageProps) {
        super(props);

    }

    render() {
        const postList = this.props.savedPosts.slice().reverse();
        const savedPosts = postList.map((post) =>
            <PostBlock post={post} />
        );
        return (
            <div>
                {savedPosts}
            </div>
        );
    }

}

export default PersonalPage

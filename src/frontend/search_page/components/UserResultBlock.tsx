import * as React from "react";
import {FriendBannerProps} from "../../share/components/FriendBanner";
import {SearchPageButton} from "./SearchPageButton";

export class UserResultBlock extends React.Component<FriendBannerProps, {}> {
    render() {
        return (
            <div>
                <img src={this.props.image_path} alt="img not found" width="30" height="30"/>
                <span>{this.props.name}</span>
                <SearchPageButton text={'Add'}/>
                <SearchPageButton text={'Chat'}/>
            </div>
        );
    }
}

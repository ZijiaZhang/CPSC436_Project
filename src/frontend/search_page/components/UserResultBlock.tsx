import * as React from "react";
import {ButtonText, SearchPageButton} from "./SearchPageButton";
import {IUserProps} from "../../shared/interfaces/IUserProps";

export class UserResultBlock extends React.Component<IUserProps, {}> {
    render() {
        return (
            <div>
                <img src={this.props.avatarPath} alt="img not found" width="30" height="30"/>
                <span>{this.props.name}</span>
                <SearchPageButton text={ButtonText.Add}/>
                <SearchPageButton text={ButtonText.Chat}/>
            </div>
        );
    }
}

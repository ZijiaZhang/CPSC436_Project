import * as React from "react";

export interface IButtonProps {
    text: ButtonTextEnum,
}

export enum ButtonTextEnum {
    Add = 'Add',
    Chat = 'Chat',
    Search = 'Search'
}

export class SearchPageButton extends React.Component<IButtonProps, {}> {
    render() {
        return (
            <button>{this.props.text}</button>
        );
    }
}

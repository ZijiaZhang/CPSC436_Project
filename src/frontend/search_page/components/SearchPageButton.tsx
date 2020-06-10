import * as React from "react";

export interface ButtonProps {
    text: ButtonText,
}

export enum ButtonText {
    Add = 'Add',
    Chat = 'Chat',
    Search = 'Search'
}

export class SearchPageButton extends React.Component<ButtonProps, {}> {
    render() {
        return (
            <button>{this.props.text}</button>
        );
    }
}

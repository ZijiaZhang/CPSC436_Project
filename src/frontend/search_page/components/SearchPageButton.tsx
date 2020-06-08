import * as React from "react";

export interface ButtonProps {
    text: string,
}

export class SearchPageButton extends React.Component<ButtonProps, {}> {
    render() {
        return (
            <button>{this.props.text}</button>
        );
    }
}

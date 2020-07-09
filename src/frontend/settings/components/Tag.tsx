import * as React from "react";

export interface ITagProps {
    content: string
}

export class Tag extends React.Component<ITagProps, {}> {
    render() {
        return <div className={'tag'}>
            <span>{this.props.content}</span>
        </div>;
    }
}

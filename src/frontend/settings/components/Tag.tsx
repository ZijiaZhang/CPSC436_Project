import * as React from "react";

export interface TagProps {
    content: string
}

export class Tag extends React.Component<TagProps, {}> {
    render() {
        return <div className={'tag'}>
            <span>{this.props.content}</span>
            <span className="close">&times;</span>
        </div>;
    }
}

import * as React from "react";
import {Tag} from "./Tag";

export interface TagContainerProps {
    tags: string[]
}

export class TagContainer extends React.Component<TagContainerProps, {}> {
    render() {
        return <div className={'tag-container settings-item-input'}>
            {this.props.tags.map(tag => {
                return <Tag content={tag}/>
            })}
        </div>;
    }
}

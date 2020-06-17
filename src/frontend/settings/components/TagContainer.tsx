import * as React from "react";
import {Tag} from "./Tag";

export interface ITagContainerProps {
    tags: string[]
}

export class TagContainer extends React.Component<ITagContainerProps, {}> {
    render() {
        return <div className={'tag-container settings-item-input'}>
            {this.props.tags.map(tag => {
                return <Tag content={tag}/>
            })}
        </div>;
    }
}

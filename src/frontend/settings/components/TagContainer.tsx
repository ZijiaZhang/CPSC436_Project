import * as React from "react";
import {Tag} from "./Tag";
import {ITag} from "../../../shared/ModelInterfaces";

export interface ITagContainerProps {
    tags: ITag[]
}

export class TagContainer extends React.Component<ITagContainerProps, {}> {

    render() {
        console.log(this.props.tags);
        return <div className={'tag-container settings-item-input'}>
            {this.props.tags.map(tag => {
                return <Tag content={tag.name}/>
            })}
        </div>;
    }
}

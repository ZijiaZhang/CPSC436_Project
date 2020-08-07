import * as React from "react";
import {Tag} from "./Tag";
import {ITag} from "../../../shared/ModelInterfaces";

export interface ITagContainerProps {
    tags: ITag[]
}

export class TagContainer extends React.Component<ITagContainerProps, {}> {

    render() {
        return <div className={'tag-container settings-item-input'}>
            {this.props.tags.map(tag => {
                return <Tag key={tag._id} content={tag.name}/>
            })}
        </div>;
    }
}

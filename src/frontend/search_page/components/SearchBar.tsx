import * as React from "react";
import {ButtonTextEnum, SearchPageButton} from "./SearchPageButton";

export class SearchBar extends React.Component<{}, {}> {
    render() {
        return (
            <div>
                <input type={'text'}/>
                <SearchPageButton text={ButtonTextEnum.Search}/>
            </div>
        );
    }
}

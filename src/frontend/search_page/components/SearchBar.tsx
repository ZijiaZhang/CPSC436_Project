import * as React from "react";
import {ButtonText, SearchPageButton} from "./SearchPageButton";

export class SearchBar extends React.Component<{}, {}> {
    render() {
        return (
            <div>
                <input type={'text'}/>
                <SearchPageButton text={ButtonText.Search}/>
            </div>
        );
    }
}

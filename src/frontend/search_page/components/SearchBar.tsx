import * as React from "react";
import {SearchPageButton} from "./SearchPageButton";

export class SearchBar extends React.Component<{}, {}> {
    render() {
        return (
            <div>
                <input type={'text'}/>
                <SearchPageButton text={'Search'}/>
            </div>
        );
    }
}

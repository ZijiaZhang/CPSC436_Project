import * as React from 'react';
import {UserResultBlock} from "./UserResultBlock";
import {SearchBar} from "./SearchBar";
import {IUserProps} from "../../shared/interfaces/IUserProps";

const SearchPage = () => {
    const currentUsers: IUserProps[] =
        [
            {avatarPath: './images/dora.png', name: 'Will'},
            {avatarPath: './images/test.png', name: 'Gary'},
            {avatarPath: './images/test2.png', name: 'Denise'},
            {avatarPath: './images/1.ico', name: 'Rommel'}
        ];
    return (
        <div>
            {currentUsers.map(user => {
                return <UserResultBlock key={user.name} avatarPath={user.avatarPath} name={user.name}/>;
            })}
            <SearchBar/>
        </div>
    );
};

export default SearchPage;

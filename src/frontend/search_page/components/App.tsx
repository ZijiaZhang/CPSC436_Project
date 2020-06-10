import * as React from 'react';
import {FriendBannerProps} from "../../share/components/FriendBanner";
import {UserResultBlock} from "./UserResultBlock";
import {SearchBar} from "./SearchBar";

const SearchPage = () => {
    const currentUsers: FriendBannerProps[] =
        [
            {image_path: './images/dora.png', name: 'Will'},
            {image_path: './images/test.png', name: 'Gary'},
            {image_path: './images/test2.png', name: 'Denise'},
            {image_path: './images/1.ico', name: 'Rommel'}
        ];
    return (
        <div>
            {currentUsers.map(user => {
                return <UserResultBlock key={user.name} image_path={user.image_path} name={user.name}/>;
            })}
            <SearchBar/>
        </div>
    );
};

export default SearchPage;

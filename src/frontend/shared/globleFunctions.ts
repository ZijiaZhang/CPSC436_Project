import {IUserProps} from "./interfaces/IUserProps";

export let user: any;

export async function getCurrentUser() {
    let user_res = await fetch('/api/v1/users');
    user = await user_res.json();
    return user
}

export async function getUserInfo(user_id: string) {
    let user_res = await fetch('/api/v1/users/' + user_id);
    return await user_res.json();

}

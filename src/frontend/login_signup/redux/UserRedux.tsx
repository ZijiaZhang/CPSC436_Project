import axios from 'axios';
const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const TODO_ERRSHOW = 'TODO_ERRSHOW';

let initState = {
    redirectTo: '', 
    username: '', 
    password: '', 
    msg: '', 
    isLogin: false 
}

export function user(state=initState,action: any) {
    switch (action.type) {
       case REGISTER_SUCCESS:
            return {...state,...action.data, msg: '', redirectTo: '/login'}
       case TODO_ERRSHOW:
            return {...state,msg: action.msg}
       default:
            return state;
    }
}

function registerFail(msg: string) {
    return {
        msg,
        type: TODO_ERRSHOW
    }
}

function registerSuccess(data: any) {
    return {
        data,
        type: REGISTER_SUCCESS
    }
}

export function register(username: string, password: string, type:any) {
    if(!username || !password) {
        registerFail('Username or Password cannot be empty')
    }
    return (dispatch: any) => {
        axios.post('/user/register',{username,password, type})
            .then(res => {
                if(res.status === 200 && res.data.code === 0) {
                    dispatch(registerSuccess(res.data.data))
                }else {
                    dispatch(registerFail(res.data.msg))
                }
            })
    }
}
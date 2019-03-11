import Promise from 'es6-promise';


const LOGIN_PENDING = 'LOGIN_PENDING';
const LOGIN_SUCCESSFUL = 'LOGIN_SUCCESSFUL';
const LOGIN_ERROR = 'LOGIN_ERROR';


function isLoginPending(loginPending) {
    return {
        type: LOGIN_PENDING,
        payload: loginPending
    }
};

function isLoginSuccess(loginSuccess) {
    return {
        type: LOGIN_SUCCESSFUL,
        payload: loginSuccess
    }
};

function isLoginError(loginError) {
    return {
        type: LOGIN_ERROR,
        payload: loginError
    }
};

export default function reducer(state = {
    loginPending: false,
    loginSuccessful: false,
    loginError: null
}, action) {
    const { type, payload } = action;
    switch (type) {
        case 'LOGIN_PENDING':
            return {
                ...state,
                loginPending: payload,
                loginSuccessful: false,
                loginError: null
            }

        case 'LOGIN_SUCCESSFUL':
            return {
                ...state,
                loginPending: false,
                loginSuccessful: payload,
                loginError: null
            }
        case 'LOGIN_ERROR':
            return {
                ...state,
                loginPending: false,
                loginSuccessful: false,
                loginError: payload
            }
        default:
            return state;
    }
}

function sendLoginRequest({ email, password }) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (email === 'apaar256' && password === "123") {
                resolve('success');
            } else {
                reject('Please provide correct details')
            }
        }, 4000);
    });
}

export const login = (payload) => {
    return dispatch => {
        dispatch(isLoginPending(true));
        dispatch(isLoginSuccess(false));
        dispatch(isLoginError(null));

        sendLoginRequest(payload).then(() => {
            dispatch(isLoginPending(false));
            dispatch(isLoginSuccess(true));
        }).catch(err => {
            dispatch(isLoginPending(false));
            dispatch(isLoginError(err));
        })
    }
}
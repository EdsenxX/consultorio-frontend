const INITIAL_STATE = {
    login: false,
    user: null
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "setLogin":
            return {...state, login: action.payload.login, user: action.payload.user}
        case "logout":
            return {...state, login: false, user: null}
        default:
            return state;
    }
}
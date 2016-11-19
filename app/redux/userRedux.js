import { setToken, getToken, clearToken, tokenHasExpired } from '../api/Storage'

const TYPES = {
    AUTHENTICATION_PENDING: 'AUTHENTICATION_PENDING',
    AUTHENTICATION_SUCCESS: 'AUTHENTICATION_SUCCESS',
    AUTHENTICATION_FAILURE: 'AUTHENTICATION_FAILURE',
}

const authenticationSuccess = (token) => {
    setToken(token)

    return {
        type: TYPES.AUTHENTICATION_SUCCESS,
        payload: {token}
    }
}

const startAuthentication = () => async (dispatch) => {
    let token = await getToken()
    let isTokenExpired = await tokenHasExpired()

    if (isTokenExpired) {
        clearToken()
    }

    if (token && !isTokenExpired) {
        return dispatch(authenticationSuccess(token))
    }

    // not saved locally so need to go get it
    return dispatch({
        type: TYPES.AUTHENTICATION_PENDING
    })
}

const authenticationFailure = (error) => ({
    type: TYPES.AUTHENTICATION_FAILURE,
    error,
})

export const actionCreators = {
    startAuthentication,
    authenticationSuccess,
    authenticationFailure,
}

const initialState = {
    isAuthenticating: false,
    token: null,
    error: null,
}

export const reducer = (state = initialState, action) => {
    let {type, payload, error} = action

    if (type === TYPES.AUTHENTICATION_PENDING) {
        return {
            ...state,
            isAuthenticating: true,
            token: null,
            error: null,
        }
    }

    if (type === TYPES.AUTHENTICATION_SUCCESS) {
        return {
            ...state,
            isAuthenticating: false,
            token: payload.token,
            error: null,
        }
    }

    if (type === TYPES.AUTHENTICATION_FAILURE) {
        return {
            ...state,
            isAuthenticating: false,
            token: null,
            error
        }
    }

    return state
}

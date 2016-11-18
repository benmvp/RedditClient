/**
 * AsyncStorage is a simple, unencrypted, asynchronous,
 * persistent, key-value storage system that is global to the app.
 * It should be used instead of LocalStorage.
 * https://facebook.github.io/react-native/docs/asyncstorage.html
 */
import { AsyncStorage } from 'react-native'

const TOKEN_KEY = '@RedditClient:token'
const EXPIRATION_TIME = 30 * 60 * 100

/**
 * the format of these functions should be in the form of ...
 * export const functionName = () => async () => { ... }
 *
 * ... you can then import them as import { storageFn } from './relative/path/to/Storage.js'
 */

const _isExpired = (time) => (
    (Date.now - time) > EXPIRATION_TIME
)
const _getTokenInfo = async () => (
    await (
        AsyncStorage.getItem(TOKEN_KEY)
            .then((item) => JSON.parse(item))
    )
)

export const setToken = async (token) => (
    await AsyncStorage.setItem(
        TOKEN_KEY,
        JSON.stringify({
            token,
            expires: Date.now()
        })
    )
)

export const getToken = async () => (
    await (
        _getTokenInfo()
            .then(({token}) => token)
    )
)

export const clearToken = async () => (
    await AsyncStorage.removeItem(TOKEN_KEY)
)

export const tokenHasExpired = async () => {
    await (
        _getTokenInfo()
            .then(({expires}) => _isExpired(expires))
    )
}

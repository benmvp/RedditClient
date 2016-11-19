import {combineReducers} from 'redux'
import RedditClient from '../api/RedditClient'

const TYPES = {
    FETCH_POSTS_PENDING: 'FETCH_POSTS_PENDING',
    FETCH_POSTS_SUCCESS: 'FETCH_POSTS_SUCCESS',
    FETCH_POSTS_FAILURE: 'FETCH_POSTS_FAILURE',
}

const isFetching = (state = false, {type}) => {
    if (type === TYPES.FETCH_POSTS_PENDING) {
        return true
    }

    if (type === TYPES.FETCH_POSTS_FAILURE || type === TYPES.FETCH_POSTS_SUCCESS) {
        return false;
    }

    return state;
}

const timestamp = (state = null, {type, payload}) => {
    if (type === TYPES.FETCH_POSTS_SUCCESS) {
        return payload.timestamp
    }

    return state;
}

const subreddits = (state = {hot: [], random: []}, {type, payload, error}) => {
    if (type === TYPES.FETCH_POSTS_SUCCESS) {
        return {
            ...state,
            [payload.subreddit]: payload.items || [],
            error: null
        }
    }

    if (type === TYPES.FETCH_POSTS_FAILURE) {
        return {
            ...state,
            [payload.subreddit]: [],
            error
        }
    }

    return state;
}

const fetchPostsPending = () => ({
    type: TYPES.FETCH_POSTS_PENDING,
    payload: {
        timestamp: Date.now()
    }
})

const fetchPosts = (subreddit) = async (dispatch, getState) => {
    dispatch(fetchPostsPending())


}

const fetchPostsSuccess = (subreddit, items) => ({
    type: TYPES.FETCH_POSTS_SUCCESS,
    payload: {subreddit, items}
})

const fetchPostsFailure = (error) => ({
    type: TYPES.FETCH_POSTS_FAILURE,
    error
})

export const actionCreators = {
    fetchPosts,
    fetchPostsSuccess,
    fetchPostsFailure
}

export const reducer = combineReducers({
    isFetching,
    timestamp,
    subreddits
})

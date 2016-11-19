const BASE_URL = 'https://oauth.reddit.com/'

const _fetch = (url, token) => (
    fetch(url, {
        headers: {
            'Authorization': `bearer ${token}`,
        }
    })
        .then((response) => response.json())
)

export const getPosts = async (subreddit, token) => (
    await _fetch(`${BASE_URL}/${subreddit}`, token)
)

export const getRandom = getPosts.bind(null, 'random')

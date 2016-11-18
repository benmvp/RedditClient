import React, { Component, PropTypes } from 'react'
import { View, WebView } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Actions, ActionConst } from 'react-native-router-flux'
import { userActionCreators } from '../redux'

import Storage from '../api/Storage'

const REDDIT_APP_ID = 'Mcnxsc2BLOXi8w'
const LOGIN_URL = `https://www.reddit.com/api/v1/authorize.compact?client_id=${REDDIT_APP_ID}&response_type=token&state=RANDOM_STRING&redirect_uri=about://callback/login&scope=read`

// Regex shortcut to grab the access_token if the URL matches this format.
const TOKEN_URL_REGEX = /^about:\/\/callback\/login#access_token=(.+)&token/

const mapStateToProps = ({user: {isAuthenticating, token}}) => ({
    isAuthenticating,
    token
})

const mapDispatchToProps = (dispatch) => (
    bindActionCreators(userActionCreators, dispatch)
)

class Login extends Component {
  static propTypes = {
  }

  componentDidMount() {
      this.props.startAuthentication()
  }

  componentWillReceiveProps({token}) {
      if (token) {
          Actions.tabs()
      }
  }

  // We watch for changes in navigation, because we asked Reddit to redirect us
  // to an arbitrary URL callback://login when the login has been completed.
  onNavigationStateChange = ({url}) => {
      let {isAuthenticating, authenticationSuccess} = this.props;

      if (isAuthenticating && url.startsWith('about://callback/login#')) {
          let [, accessToken] = url.match(TOKEN_URL_REGEX)
          authenticationSuccess(accessToken)
      }
  }

    render() {
        return (
            <WebView
                source={{uri: LOGIN_URL}}
                onNavigationStateChange={this.onNavigationStateChange}
            />
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)

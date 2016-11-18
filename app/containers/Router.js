import React, { Component } from 'react'
import { StyleSheet, Text } from 'react-native'
import { Router, Scene, Modal, ActionConst } from 'react-native-router-flux'
import { connect } from 'react-redux'

import Login from './Login'
import Posts from './Posts'
import Random from './Random'

const styles = StyleSheet.create({
    tabBar: {
        borderTopWidth: 0.5,
        borderColor: '#b7b7b7',
        backgroundColor: '#fff',
        opacity: 1
    },
    page: {
        paddingTop: 64
    },
    tabIcon: {
        color: 'black',
    },
    selectedTabIcon: {
        color: 'red'
    }
})

const TabIcon = ({title, selected}) => {
    let style = selected ? styles.selectedTabIcon : styles.tabIcon;

    return (
        <Text style={style}>{title}</Text>
    );
}

class AppRouter extends Component {
    render() {
   	    return (
            <Router>
                <Scene key="root">
                    <Scene
                        key="tabs"
                        hideNavBar={true}
                        tabs={true}
                        tabBarStyle={styles.tabBar}
                        direction="vertical"
                    >
                        <Scene
                            key="postsTab"
                            title="Feed"
                            icon={TabIcon}
                            style={styles.page}
                        >
                            <Scene
                                key="posts"
                                component={Posts}
                                subreddit="hot"
                                title="Reddit Posts"
                                passProps={true}
                            />
                        </Scene>

                        <Scene
                            key="randomTab"
                            title="Random"
                            icon={TabIcon}
                            style={styles.page}
                        >
                            <Scene
                                key="random"
                                component={Random}
                                subreddit="random"
                                title="Reddit Random"
                                passProps={true}
                            />
                        </Scene>
                    </Scene>

                    <Scene
                        key="login"
                        title="Login"
                        direction="vertical"
                        initial={true}
                    >
                        <Scene
                            key="loginContent"
                            title="Login"
                            component={Login}
                            style={styles.page}
                        />
                    </Scene>
                </Scene>
            </Router>
        )
    }
}

export default connect()(AppRouter)

import React, { Component } from 'react'
import { withRouter, Switch, Route } from 'react-router-dom'
import { Home, Settings } from '../../components'

import Header from 'grommet/components/Header'
import Title from 'grommet/components/Title'
import Box from 'grommet/components/Box'
import Menu from 'grommet/components/Menu'
import Anchor from 'grommet/components/Anchor'
import Toast from 'grommet/components/Toast'

import IconApps from 'grommet/components/icons/base/Apps'
import IconConfigure from 'grommet/components/icons/base/Configure'
import IconCluster from 'grommet/components/icons/base/ServerCluster'
import IconHome from 'grommet/components/icons/base/Home'

class App extends Component {
    state = {
        hosts: [],
    }

    async componentDidMount () {
        const settings = await fetch('/api/setting').then(res => res.json())
        const { history } = this.props

        if (!settings.tmdbKey && !settings.toWatch) {
            history.push('/settings')
            this.setState({
                UIShowIncompleteSetupToast: true,
            })
        }
    }

    _handleToastClose = () =>
        this.setState({
            UIShowIncompleteSetupToast: false,
        })

    render () {
        const { UIShowIncompleteSetupToast } = this.state
        return (
            <div>
                {UIShowIncompleteSetupToast ? (
                    <Toast status="warning" onClose={this._handleToastClose}>
                        Please configure first your TMDB_KEY and some paths to
                        watch
                    </Toast>
                ) : null}
                <Header>
                    <Title>Oasis</Title>
                    <Box flex={true} justify="end" direction="row">
                        <Menu
                            icon={<IconApps />}
                            dropAlign={{ right: 'right' }}>
                            <Anchor icon={<IconHome />} label="Home" path="/" />
                            <Anchor
                                icon={<IconCluster />}
                                label="Manage hosts"
                                path="/hosts"
                            />
                            <Anchor
                                icon={<IconConfigure />}
                                label="Settings"
                                path="/settings"
                            />
                        </Menu>
                    </Box>
                </Header>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/settings" component={Settings} />
                </Switch>
            </div>
        )
    }
}

export default withRouter(App)

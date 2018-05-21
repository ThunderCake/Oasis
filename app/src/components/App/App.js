import React, { Component } from 'react'
import { withRouter, Switch, Route, Link } from 'react-router-dom'
import { Home, Settings, Hosts } from '../../components'

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
                <header>
                    <h1>Oasis</h1>
                    <div>
                        <Link to="/">Home</Link>
                        <Link to="/hosts">Manage hosts</Link>
                        <Link to="/settings">Settings</Link>
                    </div>
                </header>
                {/* <Switch> */}
                <Route path="/" component={Home} />
                <Route path="/settings" component={Settings} />
                <Route path="/hosts" component={Hosts} />
                {/* </Switch> */}
            </div>
        )
    }
}

export default withRouter(App)

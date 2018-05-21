import React, { Component } from 'react'

import Toast from 'grommet/components/Toast'

class Home extends Component {
    state = {
        hosts: [],
        settings: {},
    }

    async componentDidMount () {
        // const settings = await fetch('/api/setting').then(res => res.json())
        const settings = {}
        const { history } = this.props

        if (!settings.setupComplete) {
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
                        Please configure first your TMDB_KEY and path to watch
                    </Toast>
                ) : null}
            </div>
        )
    }
}

export default Home

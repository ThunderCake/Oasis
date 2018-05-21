import React, { Component } from 'react'
import { Modal } from '../../components'
import { withRouter } from 'react-router-dom'

const Header = () => <h1>Settings</h1>

class Settings extends Component {
    state = {
        settings: {},
        isLoading: false,
    }

    async componentDidMount () {
        const settings = await fetch('/api/setting').then(res => res.json())
        this.setState({ ...settings })
    }

    _handleChange = key => ({ target: { value } }) => {
        this.setState({
            [key]: value,
        })
    }

    _handleBlur = key => async event => {
        const { [key]: value } = this.state
        const body = JSON.stringify({ key, value })

        this.setState({ isLoading: true })
        await fetch('/api/setting', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body,
        })
        this.setState({ isLoading: false })
    }

    _handleClose = () => {
        this.props.history.push('/')
    }

    render () {
        // console.log(this.state)
        return (
            <Modal onClose={this._handleClose} header={<Header />}>
                <fieldset label="Your TMDB API Key">
                    <input
                        value={this.state.tmdbKey || ''}
                        onBlur={this._handleBlur('tmdbKey')}
                        onChange={this._handleChange('tmdbKey')}
                    />
                </fieldset>
                <fieldset label="Paths to watch (must be absolute, comma sperated)">
                    <input
                        value={this.state.toWatch || ''}
                        onBlur={this._handleBlur('toWatch')}
                        onChange={this._handleChange('toWatch')}
                    />
                </fieldset>
            </Modal>
        )
    }
}

export default withRouter(Settings)

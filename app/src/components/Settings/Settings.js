import React, { Component } from 'react'

import Form from 'grommet/components/Form'
import FormField from 'grommet/components/FormField'
import TextInput from 'grommet/components/TextInput'

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

    render () {
        // console.log(this.state)
        return (
            <Form>
                <FormField label="Your TMDB API Key">
                    <TextInput
                        value={this.state.tmdbKey || ''}
                        onBlur={this._handleBlur('tmdbKey')}
                        onDOMChange={this._handleChange('tmdbKey')}
                    />
                </FormField>
                <FormField label="Paths to watch (must be absolute, comma sperated)">
                    <TextInput
                        value={this.state.toWatch || ''}
                        onBlur={this._handleBlur('toWatch')}
                        onDOMChange={this._handleChange('toWatch')}
                    />
                </FormField>
            </Form>
        )
    }
}

export default Settings

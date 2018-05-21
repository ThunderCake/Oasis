import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Settings extends Component {

    state = {}

    _handleChage = key => (event) => {
        const { value } = event.target

        this.setState({
            [key]: value
        })
    }

    _handleOnBlur = key => (event) => {
        const value = this.state[key]
        const body = {
            key: value
        }

        const response = fetch('/api/setting/add',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            }).then((response) => {
                var content = response.json()
                console.log(content)
            })
    }

    render() {
        return (
            <div>
                <h1>Settings</h1>
                <Link to="/">Home</Link>

                <input onBlur={this._handleOnBlur('tmdb_api_key')} onChange={this._handleChage('tmdb_api_key')} type="text" name="tmdb_api_key" placeholder="Tmdb Api Key"></input>
                <textarea onBlur={this._handleOnBlur('watch_paths')} onChange={this._handleChage('watch_paths')} name="watch_paths" id="" cols="40" rows="10" placeholder="Watch path"></textarea>
            </div>
        )
    }
}

export default Settings;
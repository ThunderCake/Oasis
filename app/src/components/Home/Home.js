import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Home extends Component {
    state = {
        hosts: [],
    }

    render () {
        return (
            <div>
                <Link to="/settings">Settings</Link>
            </div>
        )
    }
}

export default Home

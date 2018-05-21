import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {

    state = {
        hosts: []
    }

    render() {
        return (
            <div>
                <h1>Home</h1>
                <Link to="/settings">Settings</Link>
            </div>
        )
    }
}

export default Home;
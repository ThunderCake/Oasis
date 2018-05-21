import React from 'react';
import styles from './App.scss';
import { Switch, Route, Link } from 'react-router-dom';

const Home = () => (
    <div>
        <h1>Home</h1>
        <Link to="/settings">Settings</Link>
    </div>
)

const Settings = () => (
    <div>
        <h1>Settings</h1>
        <Link to="/">Home</Link>
    </div>
)

const App = () => {
    return (
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/settings' component={Settings}/>
        </Switch>
    );
  };

export default App;
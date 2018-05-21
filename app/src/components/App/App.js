import React, { Component } from 'react';
import styles from './App.scss';
import { Switch, Route, Link } from 'react-router-dom';
import { Home, Settings } from '../../components';

const App = () => {
    return (
        <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/settings' component={Settings} />
        </Switch>
    );
};

export default App;
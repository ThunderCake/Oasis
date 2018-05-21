import '@babel/polyfill';

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from 'react-router-dom'
import { App as Main } from './components'
import App from 'grommet/components/App'

import './index.scss'
import 'grommet/grommet-hpinc.min.css';

if (module.hot) module.hot.accept();

ReactDOM.render((
    <App centered={false}>
        <BrowserRouter>
            <Main />
        </BrowserRouter>
    </App >
), document.getElementById("root"));
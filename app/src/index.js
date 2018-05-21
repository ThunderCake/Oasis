import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from 'react-router-dom'
import { App as Main } from './components'
import 'grommet/grommet.min.css';

import App from 'grommet/components/App'

if (module.hot) module.hot.accept();

ReactDOM.render((
    <App>
        <BrowserRouter>
            <Main />
        </BrowserRouter>
    </App >
), document.getElementById("root"));
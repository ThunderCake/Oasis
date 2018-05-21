import '@babel/polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { App as Main } from './components'

import './index.scss'

if (module.hot) module.hot.accept()

ReactDOM.render(
    <BrowserRouter>
        <Main />
    </BrowserRouter>,
    document.getElementById('root')
)

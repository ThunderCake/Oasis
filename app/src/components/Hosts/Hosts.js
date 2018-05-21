import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Modal } from '../../components'
import styles from './Hosts.scss'

const Header = () => <h1>Manage peers</h1>

class Hosts extends Component {
    state = {
        hosts: [],
    }

    async componentDidMount () {
        const hosts = await fetch('/api/host').then(res => res.json())
        this.setState({ hosts })
    }

    _handleClose = () => {
        this.props.history.push('/')
    }

    _handleAdd = () => {
        console.log('xoxo')
    }

    render () {
        const { hosts } = this.state
        return (
            <Modal onClose={this._handleClose} header={<Header />}>
                <button onClick={this._handleAdd}>Add peer</button>
                <div className={styles.list}>
                    <div>
                        <span>Hostname</span>
                        <span>Username</span>
                        <span>Identity</span>
                        <span>Database</span>
                        <span>Reachable</span>
                    </div>
                    {hosts.map(
                        ({ hostname, username, privateKey, db }, index) => (
                            <div key={index}>
                                <span contentEditable>{hostname}</span>
                                <span contentEditable>{username}</span>
                                <span contentEditable>{privateKey}</span>
                                <span contentEditable>{db}</span>
                                <span />
                            </div>
                        )
                    )}
                </div>
            </Modal>
        )
    }
}
export default withRouter(Hosts)

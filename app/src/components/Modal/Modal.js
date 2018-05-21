import React, { Component } from 'react'
import styles from './Modal.scss'

class Modal extends Component {
    render () {
        const { children, onClose, header } = this.props
        return (
            <div className={styles.view}>
                {onClose ? (
                    <button className={styles.close} onClick={onClose}>
                        ×
                    </button>
                ) : null}
                {header ? <header>{header}</header> : null}
                {children}
            </div>
        )
    }
}

export default Modal

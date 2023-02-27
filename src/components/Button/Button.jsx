import React from 'react'
import './Button.css'


export default function Button(props) {
    let className = 'Button'

    if (props.transparent) {
        className += '-transparent'
    }
    if (props.round) {
        className += ' Button-round'
    }

    if (props.className) {
        className += ` ${props.className}`
    }

    return (
        <button onClick={props.onClick} className={className} disabled={props.disabled}>
            {props.children}
        </button>
    )
}
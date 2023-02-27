import React from 'react'
import './Button.css'


export default function Button(props) {
    let className = 'Button'

    if (props.className) {
        className += ` ${className}`
    }

    return (
        <button onClick={props.onClick} className={className} disabled={props.disabled}>
            {props.children}
        </button>
    )
}
import React from 'react'
import './Button.css'

const Button = React.forwardRef((props, ref) => {
    const {className, transparent, destructive, circle, rounded, children, ...restOfProps} = props
    let classes = 'Button'

    if (transparent) {
        classes += '-transparent'
        if (destructive) {
            classes += ' Button-transparent-destructive'
        }
    }
    if (circle) {
        classes += ' Button-circle'
    } else if (rounded) {
        classes += ' Button-rounded'
    }

    if (className) {
        classes += ` ${className}`
    }

    return (
        <button className={classes} {...restOfProps} ref={ref}>
            {children}
        </button>
    )
})

export default Button
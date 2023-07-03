import React from 'react';
import NotifIcon from '../errorMessage/NotifIcon'
import classes from './Error.module.css'

const ErrorMessage = () => {
    return (
        <figure className={classes.notification}>
            <div className={classes.notification_body}>
                <NotifIcon />
                authentication failed
            </div>
            <div className={classes.notification_progress}></div>
        </figure>
    )
}

export default ErrorMessage
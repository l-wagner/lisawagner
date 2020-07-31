import React from 'react';
import {makeStyles } from '@material-ui/core';

// import logo from './logo.png';

function Solutions() {
    const classes = useStyles();

    return (
        <div className={classes.container}>Solutions to be added.</div>
        //{' '}
    );
}

const useStyles = makeStyles((theme) => ({
    container: {
        backgroundColor: 'white',
        width: '100vw',
        height: '100vh',
    },

   
}));

export default Solutions;

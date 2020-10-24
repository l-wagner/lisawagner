import React from 'react';
import { AppBar, Tab, Tabs, Typography, makeStyles } from '@material-ui/core';
import { Link, useLocation } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingRight: theme.spacing(5),
        marginBottom: theme.spacing(5),
    },
    title: {
        display: 'inline-flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        // color: theme.palette.secondary.dark,
    },
}));

function Header() {
    const classes = useStyles();
    const path = useLocation().pathname;
    return (
        <AppBar className={classes.container} position='static' color='transparent'>
            <Tabs value={path==='/about' ? '/about' : '/solutions'} indicatorColor='secondary'>
                
                <Tab label='solutions' value='/solutions' to='/solutions' component={Link} />
                <Tab label='about' value='/about' component={Link} to='/about' />
            </Tabs>

            <Typography className={classes.title}  variant='h5'>
                lisawagner.io
                {useLocation().pathname}
            </Typography>
        </AppBar>
    );
}

export default Header;
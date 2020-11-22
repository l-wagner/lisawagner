import React from 'react';
import { Grid, Paper, ButtonGroup, Button, Icon, Link, makeStyles } from '@material-ui/core';

import img from './lisa2020.jpeg';
import cvicon from './cvicon.png';

function About() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={3} direction='row' justify='center' alignItems='center'>
                <Grid item xs={12} sm={3}>
                    <Paper className={classes.paper} elevation={3}>
                        <img className={classes.img} src={img} />
                        <div className={classes.links}>
                            <ButtonGroup color='secondary' size='medium' aria-label='small outlined primary button group'>
                                <Button target='_blank' href='https://github.com/l-wagner'>
                                    <Icon className='fab fa-github' />
                                </Button>
                                <Button target='_blank' href='https://www.linkedin.com/in/lisa-wagner-62469296/'>
                                    <Icon className='fab fa-linkedin-in' />
                                </Button>
                                <Button href={require("./LisaWagner_Resume_2020.pdf")} download="LisaWagner_Resume_2020">
                                    <span className={classes.cv}>CV</span>
                                </Button>
                                <Button href='mailto:mail@lisawagner.io'>
                                    <Icon className='fa fa-envelope' />
                                </Button>
                            </ButtonGroup>
                        </div>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: 'white',
        flexGrow: 1,
    },
    paper: {
        width: '100%',
        // height: '100vh',
        paddingBottom: theme.spacing(5),
        textAlign: 'center',
    },
    img: {
        objectFit: 'cover',
        objectPosition: '50% 50%',
        width: '100%',
        height: '40%',
        borderTopLeftRadius: '5px',
        borderTopRightRadius: '5px',
    },
    links: {
        marginTop: theme.spacing(3),
    },
    cv: {
        fontWeight: 'bolder',
    },
}));

export default About;

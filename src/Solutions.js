import React from 'react';
import { makeStyles, ButtonBase, Typography, Container } from '@material-ui/core';

// import logo from './logo.png';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(4),
        maxWidth: '90vw',
    },
    images: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexWrap: 'wrap',
    },
    imageWrapper: {
        position: 'relative',
        display: 'block',
        padding: 0,
        borderRadius: 0,
        height: '40vh',
        [theme.breakpoints.down('sm')]: {
            width: '100% !important',
            height: 100,
        },
        '&:hover': {
            zIndex: 1,
        },
        '&:hover $imageBackdrop': {
            opacity: 0.15,
        },
        '&:hover $imageMarked': {
            opacity: 0,
        },
        '&:hover $imageTitle': {
            border: '4px solid currentColor',
        },
    },
    imageButton: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.common.white,
    },
    imageSrc: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
    },
    imageBackdrop: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        background: theme.palette.common.black,
        opacity: 0.3,
        transition: theme.transitions.create('opacity'),
    },
    imageTitle: {
        position: 'relative',
        color: theme.palette.common.white,
        padding: `${theme.spacing(2)}px ${theme.spacing(4)}px 14px`,
    },
    imageMarked: {
        height: 3,
        width: 18,
        background: theme.palette.common.white,
        position: 'absolute',
        bottom: -2,
        left: 'calc(50% - 9px)',
        transition: theme.transitions.create('opacity'),
    },
    link: {
        height: '100%',
        width: '100%',
        display: 'block',
    },
}));
function Solutions() {
    const classes = useStyles();

    const images = [
        {
            url:
                'https://images.unsplash.com/photo-1562319926-4dbdecfa9962?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1580&q=80',
            title: 'ExcelJS TBA',
            width: '25%',
        },
        {
            url:
                'https://images.unsplash.com/photo-1553060146-71667aa3f223?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1534&q=80',
            title: 'Happy Endings',
            link: 'https://lisawagner.io/#/about',
            width: '35%',
        },

        {
            url:
                'https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3889&q=80',
            title: 'Course Material',
            link: 'https://github.com/l-wagner/webDevFiles',
            width: '40%',
        },
        {
            url:
                'https://images.unsplash.com/photo-1575338817731-c3bbda649b55?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1534&q=80',
            title: 'Internalized Mysogony',
            width: '20%',
        },
        {
            url:
                'https://images.unsplash.com/photo-1593720216276-0caa6452e004?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3824&q=80',
            title: 'TBA',
            width: '35%',
        },

        {
            url: 'https://images.unsplash.com/photo-1561414927-6d86591d0c4f?ixlib=rb-1.2.1&auto=format&fit=crop&w=3066&q=80',
            title: 'TBA',
            width: '45%',
        },
    ];

    return (
        <Container className={classes.root} component='section'>
            <Typography variant='h4' marked='center' align='center' component='h2'>
                Unnecessarily Useful
            </Typography>
            <div className={classes.images}>
                {images.map((image) => (
                    <ButtonBase
                        key={image.title}
                        className={classes.imageWrapper}
                        style={{
                            width: image.width,
                        }}>
                        <div
                            className={classes.imageSrc}
                            style={{
                                backgroundImage: `url(${image.url})`,
                            }}
                        />
                        <div className={classes.imageBackdrop} />
                        <a className={classes.imageButton} target='_blank' href={image.link}>
                            <Typography component='h3' variant='h6' color='inherit' className={classes.imageTitle}>
                                {image.title}
                                <div className={classes.imageMarked}></div>
                            </Typography>
                        </a>
                    </ButtonBase>
                ))}
            </div>
        </Container>
    );
}

export default Solutions;

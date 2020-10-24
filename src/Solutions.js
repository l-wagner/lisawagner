import React, { useState } from 'react';
import { makeStyles, ButtonBase, Typography, Container, Fade } from '@material-ui/core';
import { Link } from 'react-router-dom';

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
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
    disabled: {
        cursor: 'unset',
    },
}));
function Solutions() {
    const classes = useStyles();
    const [isHovered, setIsHovered] = useState(false);

    const images = [
        {
            url:
                'https://images.unsplash.com/photo-1553060146-71667aa3f223?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1534&q=80',
            title: 'HAPPY ENDINGS',
            link: '/happyendings',
            width: '40%',
        },
        {
            url:
                'https://images.unsplash.com/photo-1562319926-4dbdecfa9962?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1580&q=80',
            title: 'DYNAMIC DROPDOWNS IN EXCELJS',
            hoverTitle: 'Exporting grids to xlsx with dynamic dropdowns. Without empty entries or range assignment quotation issues. ',
            external: true,
            target: '_blank',
            link: 'https://gist.github.com/l-wagner/8648deaf1434b44ce1e768bb10df2c2c',
            width: '30%',
        },
        {
            url:
                'https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3889&q=80',
            title: 'COURSE MATERIAL',
            external: true,
            link: 'https://github.com/l-wagner/webDevFiles',
            target: '_blank',
            width: '30%',
        },
        {
            url:
                'https://images.unsplash.com/photo-1600429991827-5224817554f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
            title: 'WHERE...IN DYNAMIC LIST ORACLEDB + NODE ',
            hoverTitle: 'Querying for list matches in OracleDB using JS without quotation or other String representation issues.',
            width: '25%',
            external: true,
            target: '_blank',
            link: 'https://gist.github.com/l-wagner/8648deaf1434b44ce1e768bb10df2c2c',
        },
        {
            url:
                'https://images.unsplash.com/photo-1593720216276-0caa6452e004?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3824&q=80',
            title: 'CUSTOM RENDERER IN REACT HANDSONTABLE',
            hoverTitle: 'Custom rendering in Handsontable without losing editing functionality or change events.',
            width: '35%',
            external: true,
            target: '_blank',
            link: 'https://gist.github.com/l-wagner/f602f99d0d04afd78f429bb780aff96b',
        },

        {
            url:
                'https://images.unsplash.com/photo-1526721940322-10fb6e3ae94a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1651&q=80',
            title: 'GOODREADS PARSER',
            hoverTitle: 'Pull your read books and parse them from XML to JSON. If you read more than 200, it pulls in API conform batches.',
            width: '40%',
            external: true,
            target: '_blank',
            link: 'https://gist.github.com/l-wagner/4fe3b5f8a9bbb459c1258d06bdd56628',
        },
    ];

    return (
        <Container className={classes.root} component='section'>
            <Typography variant='h4' marked='center' align='center' component='h2'>
                Unnecessarily Useful
                <Typography variant='h6' marked='center' align='center' component='h2'>
                    Solutions for coding problems that caused me sleepless nights but you might never encounter.
                    <br />
                    Endings for books you might never read.
                    <br />
                    Materials for my coding classes.
                </Typography>
            </Typography>
            <div className={classes.images}>
                {images.map((image) => (
                    <ButtonBase
                        onMouseEnter={() => setIsHovered(image.title)}
                        onMouseLeave={() => setIsHovered(false)}
                        key={image.title}
                        className={`${classes.imageWrapper} ${image.title.includes('TBA') ? classes.disabled : ''}`}
                        style={{ width: image.width }}>
                        <div className={classes.imageSrc} style={{ backgroundImage: `url(${image.url})` }} />
                        <div className={classes.imageBackdrop} />
                        {image.external ? (
                            <a className={classes.imageButton} target={image.target} href={image.link}>
                                <Typography component='h3' variant='h6' color='inherit' className={classes.imageTitle}>
                                    {image.hoverTitle && isHovered === image.title ? image.hoverTitle : image.title}

                                    <div className={classes.imageMarked}></div>
                                </Typography>
                            </a>
                        ) : (
                            <Link className={classes.imageButton} to={image.link}>
                                <Typography component='h3' variant='h6' color='inherit' className={classes.imageTitle}>
                                    {image.hoverTitle && isHovered === image.title ? image.hoverTitle : image.title}
                                    <div className={classes.imageMarked}></div>
                                </Typography>
                            </Link>
                        )}
                    </ButtonBase>
                ))}
            </div>
        </Container>
    );
}

export default Solutions;

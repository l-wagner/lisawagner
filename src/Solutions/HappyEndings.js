import React, { useState } from 'react';
import {
    makeStyles,
    ButtonBase,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableSortLabel,
    TableHead,
    TableRow,
    Paper,
    Container,
    Icon,
} from '@material-ui/core';

import { books } from './books';
import { endings } from './endings';

// import logo from './logo.png';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(4),
        maxWidth: '90vw',
    },
    table: {
        maxHeight: '70vh',
    },
}));
function Solutions() {
    const classes = useStyles();
    const [isHovered, setIsHovered] = useState(false);

    const highestRated = books.filter((element) => element.rating > 3);

    return (
        <Container className={classes.root} component='section'>
            <Typography variant='h4' marked='center' align='center' component='h2'>
                How does it all end?
            </Typography>
            <Typography variant='h6' marked='center' align='center' component='h2'>
                Happy ending: <Icon className='icon fa fa-sun'></Icon>
                Realistic ending: <Icon className='icon fa fa-cloud-sun'></Icon>
                Sad ending: <Icon className='icon fa fa-cloud'></Icon>
                Love interest worked out: <Icon className='icon fa fa-heart'></Icon> or not:
                <Icon className='icon fa fa-heart-broken'></Icon> or is unresolved:
                <Icon className='icon fa fa-door-open'></Icon>
            </Typography>
            <TableContainer className={classes.table} component={Paper}>
                <Table stickyHeader className={classes.table} aria-label='simple table'>
                    <TableHead>
                        <TableRow>
                            <TableCell>Book</TableCell>
                            <TableCell>Author</TableCell>
                            <TableCell align='center'>
                                Ending <br /> (Hover to reveal)
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {highestRated.map((book) => (
                            <TableRow key={book.title}>
                                <TableCell>
                                    <a href={book.link} target='_blank'>
                                        {book.title}
                                    </a>
                                </TableCell>
                                <TableCell>
                                    <a href={book.authorLink} target='_blank'>
                                        {book.author}
                                    </a>
                                </TableCell>
                                <TableCell
                                    align='center'
                                    onMouseEnter={() => setIsHovered(book.title)}
                                    onMouseLeave={() => setIsHovered(false)}>
                                    {endings[book.title].overall === 'tba' ? (
                                        'tba'
                                    ) : isHovered === book.title ? (
                                        <span>
                                            <Icon className={`icon fa fa-${endings[book.title].overall}`} />
                                            {endings[book.title].loveInterest && (
                                                <Icon className={`icon fa fa-${endings[book.title].loveInterest}`} />
                                            )}
                                        </span>
                                    ) : (
                                        <Icon className={`icon fa fa-question`} />
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}

export default Solutions;

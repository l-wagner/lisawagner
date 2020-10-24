import React from 'react';
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

// import logo from './logo.png';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(4),
        maxWidth: '90vw',
    },
}));
function Solutions() {
    const classes = useStyles();

    const highestRated = books.filter((element) => element.rating > 3);

    return (
        <Container className={classes.root} component='section'>
            <Typography variant='h4' marked='center' align='center' component='h2'>
                How does it all end?
            </Typography>
            <Typography variant='h6' marked='center' align='center' component='h2'>
                {`${books.length} books read. ${highestRated.length} rated > 3`}
            </Typography>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label='simple table'>
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
                                <TableCell align='center'>
                                    <Icon className={`icon fa fa-question`} />
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

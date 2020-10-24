import React, { useState, useEffect } from 'react';
import { getInventory } from './services/services';
import { makeStyles } from '@material-ui/core';
import { HotTable } from '@handsontable/react';
import Handsontable from 'handsontable';

import 'handsontable/dist/handsontable.full.css';

const useStyles = makeStyles((theme) => ({
    container: {
        height: '100vh',
        width: '100vw',
        margin: '0 auto',
        overflow: 'auto',
    },
    toolbar: {
        margin: theme.spacing(2),
        display: 'flex',
        gap: '2em',
    },
    snackbar: {
        top: '30%',
    },
    alert: {
        padding: '2em',
        fontSize: '1.7em',
        '& .MuiAlert-icon': {
            fontSize: '1.7em',
        },
    },
    textField: { minWidth: 310 },
}));
function HomePage() {
    const classes = useStyles();
    const hotTableComponent = React.createRef();
    const [data, setInventory] = useState({
        data: [],
    });

    const [columns, setColumns] = useState({
        columns: [],
    });

    const handleColumns = (columns) => {
        columns.forEach((element) => {
            if (element.data === 'amountAvailable') {
                element.renderer = zeroAmounRenderer;
            }
        });
        setColumns(columns);
    };

    useEffect(() => {
        setIsLoading(true);
        const handleInventory = async () => {
            getInventory().then((result) => {
                setInventory(result.rows);

                handleColumns(result.columns);
                setIsLoading(false);
                handleSkus(result.rows);
            });
        };
        handleInventory();
    }, []);

    return (
        <div className={classes.container}>
            <HotTable
                ref={hotTableComponent}
                data={filteredInventory}
                search='true'
                colHeaders={columns ? Object.keys(columns).map((el) => columns[el].columnHeader) : ''}
                columns={columns}
                filters='true'
                selectionMode='multiple'
                outsideClickDeselects={false}
                columnSorting={sorting}
                manualColumnResize={true}
                licenseKey='non-commercial-and-evaluation'
                rowHeaders={true}
                stretchH='all'
                minSpareRows='20'
            />
        </div>
    );
}

export default HomePage;

// Apply custom highlighting to amountAvailable. Surprisingly tricky. Had to set existing classes and textCotent manually. Something about handling td pretty much resets it.
const zeroAmounRenderer = function(instance, td, row, col, prop, value, cellProperties) {
    if (value === 0) {
        td.className = 'htRight htNumeric red-highlight';
        td.textContent = 0;
    } else {
        Handsontable.renderers.NumericRenderer.apply(this, arguments);
    }
    return td;
};

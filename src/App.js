import React from 'react';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { amber, blue, blueGrey } from '@material-ui/core/colors/';
import { loadCSS } from 'fg-loadcss';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import logo from './logo.svg';
import './App.css';
import About from './About';
import Header from './Header';
import Solutions from './Solutions';

const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
    },
    palette: {
        primary: {
            logo: '#319ae8',
            light: '#8FC7E8',
            main: '#007CBA',
            dark: '#E0E0E0',
        },
        secondary: {
            light: '#F6C65B',
            main: amber[400],
            dark: blueGrey[600],
        },

        textSecondary: '#e0e0e0',
    },
});

function App() {
    React.useEffect(() => {
        const node = loadCSS('https://use.fontawesome.com/releases/v5.12.0/css/all.css', document.querySelector('#font-awesome-css'));

        return () => {
            node.parentNode.removeChild(node);
        };
    }, []);

    return (
        <MuiThemeProvider theme={theme}>
            <Router>
                <Header path={window.location.pathname} />
                <Route path='/(solutions|)' render={() => <Solutions />} />
                <Route path='/about' render={() => <About />} />
            </Router>
        </MuiThemeProvider>
    );
}

export default App;

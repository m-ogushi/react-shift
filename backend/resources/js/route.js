import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter,
    Route,
    Routes,
} from 'react-router-dom';
import Shift from './pages/Shift';

/*import Menu from './components/Menu/Menu';*/

import {RegistModalProvider} from "./components/providers/RegistModalProvider";
import {ShiftsProvider} from "./components/providers/ShiftsProvider";
import {makeStyles} from "@material-ui/core/styles";

function App() {
    const useStyles = makeStyles({
        main: {
            backgroundColor: "blue",
            width: "69%",
        },
    });

    const classes = useStyles();
    return (
        <div className={classes.main}>
            <RegistModalProvider>
            <ShiftsProvider>
                <Routes>
                    <Route exact path="/shift" element={<Shift/>} />
                </Routes>
            </ShiftsProvider>
            </RegistModalProvider>
        </div>
    );
}

function Menu() {
    const useStyles = makeStyles({
        menu: {
            backgroundColor: "green",
            width: "30%",
        },
    });

    const classes = useStyles();
    return (
        <div className={classes.menu}>
            メニュー
        </div>
    );
}

ReactDOM.render((
    <BrowserRouter>
            <Menu />
            <App />
    </BrowserRouter>
), document.getElementById('app'))

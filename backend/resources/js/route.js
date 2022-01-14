import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter,
    Route,
    Routes,
} from 'react-router-dom';
import Shift from './pages/Shift';

import {RegistModalProvider} from "./components/providers/RegistModalProvider";
import {ShiftsProvider} from "./components/providers/ShiftsProvider";

function App() {
    return (
        <div>
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
    return (
        <div>
            'レジェンド!'
        </div>
    );
}

ReactDOM.render((
    <BrowserRouter>
            <Menu />
            <App />
    </BrowserRouter>
), document.getElementById('app'))

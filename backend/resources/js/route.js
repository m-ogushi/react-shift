import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter,
    Route,
    Routes,
} from 'react-router-dom';
import Example from './pages/Example';
import Home from './pages/Home';
import PostEdit from './pages/PostEdit';
import Color from './pages/Color';

import {RegistModalProvider} from "./components/providers/RegistModalProvider";
import {ShiftsProvider} from "./components/providers/ShiftsProvider";

function App() {
    return (
        <div>
                <Routes>
                    <Route exact path="/example" element={<Example/>}/>
                    <Route exact path="/" element={<Home/>}/>
                    <Route exact path="/post/edit/:id" element={<PostEdit/>} />
                </Routes>
            <RegistModalProvider>
            <ShiftsProvider>
                <Routes>
                    <Route exact path="/color" element={<Color/>} />
                </Routes>
            </ShiftsProvider>
            </RegistModalProvider>
        </div>
    );
}

ReactDOM.render((
    <BrowserRouter>
            <App />
    </BrowserRouter>
), document.getElementById('app'))

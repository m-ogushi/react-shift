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
import Test from './Test';
import {AdminFlagProvider} from "./components/providers/AdminFlagProvider";
import {RegistModalProvider} from "./components/providers/RegistModalProvider";

function App() {
    return (
        <div>
                <Routes>
                    <Route exact path="/example" element={<Example/>}/>
                    <Route exact path="/" element={<Home/>}/>
                    <Route exact path="/post/edit/:id" element={<PostEdit/>} />
                </Routes>
            <RegistModalProvider>
                <Routes>
                    <Route exact path="/color" element={<Color/>} />
                </Routes>
            </RegistModalProvider>
            <AdminFlagProvider>
                <Routes>
                    <Route exact path="/test" element={<Test/>} />
                </Routes>
            </AdminFlagProvider>
        </div>
    );
}

ReactDOM.render((
    <BrowserRouter>
            <App />
    </BrowserRouter>
), document.getElementById('app'))

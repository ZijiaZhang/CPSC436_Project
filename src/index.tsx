import * as React from 'react';
import * as ReactDOM from 'react-dom';
import AppRouter from './AppRouter';
import {BrowserRouter} from "react-router-dom";
ReactDOM.render(
    <BrowserRouter>
        <AppRouter />
    </BrowserRouter>,
document.getElementById('root')
);

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import {ServiceStatus} from "./frontend/service_status/components/App";
ReactDOM.render(
    <BrowserRouter>
        <ServiceStatus />
    </BrowserRouter>,
document.getElementById('root')
);

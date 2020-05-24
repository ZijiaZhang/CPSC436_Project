import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './frontend/components/App';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './frontend/reducers';  //we exported combineReducers

ReactDOM.render(
    <Provider store={createStore(reducers)}>
        <App />
        </Provider>,
document.getElementById('root')
);



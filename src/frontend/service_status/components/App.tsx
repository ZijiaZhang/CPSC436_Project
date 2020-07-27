import * as React from 'react';
import {applyMiddleware, createStore} from "redux";


class ServiceStatus extends React.Component<{}, {}> {
    constructor(props: {}) {
        super(props);
        this.state = {user: undefined};
    }

    render() {
        return (<div></div>)
    }

    componentDidMount(): void {
        this.updateData();
    }

    async updateData(){

    }
}
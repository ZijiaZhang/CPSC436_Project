import * as React from 'react';
import {applyMiddleware, createStore} from "redux";
import {requestAPIJson} from "../../shared/Networks";


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
        let data = await requestAPIJson('/api/v1/status');

    }
}
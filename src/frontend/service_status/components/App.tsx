import * as React from 'react';
import {applyMiddleware, createStore} from "redux";
import {requestAPIJson} from "../../shared/Networks";
import {IStatus} from "../../../shared/ModelInterfaces";
var $ = require('jquery');
require('datatables.net-bs4');
$.DataTable = require('datatables.net');


interface IStatusState {
    statuses: IStatus[]
}

export class ServiceStatus extends React.Component<{}, IStatusState> {
    constructor(props: {}) {
        super(props);
        this.state = {statuses: []};
    }

    render() {
        return (<table className="table table-striped table-bordered">
            <thead>
            <tr><th>Name</th><th>statusCode</th><th>method</th><th>count</th></tr>
            </thead>
            <tbody>
            {this.state.statuses.map((data: IStatus) =><tr key={data.apiName + data.statusCode + data.method}>
                <td>{data.apiName}</td>
                <td>{data.statusCode}</td>
                <td>{data.method}</td>
                <td>{data.count}</td></tr>)}
            </tbody>
        </table>);
    }

    componentDidMount(): void {
        setInterval(async () => {
            let data: IStatus[] = await requestAPIJson('/api/v1/status');
            this.setState({statuses: data});
            $('.table').DataTable();
        }, 1000);
    }

}

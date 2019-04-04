import React, {Component} from 'react';
import {Button, Col, Form, FormGroup, Input, Label} from "reactstrap";
import {Link, Redirect} from 'react-router-dom';


class TestsViewer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true
        };

        this.loadData.bind(this);
        this.loadData();
    }

    loadData() {
        let url = 'http://localhost:9001/tests';

        let fetchData = {
            method: 'GET',
            headers: new Headers()
        };

        fetch(url, fetchData)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then((data) => {
                console.log(data);
                this.setState({loading: false, tests: data.tests});
            });
    }


    render() {
        const {loading} = this.state;
        if (loading) {
            return <div className="text-muted">Loading...</div> ;
        }

        return (
            <div className="container">
                <div className="row row-content">
                    <div className="col-12">
                        <h3 className="pt-3">Tests</h3>
                        <p className="pb-5"><Link to="/tests/add">Add new</Link></p>
                    </div>
                    <div className="col-12 col-md-8 mx-auto text-left">
                        <ul>
                        {
                            this.state.tests.map((val, idx) => {
                                return (
                                    <li key={idx}>{val.level} | <Link to={{pathname:`/tests/edit/${idx}`}}>Edit</Link></li>
                                )
                            })
                        }
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default TestsViewer;
import React, {Component} from 'react';
import {Button, Col, Form, FormGroup, Input, Label} from "reactstrap";
import {Link, Redirect} from 'react-router-dom';


class StudentsViewer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            student: {}
        };

        this.loadData.bind(this);
        this.loadData();
    }

    loadData() {
        let url = 'http://localhost:9001/students/view/0';

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
                this.setState({loading: false, student: data.student});
            });
    }


    render() {
        const {loading} = this.state;
        if (loading) {
            return <div className="text-muted">Loading...</div>;
        }

        return (
            <div className="container">
                <div className="row row-content">
                    <div className="col-12">
                        <h3 className="pt-3">Single student details</h3>
                    </div>
                    <div className="col-12 col-md-8 mx-auto text-left">
                        <p><strong>Id</strong>: {this.state.student.id}</p>
                        <p><strong>First Name</strong>: {this.state.student.firstname}</p>
                        <p><strong>Last Name</strong>: {this.state.student.lastname}</p>
                        <p><strong>Email</strong>: {this.state.student.email}</p>
                        <p><strong>Phone</strong>: {this.state.student.telnum}</p>
                        <p><strong>Level</strong>: {this.state.student.level}</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default StudentsViewer;
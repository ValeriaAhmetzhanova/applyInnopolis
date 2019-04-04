import React, {Component} from 'react';
import {Button, Col, Form, FormGroup, Input, Label} from "reactstrap";
import {Link, Redirect} from 'react-router-dom';


class StudentsViewer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            students: [{name: '', id: ''}]
        };

        this.loadData.bind(this);
        this.loadData();
    }

    loadData() {
        let url = 'http://localhost:9001/students/list';

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
                this.setState({loading: false, students: data.students});
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
                        <h3 className="pt-3">Students</h3>
                    </div>
                    <div className="col-12 col-md-8 mx-auto text-left">
                        <ul>
                            {
                                this.state.students.map((val, idx) => {
                                    return (
                                        <li key={idx}>{val.name} | <Link
                                            to={{pathname: `/students/view/${idx}`}}>View</Link></li>
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

export default StudentsViewer;
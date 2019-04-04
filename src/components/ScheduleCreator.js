import React, {Component} from 'react';
import {Button, Col, Form, FormGroup, Input, Label} from "reactstrap";
import {Redirect} from "react-router-dom";

class ScheduleCreator extends Component {

    constructor(props) {
        super(props);

        this.state = {
            students: [{id: '', name: ''}],
            professors: [{id: '', name: '', timeslots: ['']}],
            student: '',
            professor: '',
            timeslot: '',
            loading_students: true,
            loading_professors: true,
            redirect: false
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.loadData.bind(this);
        this.loadData();
    }

    loadData() {
        let url = 'http://localhost:9001/schedule/free'; // Should be key => value

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
                this.setState({loading_professors: false, professors: data.professors});
            });

        url = 'http://localhost:9001/students/list';

        fetch(url, fetchData)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then((data) => {
                this.setState({loading_students: false, students: data.students});
            });
    }


    handleInputChange(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    handleSubmit(event) {
        event.preventDefault();

        let url = 'http://localhost:9001/schedule/add';

        let fetchData = {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: new Headers()
        };

        fetch(url, fetchData)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then((data) => {
                alert('Schedule is successfully saved');
                this.setState({redirect: true});
            });
    }

    render() {
        const {redirect} = this.state;
        if (redirect) {
            return <Redirect to='/schedule'/>;
        }

        const {loading_students, loading_professors} = this.state;
        if (loading_students || loading_professors) {
            return <div className="text-muted">Loading...</div>;
        }

        return (
            <div className="container">
                <div className="row row-content">
                    <div className="col-12">
                        <h3 className="pt-3 pb-5">Create new schedule</h3>
                    </div>
                    <div className="col-12 col-md-6 mx-auto">
                        <Form onSubmit={this.handleSubmit} onChange={this.handleInputChange}>
                            <FormGroup row>
                                <Col md={3}>
                                    <Label htmlFor="student">Student</Label>
                                </Col>
                                <Col md={9}>
                                    <Input type="select" name="student"
                                           value={this.state.student}
                                           onChange={this.handleInputChange}>
                                        <option disabled value=''>Please, select...</option>
                                        {this.state.students.map(student =>
                                            <option value={student.id}>{student.name}</option>
                                        )};
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={3}>
                                    <Label htmlFor="professor">Professor</Label>
                                </Col>
                                <Col md={9}>
                                    <Input type="select" name="professor"
                                           value={this.state.professor}
                                           onChange={this.handleInputChange}>
                                        <option disabled value=''>Please, select...</option>
                                        {this.state.professors.map(professor =>
                                            <option value={professor.id}>{professor.name}</option>
                                        )};
                                    </Input>
                                </Col>
                            </FormGroup>
                            {typeof this.state.professors[this.state.professor] !== 'undefined' &&
                            <FormGroup row>
                                <Col md={3}>
                                    <Label htmlFor="timeslot">Timeslot</Label>
                                </Col>
                                <Col md={9}>
                                    <Input type="select" name="timeslot"
                                           value={this.state.timeslot}
                                           onChange={this.handleInputChange}>
                                        {this.state.professors[this.state.professor].timeslots.map(timeslot =>
                                            <option value={timeslot}>{timeslot}</option>
                                        )};
                                    </Input>
                                </Col>
                            </FormGroup>
                            }

                            <FormGroup row>
                                <Col md={{size: 12}}>
                                    <Button type="submit" color="primary">
                                        Save
                                    </Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

export default ScheduleCreator;
import React, {Component} from 'react';
import {Button, Col, Form, FormGroup, Input, Label} from "reactstrap";

class ProfessorGrading extends Component {
constructor(props) {
        super(props);

        this.state = {
            students: [{id: '', name: ''}],
            professors: [{id: '', name: ''}],
            timeslots: [{id: '', interval: ''}],
            student: '',
            professor: '',
            timeslot: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleInputChange(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    handleSubmit(event) {
        console.log('Current State is: ' + JSON.stringify(this.state));
        alert('Current State is: ' + JSON.stringify(this.state));
        event.preventDefault();
    }

    render() {

        return (
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
                                    {this.state.professors.map(professor =>
                                        <option value={professor.id}>{professor.name}</option>
                                    )};
                                </Input>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md={3}>
                                <Label htmlFor="timeslot">Timeslot</Label>
                            </Col>
                            <Col md={9}>
                                <Input type="select" name="timeslot"
                                       value={this.state.timeslot}
                                       onChange={this.handleInputChange}>
                                    {this.state.timeslots.map(timeslot =>
                                        <option value={timeslot.id}>{timeslot.interval}</option>
                                    )};
                                </Input>
                            </Col>
                        </FormGroup>
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
        );
    }
}

class ScheduleCreator extends Component {

    constructor(props) {
        super(props);

        this.state = {
            candidate: [{id: '', name: ''}],
            professors: [{id: '', name: ''}],
            timeslots: [{id: '', interval: ''}],
            student: '',
            professor: '',
            timeslot: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleInputChange(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    handleSubmit(event) {
        console.log('Current State is: ' + JSON.stringify(this.state));
        alert('Current State is: ' + JSON.stringify(this.state));
        event.preventDefault();
    }

    render() {

        return (
            <div class="row row-content"><div class="col-12"><h3 class="pt-3 pb-5">List of candidate</h3></div><div class="col-12 col-md-6 mx-auto"><form class=""><div class="row form-group"><div class="col-md-3"><label for="student" class="">Candidate 1</label></div><div class="col-md-9"><select name="student" class="form-control"><option value=""></option>
<option>A</option>
<option>B</option>
<option>C</option>
<option>D</option>
;</select></div></div><div class="row form-group"><div class="col-md-3"><label for="professor" class="">Candidate 2</label></div><div class="col-md-9"><select name="professor" class="form-control"><option value=""></option>
<option>A</option>
<option>B</option>
<option>C</option>
<option>D</option>
;</select></div></div><div class="row form-group"><div class="col-md-3"><label for="timeslot" class="">Candidate 3</label></div><div class="col-md-9"><select name="timeslot" class="form-control"><option value=""></option>
<option>A</option>
<option>B</option>
<option>C</option>
<option>D</option>;</select></div></div><div class="row form-group"><div class="col-md-12"><button type="submit" class="btn btn-primary">Save</button></div></div></form></div></div>
        );
    }
}

export default ScheduleCreator;

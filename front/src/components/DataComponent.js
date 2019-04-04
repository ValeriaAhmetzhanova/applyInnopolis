import React, { Component } from 'react';
import {Button, Col, Form, FormGroup, Input, Label} from "reactstrap";

class Data extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dateOfBirth: '',
            gender: '',
            learned: '',
            country: '',
            city: '',
            citizenship: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
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
                    <h3>User Data</h3>
                </div>
                <div className="col-12 col-md-9">
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup row>
                            <Label htmlFor="dateOfBirth" md={2}> Date of birth</Label>
                            <Col md={10}>
                                <Input type="text" id="dateOfBirth" name="dateOfBirth"
                                       placeholder={this.state.dateOfBirth}
                                       value={this.state.dateOfBirth}
                                       onChange={this.handleInputChange} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label htmlFor="gender" md={2}>Gender</Label>
                            <Col md={{size: 3, offset: 1}}>
                                <Input type="select" name="gender"
                                       placeholder={this.state.gender}
                                       value={this.state.gender}
                                       onChange={this.handleInputChange}>
                                    <option>Male</option>
                                    <option>Female</option>
                                </Input>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label htmlFor="learned" md={2}>Learned from</Label>
                            <Col md={10}>
                                <Input type="text" id="learned" name="learned"
                                       placeholder={this.state.learned}
                                       value={this.state.learned}
                                       onChange={this.handleInputChange} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label htmlFor="country" md={2}> Country</Label>
                            <Col md={10}>
                                <Input type="text" id="country" name="country"
                                       placeholder={this.state.country}
                                       value={this.state.country}
                                       onChange={this.handleInputChange} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label htmlFor="city" md={2}> City</Label>
                            <Col md={10}>
                                <Input type="text" id="city" name="city"
                                       placeholder={this.state.city}
                                       value={this.state.city}
                                       onChange={this.handleInputChange} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label htmlFor="citizenship" md={2}> Citizenship</Label>
                            <Col md={10}>
                                <Input type="text" id="citizenship" name="citizenship"
                                       placeholder={this.state.citizenship}
                                       value={this.state.citizenship}
                                       onChange={this.handleInputChange} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md={{size: 10, offset: 2}}>
                                <Button type="submit" color="primary">
                                    Submit
                                </Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </div>
            </div>
        );
    }
}

export default Data;
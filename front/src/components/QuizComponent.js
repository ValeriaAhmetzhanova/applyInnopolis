import React, { Component } from 'react';
import { TEST } from "../shared/questions";
import {Button, Col, Form, FormGroup, Input, Label} from "reactstrap";

class Quiz extends Component {

    constructor(props){
        super(props);

        this.state = {
            questions: TEST
        };

        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleSubmit(event) {
        console.log('Current State is: ' + JSON.stringify(this.state));
        alert('Current State is: ' + JSON.stringify(this.state));
        event.preventDefault();
    }

    render() {
        const test = this.state.questions.map((question) => {

            const options = question.answers.map((answer) => {
                console.log(answer.answer);
                return(
                    <option>{answer.answer}</option>
                );
            });

            return(
                <div key={question.id}>
                    <FormGroup row>
                        <Label htmlFor="question" md={2}>{question.question}</Label>
                        <Col md={{size: 3, offset: 1}}>
                            <Input type="select" name="answer">
                                {options}
                            </Input>
                        </Col>
                    </FormGroup>
                </div>
            );
        });

        return (
            <div>
                <Form>
                    <div>
                        {test}
                    </div>
                    <FormGroup row>
                        <Col md={{size: 10, offset: 2}}>
                            <Button type="submit" color="primary">
                                Submit
                            </Button>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        );
    }

}

export default Quiz;
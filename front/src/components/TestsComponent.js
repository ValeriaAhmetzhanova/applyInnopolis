import React, {Component} from 'react';
import {Button, Col, Form, FormGroup, Input, Label} from "reactstrap";

class TestsCreator extends Component {

    constructor(props) {
        super(props);

        this.state = {
            level: '',
            questions: [{question: '', answer1: '', answer2: '', answer3: '', answer4: ''}]
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addQuestion = this.addQuestion.bind(this);
    }

    addQuestion(event) {
        this.setState((prevState) => ({
            questions: [...prevState.questions, {question: '', answer1: '', answer2: '', answer3: '', answer4: ''}],
        }));
    }

    handleInputChange(event) {
        if (["question", "answer1", "answer2", "answer3", "answer4"].includes(event.target.dataset.type)) {
            let questions = [...this.state.questions];
            questions[event.target.dataset.id][event.target.dataset.type] = event.target.value;
            this.setState({questions})
        } else {
            this.setState({[event.target.name]: event.target.value})
        }
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
                    <h3 className="pt-3 pb-5">Tests creation</h3>
                </div>
                <div className="col-12 col-md-8 mx-auto">
                    <Form onSubmit={this.handleSubmit} onChange={this.handleInputChange}>
                        <FormGroup row>
                            <Label htmlFor="level" md={2}>Level</Label>
                            <Col md={10}>
                                <Input type="select" name="level"
                                       value={this.state.level}
                                       onChange={this.handleInputChange}>
                                    <option>Bachelor</option>
                                    <option>Masters</option>
                                </Input>
                            </Col>
                        </FormGroup>
                        <FormGroup row className="text-center">
                            <Col md={3}>
                                <Button color="info" onClick={this.addQuestion}>Add new question</Button>
                            </Col>
                            <Col md={9}>
                                <p className="text-muted">Students will see answers in random order. You can leave some
                                    answers empty.</p>
                            </Col>
                        </FormGroup>

                        {
                            this.state.questions.map((val, idx) => {
                                let questionId = `question-${idx}`,
                                    answer1Id = `answer1-${idx}`,
                                    answer2Id = `answer2-${idx}`,
                                    answer3Id = `answer3-${idx}`,
                                    answer4Id = `answer4-${idx}`
                                return (
                                    <div className="border border-success pt-3 pb-1 pl-4 pr-4 mb-4" key={idx}>
                                        <FormGroup>
                                            <div className="row">
                                                <Col md={4}>
                                                    <Label htmlFor={questionId}>{`Question #${idx + 1}`}</Label>
                                                </Col>
                                                <Col md={8}>
                                                    <Input type="text" name={questionId} data-id={idx} id={questionId}
                                                           data-type="question"/>
                                                </Col>
                                            </div>
                                        </FormGroup>
                                        <FormGroup>
                                            <div className="row">
                                                <Col md={4}>
                                                    <Label htmlFor={answer1Id}>{`Correct answer`}</Label>
                                                </Col>
                                                <Col md={8}>
                                                    <Input type="text" name={answer1Id} data-id={idx} id={answer1Id}
                                                           data-type="answer1"/>
                                                </Col>
                                            </div>
                                        </FormGroup>
                                        <FormGroup>
                                            <div className="row">
                                                <Col md={4}>
                                                    <Label htmlFor={answer2Id}>{`Answer`}</Label>
                                                </Col>
                                                <Col md={8}>
                                                    <Input type="text" name={answer2Id} data-id={idx} id={answer2Id}
                                                           data-type="answer2"/>
                                                </Col>
                                            </div>
                                        </FormGroup>
                                        <FormGroup>
                                            <div className="row">
                                                <Col md={4}>
                                                    <Label htmlFor={answer3Id}>{`Answer`}</Label>
                                                </Col>
                                                <Col md={8}>
                                                    <Input type="text" name={answer3Id} data-id={idx} id={answer3Id}
                                                           data-type="answer3"/>
                                                </Col>
                                            </div>
                                        </FormGroup>
                                        <FormGroup>
                                            <div className="row">
                                                <Col md={4}>
                                                    <Label htmlFor={answer4Id}>{`Answer`}</Label>
                                                </Col>
                                                <Col md={8}>
                                                    <Input type="text" name={answer4Id} data-id={idx} id={answer4Id}
                                                           data-type="answer4"/>
                                                </Col>
                                            </div>
                                        </FormGroup>
                                    </div>
                                )
                            })
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
        );
    }
}

export default TestsCreator;
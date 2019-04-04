import React, {Component} from 'react';
import {Button, Col, Form, FormGroup, Input, Label} from "reactstrap";
import {Redirect} from 'react-router-dom';
import {withRouter} from 'react-router-dom';


class TestsCreator extends Component {

    constructor(props) {
        super(props);

        this.state = {
            level: 'Bachelor',
            questions: [{question: '', answers: [{answer: "", is_correct: false}]}],
            redirect: false
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addQuestion = this.addQuestion.bind(this);
        this.addAnswer = this.addAnswer.bind(this);

        if (window.location.pathname.indexOf('edit') !== -1) {
            this.state.loading = true;
            this.loadData.bind(this);
            this.loadData();
        }
    }

    loadData() {
        let url = 'http://localhost:9001/tests/edit/0';

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
                this.setState({loading: false, questions: data.questions, level: data.level});
            });
    }

    addQuestion(event) {
        this.setState((prevState) => ({
            questions: [...prevState.questions, {question: '', answers: [{answer: "", is_correct: false}]}],
        }));
    }

    addAnswer(idx, event) {
        let questions = [...this.state.questions];
        questions[idx].answers.push({answer: "", is_correct: false});
        this.setState({questions});
    }

    handleInputChange(event) {

        if (["question"].includes(event.target.dataset.type)) {
            let questions = [...this.state.questions];
            questions[event.target.dataset.id].question = event.target.value;
            this.setState({questions});
        } else if (["answer"].includes(event.target.dataset.type)) {
            let questions = [...this.state.questions];
            questions[event.target.dataset.question].answers[event.target.dataset.id].answer = event.target.value;
            this.setState({questions});
        } else if (["answer_correct"].includes(event.target.dataset.type)) {
            let questions = [...this.state.questions];
            questions[event.target.dataset.question].answers[event.target.dataset.id].is_correct = event.target.checked;
            this.setState({questions});
        } else {
            this.setState({[event.target.name]: event.target.value})
        }
    }

    handleSubmit(event) {
        event.preventDefault();

        let url;
        if (window.location.pathname.indexOf('edit') !== -1) {
            url = 'http://localhost:9001/tests/edit/0';
        } else {
            url = 'http://localhost:9001/tests/add';
        }

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
                alert('Test is successfully saved');
                this.setState({redirect: true});
            });
    };


    render() {
        const {redirect} = this.state;
        if (redirect) {
            return <Redirect to='/tests'/>;
        }

        const {loading} = this.state;
        if (loading) {
            return <div className="text-muted">Loading...</div> ;
        }

        return (
            <div className="container">
                <div className="row row-content">
                    <div className="col-12">
                        <h3 className="pt-3 pb-5">Tests</h3>
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
                                    <p className="text-muted">Students will see answers in random order. You can leave
                                        some
                                        answers empty.</p>
                                </Col>
                            </FormGroup>

                            {
                                this.state.questions.map((val, idx) => {
                                    let questionId = `question-${idx}`;
                                    return (
                                        <div className="border border-success pt-3 pb-1 pl-4 pr-4 mb-4" key={idx}>
                                            <FormGroup>
                                                <div className="row">
                                                    <Col md={4}>
                                                        <Label htmlFor={questionId}>{`Question #${idx + 1}`}</Label>
                                                    </Col>
                                                    <Col md={8}>
                                                        <Input type="text" name={questionId} data-id={idx}
                                                               id={questionId}
                                                               data-type="question" value={val.question}/>
                                                    </Col>
                                                </div>
                                            </FormGroup>
                                            {val.answers.map((answer, answer_id) => {
                                                return (
                                                    <FormGroup>
                                                        <div className="row">
                                                            <Col md={4}>
                                                                <Label>{`Answer`}</Label>
                                                            </Col>
                                                            <Col md={6}>
                                                                <Input type="text" value={answer.answer}
                                                                       data-type="answer" data-question={idx}
                                                                       data-id={answer_id}/>
                                                            </Col>
                                                            <Col md={2}>
                                                                <Input type="checkbox" value="1"
                                                                       checked={answer.is_correct}
                                                                       data-type="answer_correct" data-question={idx}
                                                                       data-id={answer_id}/>
                                                                Is correct?
                                                            </Col>
                                                        </div>
                                                    </FormGroup>
                                                )
                                            })
                                            }
                                            <Button color="info" onClick={this.addAnswer.bind(null, idx)}>Add new
                                                answer</Button>
                                            <FormGroup/>
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
            </div>
        );
    }
}

export default TestsCreator;
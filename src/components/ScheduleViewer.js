import React, {Component} from 'react';
import {Button, Col, Form, FormGroup, Input, Label} from "reactstrap";
import {Link, Redirect} from 'react-router-dom';
import BigCalendar from 'react-big-calendar'
import Views from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'


class ScheduleViewer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            professors: [{name: '', id: '', timeslots: [{name: '', student: {name: '', id: ''}}]}]
        };

        this.loadData.bind(this);
        this.loadData();

    }

    loadData() {
        let url = 'http://localhost:9001/schedule';

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
                this.setState({loading: false, professors: data.professors});
            });
    }


    render() {
        const {loading} = this.state;
        if (loading) {
            return <div className="text-muted">Loading...</div>;
        }

        let events = [];
        let i = 0;
        this.state.professors.map(function (professor, idx) {
            professor.timeslots.map(function (timeslot, timeslot_idx) {
                let start = new Date(timeslot.name);
                let end = new Date(timeslot.name);
                end.setMinutes(end.getMinutes() + 30);

                events.push({
                    id: i,
                    start: start,
                    end: end,
                    resourceId: professor.id,
                    title: timeslot.student.name,
                    movable: false,
                    resizable: false
                });

                i++;
            });
        });

        return (
            <div className="container">
                <div className="row row-content">
                    <div className="col-12">
                        <h3 className="pt-3">Schedule</h3>
                        <p className="pb-5"><Link to="/schedule/add">Add new</Link></p>
                    </div>
                    <div className="col-12 col-md-8 mx-auto text-left">
                        {
                            this.state.professors.map((val, idx) => {
                                return (
                                    <div>
                                        <h4 className="pt-3 pb-5">{val.name} Schedule</h4>
                                        <ul>
                                            {
                                                val.timeslots.map((timeslot, idx) => {
                                                    return (
                                                        <li>{timeslot.name} (Student: {timeslot.student.name})</li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </div>
                                )
                            })
                        }

                        {/*<BigCalendar localizer={localizer}*/}
                                     {/*events={events}*/}
                                     {/*resources={resourceMap}*/}
                        {/*/>*/}
                    </div>
                </div>
            </div>
        );
    }
}

export default ScheduleViewer;
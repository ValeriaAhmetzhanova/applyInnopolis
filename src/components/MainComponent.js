import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Registration from "./RegistrationComponent";
import Portfolio from "./PortfolioComponent";
import TestsCreator from "./TestsComponent";
import TestsViewer from "./TestsViewer";
import ScheduleCreator from "./ScheduleCreator";
import ScheduleViewer from "./ScheduleViewer";
import StudentsViewer from "./StudentsViewer";
import StudentsDetailViewer from "./StudentsDetailViewer";
import Header from "./HeaderComponent";

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {

        const HomePage = () => {
            return(
                <div>
                    <h1>
                        Home page
                    </h1>
                </div>
            );
        };

        return (
            <div>
                <Header/>
                <Switch>
                    <Route path='/home' component={HomePage} />
                    <Route exact path='/signup' component={() => <Registration />} />
                    <Route exact path='/portfolio' component={() => <Portfolio />}/>

                    <Route exact path='/students' component={() => <StudentsViewer />} />
                    <Route path='/students/view' component={() => <StudentsDetailViewer />} />

                    <Route exact path='/tests' component={() => <TestsViewer />} />
                    <Route exact path='/tests/add' component={() => <TestsCreator />} />
                    <Route path='/tests/edit' component={() => <TestsCreator />} />

                    <Route exact path='/schedule' component={() => <ScheduleViewer />} />
                    <Route exact path='/schedule/add' component={() => <ScheduleCreator />} />
                    <Redirect to="/home" />
                </Switch>
            </div>
        );
    }
}

export default Main;
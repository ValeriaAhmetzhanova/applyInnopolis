import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Registration from "./RegistrationComponent";
import Portfolio from "./PortfolioComponent";
import TestsCreator from "./TestsComponent";
import ScheduleCreator from "./ScheduleComponent";

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
                <Switch>
                    <Route path='/home' component={HomePage} />
                    <Route exact path='/signup' component={() => <Registration />} />
                    <Route exact path='/portfolio' component={() => <Portfolio />} />
                    <Route exact path='/tests/add' component={() => <TestsCreator />} />
                    <Route exact path='/schedule/add' component={() => <ScheduleCreator />} />
                    <Redirect to="/home" />
                </Switch>
            </div>
        );
    }
}

export default Main;
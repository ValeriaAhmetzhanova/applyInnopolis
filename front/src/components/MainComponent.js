import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Registration from "./RegistrationComponent";
import Portfolio from "./PortfolioComponent";
import Header from "./HeaderComponent";
import Data from "./DataComponent";
import Quiz from "./QuizComponent";

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
                    <Route exact path='/portfolio' component={() => <Portfolio />} />
                    <Route exact path='/data' component={() => <Data />} />
                    <Route exact path='/quiz' component={() => <Quiz />} />
                    <Redirect to="/home" />
                </Switch>
            </div>
        );
    }
}

export default Main;
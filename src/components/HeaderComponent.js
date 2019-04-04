import React, { Component } from 'react';
import {
    Nav, Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem, Button, Modal, ModalHeader,
    ModalBody, Form, FormGroup, Label, Input
} from 'reactstrap';
import { NavLink } from 'react-router-dom';

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isNavOpen: false
        };
        this.toggleNav = this.toggleNav.bind(this);
    }

    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }

    render() {
        return(
            <React.Fragment>
                <Navbar light expand="md">
                    <div className="container">
                        <NavbarToggler onClick={this.toggleNav} />
                        <NavbarBrand className="mr-auto brand" href="/">Apply Innopolis</NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar>
                                <NavItem>
                                    <NavLink className="nav-link ml-lg-5"  to='/home'> Home</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link ml-lg-5"  to='/students'> Students</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link ml-lg-5"  to='/schedule'> Schedule</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link ml-lg-5"  to='/tests'> Tests</NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>
            </React.Fragment>
        );
    }
}

export default Header;
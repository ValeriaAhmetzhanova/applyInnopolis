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
            username: '',
            password: '',
            isNavOpen: false,
            isModalOpen: false
        };
        this.toggleNav = this.toggleNav.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleLogin(event) {
        this.toggleModal();
        alert("Username: " + this.username.value + " Password: " + this.password.value);
        event.preventDefault();
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
                                    <NavLink className="nav-link ml-lg-5"  to='/portfolio'> Portfolio</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link ml-lg-5"  to='/data'> Data</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link ml-lg-5"  to='/quiz'> Quiz</NavLink>
                                </NavItem>
                            </Nav>
                            <div className="ml-auto">
                                <Button outline
                                        color={"success"}
                                        type="submit"
                                        size={"lg"}
                                        onClick={this.toggleModal}>
                                    Sign in
                                </Button>
                            </div>
                        </Collapse>
                    </div>
                </Navbar>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Sign in</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleLogin}>
                            <FormGroup>
                                <Label htmlFor="username">Username</Label>
                                <Input type="text" id="username" name="username"
                                       innerRef={(input) => this.username = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" name="password"
                                       innerRef={(input) => this.password = input}  />
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary">Sign in</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }
}

export default Header;
import React, { useState, Component, Fragment } from 'react'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText
} from 'reactstrap'
import RegisterModal from './auth/RegisterModal'
import LoginModal from './auth/LoginModal'
import Logout from './auth/Logout'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import PostList from './posts/PostList'

class IndexNavbar extends Component {
    state = {
        isOpen: false
    }

    static propTypes = {
        auth: PropTypes.object.isRequired
    }

    render() {
        const { user, isAuthenticated } = this.props.auth

        const authLinks = (
            <Fragment>
                <Router>
                    <NavItem>
                        <span className="navbar-text">{user ? `Welcome ${user.username}` : null}</span>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            // href="/:id"
                            href={user ? '/' + user._id : null}
                        >
                            Profile
                    </NavLink>
                    </NavItem>
                    <NavItem>
                        <Logout />
                    </NavItem>
                </Router>
            </Fragment>
        )

        const guestLinks = (
            <Fragment>
                <NavItem>
                    <LoginModal />
                </NavItem>
                <NavItem>
                    <RegisterModal />
                </NavItem>
            </Fragment>
        )


        return (
            <div>
                <Navbar color="light" light expand="md">
                    <NavbarBrand href="/">Mern-pool</NavbarBrand>
                    <Nav className="mr-auto" navbar>
                        {isAuthenticated ? authLinks : guestLinks}
                    </Nav>
                </Navbar>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, null)(IndexNavbar)

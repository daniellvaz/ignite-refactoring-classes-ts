import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBIcon } from "mdbreact";

class NavBar extends Component {
    state = {
        isOpen: false,
        isNotificationOpen: false
    };
    toggleCollapse = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }
    changePullNotification = () => {
        this.setState({
            isNotificationOpen: !this.state.isNotificationOpen
        })
    }

    render() {
        var session = JSON.parse(localStorage.getItem('user'))?.value;
        const { logo } = this.props;
        let logoText = null;

        if (logo !== undefined) {
            logoText = (
                <a href="https://superfestval.com.br" className="simple-text logo-normal">
                    <img src={logo.imgSrc} alt="react-logo" />
                    <div className="divider"></div>
                </a>
            );
        }

        return (
            <div>
                <MDBNavbar color="default-color" dark expand="md">
                    <MDBNavbarBrand className="dashboard-brand">
                        <strong className="white-text">{logoText}</strong>
                    </MDBNavbarBrand>
                    <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
                        <div className="divider"></div>
                        <MDBNavbarNav left>
                            <MDBNavItem active>
                                <MDBNavLink id="goToCalculadoraImc" to='calculadora-imc' onClick={this.toggleCollapse}><MDBIcon icon="calculator" />&nbsp;</MDBNavLink>
                            </MDBNavItem>
                        </MDBNavbarNav>
                    </MDBCollapse>
                </MDBNavbar>
            </div>
        );
    }
}

NavBar.defaultProps = {
    rtlActive: false,
    bgColor: "primary",
    routes: [{}]
};

NavBar.propTypes = {
    rtlActive: PropTypes.bool,
    bgColor: PropTypes.oneOf(["primary", "blue", "green"]),
    routes: PropTypes.arrayOf(PropTypes.object),
    logo: PropTypes.shape({
        innerLink: PropTypes.string,
        outterLink: PropTypes.string,
        text: PropTypes.node,
        imgSrc: PropTypes.string
    })
};

export default NavBar;

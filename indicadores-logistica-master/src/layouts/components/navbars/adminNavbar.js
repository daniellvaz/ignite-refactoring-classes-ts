import React from "react";
import classNames from "classnames";
import { NavbarBrand, Navbar, Container } from "reactstrap";
import './adminNavbar.css';

class AdminNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapseOpen: false,
      modalSearch: false,
      color: "navbar-transparent"
    };
  }
  componentDidMount() {
    window.addEventListener("resize", this.updateColor);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateColor);
  }

  render() {
    return (
      <div className="header-nav">
        <Navbar className={classNames("navbar-absolute", this.state.color)} expand="lg">
          <Container fluid>
            <div className="navbar-wrapper">
              <NavbarBrand href="#pablo" onClick={e => e.preventDefault()}>
                {this.props.brandText}
              </NavbarBrand>
            </div>
          </Container>
        </Navbar>
      </div>
    );
  }
}

export default AdminNavbar;

/*eslint-disable*/
import React from "react";
import { Container, Nav, NavItem, NavLink } from "reactstrap";

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        <Container fluid>
          <div className="copyright">
            {new Date().getFullYear()} © Festval. Todos os direitos reservados.
          </div>
        </Container>
      </footer>
    );
  }
}

export default Footer;

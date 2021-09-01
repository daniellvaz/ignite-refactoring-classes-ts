/*eslint-disable*/
import React from "react";
import { Container } from "reactstrap";

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        <Container fluid>
          <div className="copyright">
            <b>{new Date().getFullYear()} © Festval. Todos os direitos reservados.</b>
          </div>
        </Container>
      </footer>
    );
  }
}

export default Footer;

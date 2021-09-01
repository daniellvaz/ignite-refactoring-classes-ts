import React from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import Sidebar from "./components/sidebar";
import Header from "./components/header";
import HeaderMobile from "./components/header-mobile";
import Footer from "./components/footer";
import CadastroInformativo from "./pages/cadastro-informativo";
import CadastroEncarte from "./pages/cadastro-encarte";
import Informativos from "./pages/informativos";
import Encartes from "./pages/encartes";
import Casadinhas from "./pages/casadinhas";
import Notificacoes from "./pages/notificacoes";
import { Routes } from "./routes";

function App() {
  return (
    <div className="App">
      <Container fluid>
        <Row>
          <Col id="col-nav-desk" className="m0 d-none d-sm-block" xl="auto">
            <Sidebar />
          </Col>
          <Col id="col-main-desk" className="m260 d-none d-sm-block">
            <Header />
            <Routes />
            <Footer />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;

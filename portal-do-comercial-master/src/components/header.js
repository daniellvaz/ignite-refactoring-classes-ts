import React from 'react';
import './header.css';
import { Container, Row, Col, Navbar, NavDropdown, Form } from 'react-bootstrap';

function Header() {
    const openMenu = () => {
        let nav = document.getElementById("col-nav-desk");
        nav.classList.remove("m-260");
        nav.classList.add("m0");
        let main = document.getElementById("col-main-desk");
        main.classList.remove("m0");
        main.classList.add("m260");
        let open = document.getElementById("open-menu-desk");
        open.classList.add("d-none");
        let close = document.getElementById("close-menu-desk");
        close.classList.remove("d-none");
    }
    const closeMenu = () => {
        let nav = document.getElementById("col-nav-desk");
        nav.classList.remove("m0");
        nav.classList.add("m-260");
        let main = document.getElementById("col-main-desk");
        main.classList.remove("m260");
        main.classList.add("m0");
        let close = document.getElementById("close-menu-desk");
        close.classList.add("d-none");
        let open = document.getElementById("open-menu-desk");
        open.classList.remove("d-none");
    }
    return (
        <Container fluid className="bg-white sombra">
            <Navbar>
                <a id="close-menu-desk" className="sidebar-toggle" onClick={() => { closeMenu() }}>
                    <i className="hamburger align-self-center"></i>
                </a>
                <a id="open-menu-desk" className="sidebar-toggle d-none" onClick={() => { openMenu() }} >
                    <i className="hamburger align-self-center"></i>
                </a>
                {/* <img className="d-block d-sm-none" src="http://192.168.1.217/Assets/img/logo_geral_200x50.png" /> */}
                <Col>
                    <ul className="d-flex justify-content-end">
                        <li>
                            <a>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-bell align-middle"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
                                </div>
                            </a>
                        </li>
                        <li>
                            <NavDropdown title="nome.usuario" id="user-menu-desk" className="nome-usuario">
                                <NavDropdown.Item href="#">Conta</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Sair</NavDropdown.Item>
                            </NavDropdown>
                        </li>
                    </ul>
                </Col>
            </Navbar>
        </Container>
    )
}

export default Header;

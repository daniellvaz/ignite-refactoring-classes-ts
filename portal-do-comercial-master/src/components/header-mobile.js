import React from 'react';
import './header.css';
import { Container, Row, Col, Navbar, NavDropdown, Form } from 'react-bootstrap';

function HeaderMobile() {
    const openMenu = () => {
        let nav = document.getElementById("col-nav-mobile");
        nav.classList.remove("m-260");
        nav.classList.add("m0");
        let main = document.getElementById("col-main-mobile");
        main.classList.remove("m0");
        main.classList.add("m260");
        let open = document.getElementById("open-menu-mobile");
        open.classList.add("d-none");
        let close = document.getElementById("close-menu-mobile");
        close.classList.remove("d-none");
    }
    const closeMenu = () => {
        let nav = document.getElementById("col-nav-mobile");
        nav.classList.remove("m0");
        nav.classList.add("m-260");
        let main = document.getElementById("col-main-mobile");
        main.classList.remove("m260");
        main.classList.add("m0");
        let close = document.getElementById("close-menu-mobile");
        close.classList.add("d-none");
        let open = document.getElementById("open-menu-mobile");
        open.classList.remove("d-none");
    }
    return (
        <Container fluid className="bg-white sombra">
            <Navbar>
                <a id="open-menu-mobile" className="sidebar-toggle" onClick={() => { openMenu() }}>
                    <i className="hamburger align-self-center"></i>
                </a>
                <a id="close-menu-mobile" className="sidebar-toggle d-none" onClick={() => { closeMenu() }}>
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
                        <li className="d-block d-sm-none dropdown-icon">
                            <a>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-settings align-middle mr-0"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                                </div>
                            </a>
                            <div className="dropdown-links dropdown-links-active rounded">
                                <p href="#">Link 1</p>
                                <p href="#">Link 2</p>
                                <p href="#">Link 3</p>
                            </div>
                        </li>
                    </ul>
                </Col>
            </Navbar>
        </Container>
    )
}

export default HeaderMobile;

import React from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";
import { Button } from "react-bootstrap";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="logo">
        <Link href="/">
          <img src="http://192.168.1.217/Assets/img/logo_geral_200x50.png" />
        </Link>
      </div>
      <div className="nome-aplicacao">
        <small>Portal do Comercial</small>
      </div>
      <div className="menus">
        <ul className="sidebar-nav">
          <li className="sidebar-header">Páginas</li>
          <li className="sidebar-item">
            <Link to="/" className="sidebar-link">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-grid align-middle"
              >
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
              <span className="align-middle">Dashboard</span>
            </Link>
            <ul
              id="informativos"
              className="sidebar-dropdown list-unstyled"
              data-parent="#sidebar"
            >
              {/* <li className="sidebar-item">
                                <Link to="#" className="sidebar-link">Opção 1</a>
                            </li> */}
            </ul>
          </li>
          <li className="sidebar-item">
            <Link to="/informativos" className="sidebar-link">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-alert-triangle align-middle mr-2"
              >
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                <line x1="12" y1="9" x2="12" y2="13"></line>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
              <span className="align-middle">Informativos</span>
            </Link>
            <ul
              id="informativos"
              className="sidebar-dropdown list-unstyled"
              data-parent="#sidebar"
            >
              {/* <li className="sidebar-item">
                                <Link to="#" className="sidebar-link">Opção 1</a>
                            </li> */}
            </ul>
          </li>
          <li className="sidebar-item">
            <Link to="/encartes" className="sidebar-link">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-book-open align-middle mr-2"
              >
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
              </svg>
              <span className="align-middle">Encartes</span>
            </Link>
            <ul
              id="encartes"
              className="sidebar-dropdown list-unstyled"
              data-parent="#sidebar"
            ></ul>
          </li>
          <li className="sidebar-item">
            <Link to="/casadinhas" className="sidebar-link">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-calendar align-middle"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              <span className="align-middle">Casadinhas</span>
            </Link>
            <ul
              id="casadinhas"
              className="sidebar-dropdown list-unstyled"
              data-parent="#sidebar"
            ></ul>
          </li>
          <li className="sidebar-item">
            <Link to="/notificacoes" className="sidebar-link">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-bell align-middle"
              >
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
              <span className="align-middle">Notificações</span>
            </Link>
            <ul
              id="notificacoes"
              className="sidebar-dropdown list-unstyled"
              data-parent="#sidebar"
            ></ul>
          </li>
        </ul>
      </div>
      <div className="botoes-cadastrar p-3 d-flex adivgn-items-start flex-column">
        <a
          href="/cad-informativo"
          type="button"
          className="btn btn-primary btn-sm mt-3"
        >
          Cadastrar Informativo
        </a>
        <a
          href="/cad-encarte"
          type="button"
          className="btn btn-primary btn-sm mt-3"
        >
          Cadastrar Encarte
        </a>
      </div>
    </div>
  );
}

export default Sidebar;

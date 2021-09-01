/*eslint-disable*/
import React from "react";
import { NavLink, Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import PerfectScrollbar from "perfect-scrollbar";
import { Nav, NavLink as ReactstrapNavLink } from "reactstrap";
import './sidebar.css';

var ps;
class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.activeRoute.bind(this);
  }
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.refs.sidebar, {
        suppressScrollX: true,
        suppressScrollY: false
      });
    }
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
    }
  }
  linkOnClick = () => {
    document.documentElement.classList.remove("nav-open");
  };

  clickNavItem = () => {
    let fixedMenuPlugin = document.getElementById("fixedMenuPlugin");
    if (typeof fixedMenuPlugin != undefined && fixedMenuPlugin != null)
      fixedMenuPlugin.click();
  }

  render() {
    const { bgColor, routes, logo } = this.props;
    let logoText = null;
    if (logo !== undefined) {
      logoText = (
        <a className="simple-text logo-normal" onClick={this.props.toggleSidebar}>
          <img src={logo.imgSrc} alt="react-logo" />
        </a>
      );
    }
    return (
      <div id="wrapper" className="sidebar sidebar-background-overwrite toggled" data={bgColor}>

        <div className="sidebar-wrapper" ref="sidebar">

          <h3 className="logo text-center">{logoText}</h3>

          <Nav id="wrapper-nav">
            {routes.map((prop, key) => {
              if (prop.redirect) return null;
              return (
                <li className={this.activeRoute(prop.path) + (prop.pro ? " active-pro" : "")} key={key} onClick={this.clickNavItem()}>
                  <NavLink to={prop.layout + prop.path} className="nav-link" activeClassName="active" onClick={this.props.toggleSidebar}>
                    <strong className="font-size">{prop.name}</strong>
                    <i className={prop.icon + " icon-size"} />
                  </NavLink>
                </li>
              );
            })}
          </Nav>

        </div>

      </div>
    );
  }
}

Sidebar.defaultProps = {
  rtlActive: false,
  bgColor: "primary",
  routes: [{}]
};

Sidebar.propTypes = {
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

export default Sidebar;

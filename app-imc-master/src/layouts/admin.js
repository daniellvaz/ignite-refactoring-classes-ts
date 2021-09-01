import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import PerfectScrollbar from "perfect-scrollbar";
import Notification from "./components/notify/notify";
import Navbar from "./components/navbars/navbar";
import routes from "../routes";
import logo from "../assets/img/dev_fest_logo.svg";
import '../assets/css/sidebar.css';

var ps;
class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPullNotify: false,
      backgroundColor: "blue",
      sidebarOpened:
        document.documentElement.className.indexOf("nav-open") !== -1
    };
  }
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      document.documentElement.className += " perfect-scrollbar-on";
      document.documentElement.classList.remove("perfect-scrollbar-off");
      ps = new PerfectScrollbar(this.refs.mainPanel, { suppressScrollX: true });
      let tables = document.querySelectorAll(".table-responsive");
      for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i]);
      }
    }
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
      document.documentElement.className += " perfect-scrollbar-off";
      document.documentElement.classList.remove("perfect-scrollbar-on");
    }
  }
  componentDidUpdate(e) {
    if (e.history.action === "PUSH") {
      if (navigator.platform.indexOf("Win") > -1) {
        let tables = document.querySelectorAll(".table-responsive");
        for (let i = 0; i < tables.length; i++) {
          ps = new PerfectScrollbar(tables[i]);
        }
      }
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      this.refs.mainPanel.scrollTop = 0;
    }
  }
  toggleSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
    this.setState({ sidebarOpened: !this.state.sidebarOpened });
  };
  getRoutes = routes => {
    return routes.map((prop, key) => {
      return (
        <Route
          path={prop.path}
          component={prop.component}
          key={key}
        />
      );
    });
  };
  handleBgClick = color => {
    this.setState({ backgroundColor: color });
  };
  getBrandText = path => {
    for (let i = 0; i < routes.length; i++) {
      if (
        this.props.location.pathname.indexOf(
          routes[i].layout + routes[i].path
        ) !== -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };

  render() {
    return (
      <>
        <div id="mainPanel" className="main-panel" ref="mainPanel" data={this.state.backgroundColor}>
          <Notification />

          <Navbar
            {...this.props}
            routes={routes}
            bgColor={this.state.backgroundColor}
            logo={{ text: "Festval", imgSrc: logo }}
            toggleSidebar={this.toggleSidebar}
            openNotify={this.openNotify}
            closeNotify={this.closeNotify}
          />

          <Switch>
            {this.getRoutes(routes)}
            <Redirect from="*" to="/calculadora-imc" />
          </Switch>

          {/* {this.props.location.pathname.indexOf("maps") !== -1 ? null : (<Footer fluid />)} */}
        </div>
      </>
    );
  }
}

export default Admin;

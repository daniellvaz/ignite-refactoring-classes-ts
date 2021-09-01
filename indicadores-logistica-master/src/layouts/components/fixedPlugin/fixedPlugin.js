import React, { Component } from "react";
import './fixedPlugin.css';

class FixedPlugin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: "dropdown show-dropdown",
      fullScreen: false
    };
  }
  handleClick = () => {
    this.handleFullScreenClick()
  }

  handleFullScreenClick = () => {
    let content = document.getElementById("content");
    let wrapper = document.getElementById("wrapper");
    let wrapperNav = document.getElementById("wrapper-nav");

    if (wrapper != null && typeof wrapper != "undefined" && content != null && typeof content != "undefined") {

      if (this.state.fullScreen) {
        this.setState({ fullScreen: false });

        wrapper.style.width = "300px";
        wrapper.style.zIndex = "99999";

        setTimeout(() => { wrapperNav.style.display = '' }, 1000);

      } else {
        this.setState({ fullScreen: true });

        content.style.paddingLeft = "30px";
        wrapper.style.width = "0px";
        wrapperNav.style.display = 'none';
      }

    }

  }

  activateMode = mode => {
    switch (mode) {
      case "light":
        document.body.classList.add("white-content");
        break;
      default:
        document.body.classList.remove("white-content");
        break;
    }

    this.handleClick();
  }

  componentDidMount() {
    this.handleFullScreenClick(false);
  }
  render() {
    return (
      <div className="fixed-plugin">
        <div className={this.state.classes}>
          <div id="fixedMenuPlugin" onClick={this.handleClick}>
            <i className="fa fa-bars fa-2x" />
          </div>
        </div>
      </div>
    );
  }
}

export default FixedPlugin;

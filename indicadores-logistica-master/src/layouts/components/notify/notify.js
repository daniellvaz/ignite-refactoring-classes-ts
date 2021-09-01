/*eslint-disable*/
import React from "react";
import NotificationAlert from "react-notification-alert";
import './notify.css';

class Notify extends React.Component {
  notify = () => {
    let element = document.getElementById("callNotification");
    var typeParam = element.getAttribute("typeparam");
    var messageParam = element.getAttribute("messageparam");

    if (typeParam.length > 0 && messageParam.length > 0) {

      var options = {};

      options = {
        autoDismiss: 2,
        place: "bl",
        icon: "tim-icons icon-bell-55",
        type: typeParam,
        message: (
          <div>
            <div>
              <strong>Notificação</strong>
              <br />
              <span>{messageParam}</span>
            </div>
          </div>
        )
      };

      this.refs.notificationAlert.notificationAlert(options);
    }

  };

  render() {
    return (
      <React.Fragment>
        <div className="react-notification-alert-container">
          <NotificationAlert ref="notificationAlert" />
        </div>

        <button id="callNotification" block color="primary" onClick={() => this.notify()} hidden={true} block="true" typeparam="" messageparam="" />

      </React.Fragment>
    );
  }
}

export default Notify;

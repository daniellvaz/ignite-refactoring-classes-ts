/*eslint-disable*/
import React from "react";
import NotificationAlert from "react-notification-alert";
import './notify.css';

class Notify extends React.Component {
  notify = () => {
    let element = document.getElementById("callNotification");
    var typeParam = element.getAttribute("typeparam");
    var titleParam = element.getAttribute("titleParam");
    var messageParam = element.getAttribute("messageparam");

    if (typeParam && messageParam) {

      var options = {};

      options = {
        autoDismiss: 3,
        place: "tc",
        icon: "tim-icons icon-bell-55",
        type: typeParam,
        message: (
          <div>
            <div>
              <strong className="text-center">{titleParam != "null" ? titleParam : 'Notificação'}</strong>
              <br />
              <span className="text-justify">{messageParam}</span>
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

        <button id="callNotification" block color="primary" onClick={() => this.notify()} hidden={true} block="true" />

      </React.Fragment>
    );
  }
}

export default Notify;

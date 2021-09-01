import React from "react";
import Clock from 'react-digital-clock';
import '../styles/digitalClock.css';
export default function () {

    setTimeout(() => {
        var element = document.getElementById("digital-clock-parent");

        if (element) {
            var clock = element.firstElementChild;

            clock.className = 'div-digital-clock';

            clock.style = {};
            element.style = {};
        }
    }, 3000)

    return (
        <div className="row">
            <div id="digital-clock-parent" className="col-12 text-center" style={{ display: "none" }}>
                <Clock locale={'pt-BR'} hour12={false} format={'hh-mm-ss'}/>
            </div>
        </div>
    );
}



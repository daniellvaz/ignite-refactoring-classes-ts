import React from "react";
import ImcChart from '../../layouts/components/utils/imcChart';
import ImcTableLegend from '../../layouts/components/utils/imcTableLegend';

export default function stepThree(props) {
    var col_imc = document.getElementById('col-imc');

    const recalcularIMC = () => {
        props.handleSelect(1);
    }

    const getClassNameIMC = () => {
        if (props.imc == 0)
            return;

        if (props.imc <= 18.5)
            return 'col-peso-insuficiente';
        else if (props.imc <= 25) {
            return 'col-peso-saudavel';
        }
        else if (props.imc <= 29) {
            return 'col-sobrepeso';
        }
        else if (props.imc <= 38.9) {
            return 'col-obesidade';
        }
        else if (props.imc >= 39) {
            return 'col-obesidade-morbida';
        }
    }

    if (col_imc) {
        let className = 'col-10 ' + getClassNameIMC();

        if (col_imc.className != className)
            col_imc.className = className;
    }

    return (
        <div className="form text-center" style={{ minHeight: '400px' }}>

            <button className="btn btn-dark btn-sm" onClick={recalcularIMC}>Voltar</button>
            <div className="divider"></div>

            <div className="row text-center">
                <div className="col-1"></div>
                <div id="col-imc" className="col-10">
                    <h3 className="font-weight-bold">Seu IMC</h3>

                    <ImcTableLegend imc={props.imc} isMobileVersion={props.isMobileVersion} />

                    <br />

                    <ImcChart imc={props.imc} isMobileVersion={props.isMobileVersion} />

                </div>
                <div className="col-1"></div>
            </div>
            
            <div className="divider"></div>
        </div>
    )
}
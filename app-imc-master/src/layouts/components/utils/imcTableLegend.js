import React from 'react';

export default function ImcTableLegend(props) {

    const styles = {
        imc0: { fontWeight: 'bold' },
        imc1: { color: "#2893fe", fontWeight: 'bold' },
        imc2: { color: "#f5c724", fontWeight: 'bold' },
        imc3: { color: "#ffa013", fontWeight: 'bold' },
        imc4: { color: "#ff0000", fontWeight: 'bold' }
    }

    return (
        <table className={props.isMobileVersion ? "w-100" : "w-75"} >
            <tr style={props.imc > 0 && props.imc <= 18.5 ? styles.imc0 : {}}>
                <td className="text-center">
                    <div className="legend-step-two" style={{ background: '#d8d8d8' }}></div>
                </td>
                <td className="text-left">- 18,5</td>
                <td className="text-left">Peso insuficiente</td>
            </tr>
            <tr style={props.imc >= 18.5 && props.imc <= 25 ? styles.imc1 : {}}>
                <td className="text-center">
                    <div className="legend-step-two" style={{ background: '#2893fe' }}></div>
                </td>
                <td className="text-left">18,5 à 25</td>
                <td className="text-left">Peso Saudável</td>
            </tr>
            <tr style={props.imc >= 25.1 && props.imc <= 29 ? styles.imc2 : {}}>
                <td className="text-center">
                    <div className="legend-step-two" style={{ background: '#f5c724' }}></div>
                </td>
                <td className="text-left">25,1 à 29</td>
                <td className="text-left">Sobrepeso</td>
            </tr>
            <tr style={props.imc >= 29.1 && props.imc <= 38.9 ? styles.imc3 : {}}>
                <td className="text-center">
                    <div className="legend-step-two" style={{ background: '#ffa013' }}></div>
                </td>
                <td className="text-left">29,1 à 38,9</td>
                <td className="text-left">Obesidade</td>
            </tr>
            <tr style={props.imc >= 39 ? styles.imc4 : {}}>
                <td className="text-center">
                    <div className="legend-step-two" style={{ background: '#FF0000' }}></div>
                </td>
                <td className="text-left">+ 39</td>
                <td className="text-left">Obesidade Mórbida</td>
            </tr>
        </ table>
            )
}
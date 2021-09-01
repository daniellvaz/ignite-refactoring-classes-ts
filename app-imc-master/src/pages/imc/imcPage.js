import React, { useState } from "react";
import { Card } from "react-bootstrap";
import Slider from 'react-input-slider';
import ImcChart from '../../layouts/components/utils/imcChart';
import ImcTableLegend from '../../layouts/components/utils/imcTableLegend';

export default function ImcPage(props) {
    const [peso, setPeso] = useState(60);
    const [altura, setAltura] = useState(160);
    var col_imc = document.getElementById('col-imc');

    const calculaIMC = () => {
        let alturaM = altura / 100;
        let imcResult = (peso / (alturaM * alturaM)).toFixed(2);
        props.setImc(imcResult)

        if (imcResult > 18.5 && imcResult <= 25)
            setTimeout(() => {
                props.renderConfetti();
            }, 200)

    }

    const changeGen = (value) => {
        props.setGen(value);
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
        let className = 'col-5 ' + getClassNameIMC();

        if (col_imc.className != className)
            col_imc.className = className;
    }

    return (
        <div className="form text-center m-2">
            <div className="row">
                <div className="col-6">

                    <div className="row">
                        <div className="col-1"></div>
                        <div className="col-5">
                            <Card bg={props.gen == 0 ? 'primary' : 'primary-alt'} key={'man'} className="mb-2 w-100" onClick={() => { changeGen(0) }}>
                                <Card.Header><b>Sou Homem</b></Card.Header>
                                <Card.Body>
                                    <b>
                                        <i class="fas fa-male fa-5x text-dark"></i>
                                    </b>
                                </Card.Body>
                            </Card>
                        </div>

                        <div className="col-5">
                            <Card bg={props.gen == 1 ? 'danger' : 'danger-alt'} key={'man'} className="mb-2 w-100" onClick={() => { changeGen(1) }}>
                                <Card.Header><b>Sou Mulher</b></Card.Header>
                                <Card.Body>
                                    <b>
                                        <i class="fas fa-female fa-5x text-dark"></i>
                                    </b>
                                </Card.Body>
                            </Card>
                        </div>
                        <div className="col-1"></div>
                    </div>


                    <h3 className="text-warning divider">Seu Peso: <b>{peso} kg</b></h3>

                    <div>
                        <Slider
                            axis="x"
                            xmin={20}
                            xmax={200}
                            x={peso}
                            onChange={({ x }) => setPeso(x)}
                            style={{ width: '80%' }}
                            styles={{
                                height: '20px',
                                track: {
                                    backgroundColor: '#cfcfcf'
                                },
                                active: {
                                    backgroundColor: '#ff8d72'
                                },
                                thumb: {
                                    width: 20,
                                    height: 20
                                },
                                disabled: {
                                    opacity: 0.5
                                }
                            }}
                        />
                    </div>

                    <div className="divider-2"></div>

                    <h3 className="text-primary">Sua Altura: <b>{altura} cm</b></h3>

                    <div>
                        <Slider
                            axis="x"
                            xmin={100}
                            xmax={210}
                            x={altura}
                            onChange={({ x }) => setAltura(x)}
                            style={{ width: '80%' }}
                            styles={{
                                height: '20px',
                                track: {
                                    backgroundColor: '#cfcfcf'
                                },
                                active: {
                                    backgroundColor: '#2893fe'
                                },
                                thumb: {
                                    width: 20,
                                    height: 20
                                },
                                disabled: {
                                    opacity: 0.5
                                }
                            }}
                        />
                    </div>

                    <div className="m-2">
                        <button className="btn btn-primary m-5" onClick={calculaIMC}>Calcular IMC</button>
                    </div>

                    <img src={props.logoDGQ} alt="IMC" height="150px"></img>

                </div>
                <div id="col-imc" className="col-5">

                    <h3 className="font-weight-bold divider">Seu IMC</h3>

                    <ImcTableLegend imc={props.imc} />

                    <br />

                    <ImcChart imc={props.imc} />

                </div>
                <div className="col-1"></div>
            </div>
        </div>
    )
}
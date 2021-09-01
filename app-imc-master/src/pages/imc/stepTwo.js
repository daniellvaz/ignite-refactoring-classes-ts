import React, { useState } from "react";
import Slider from 'react-input-slider';

export default function StepTwo(props) {
    const [peso, setPeso] = useState(60);
    const [altura, setAltura] = useState(160);

    const calculaIMC = () => {
        let alturaM = altura / 100;
        let imcResult = (peso / (alturaM * alturaM)).toFixed(2);

        props.setImc(imcResult)

        if (props.isMobileVersion)
            setTimeout(() => { props.handleSelect(2); }, 200)

        if (imcResult > 18.5 && imcResult <= 25)
            setTimeout(() => {
                props.renderConfetti();
            }, 400)
    }
    
    return (
        <div className="form text-center m-2">

            <div className="row">
                <div className="col-12">
                    <h3 className="text-warning">Seu Peso: <b>{peso} kg</b></h3>

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

                    <div className="w-75 m-5">
                        <button className="btn btn-dark divider-2" onClick={calculaIMC}>Calcular</button>
                    </div>

                </div>
            </div>


        </div>
    )
}
import React from "react";
import { Card } from "react-bootstrap";
export default function StepOne(props) {

    const changeGen = (value) => {
        props.setGen(value);

        setTimeout(() => { props.handleSelect(1); }, 200)
    }

    return (
        <div className="form text-center m-5">
            <div className="row divider-2">

                <div className="col-12">
                    <Card bg={props.gen == 0 ? 'primary' : 'primary-alt'} key={'man'} className="mb-2 w-100" onClick={() => { changeGen(0) }}>
                        <Card.Header><b>Sou Homem</b></Card.Header>
                        <Card.Body>
                            <b>
                                <i class="fas fa-male fa-5x text-dark"></i>
                            </b>
                        </Card.Body>
                    </Card>
                </div>

            </div>

            <div className="row divider-2">

                <div className="col-12">
                    <Card bg={props.gen == 1 ? 'danger' : 'danger-alt'} key={'man'} className="mb-2 w-100" onClick={() => { changeGen(0) }}>
                        <Card.Header><b>Sou Mulher</b></Card.Header>
                        <Card.Body>
                            <b>
                                <i class="fas fa-female fa-5x text-dark"></i>
                            </b>
                        </Card.Body>
                    </Card>
                </div>

            </div>
        </div>
    )
}
import React from "react";
import { Card } from 'react-bootstrap';
import '../../styles/controleOperacaoEmpilhadeira.css';
import "react-modern-calendar-datepicker/lib/DatePicker.css";

export function ControleOperacaoEmpilhadeiraTable(params) {
    const cards = [
        {
            name: 'Tarefas Finalizadas',
            value: params.tarefasFinalizadas,
            className: 'panel-tarefas-finalizadas-card',
            color: 'text-info'
        },
        {
            name: 'Operadores',
            value: params.quantidadeOperadores,
            className: 'panel-operadores-card',
            color: 'text-warning'
        }
    ];

    return (
        <React.Fragment>

            <div className="row">
                {
                    cards.map((item, idx) => (
                        <div key={cards.indexOf(item)} className="col-6">
                            <Card key={idx} text={'white'} className={"col-12 text-center " + item.className}>
                                <Card.Header className="padding-0"><h4 className={"font-weight-bold margin-0 " + item.color}>{item.name}</h4></Card.Header>
                                <Card.Body className="padding-0">
                                    <h4 className={"font-weight-bold margin-0 " + item.color}>{item.value}</h4>
                                </Card.Body>
                            </Card>
                        </div>
                    ))
                }
            </div>

        </React.Fragment>
    );
}

export default ControleOperacaoEmpilhadeiraTable;






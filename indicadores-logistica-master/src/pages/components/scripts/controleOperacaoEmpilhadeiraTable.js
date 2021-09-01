import React from "react";
import { sumArray } from '../../../utils';
import '../../styles/controleOperacaoEmpilhadeira.css';
import "react-modern-calendar-datepicker/lib/DatePicker.css";

export function ControleOperacaoEmpilhadeiraTable(params) {
    var columnHoraStyle = {};
    var columnBlocoStyle = {};

    // Estilo das Colunas
    let width = 0;

    // Horas
    let tarefasHoraHeader = document.getElementById("tarefasHoraHeader");

    if (tarefasHoraHeader) {
        width = (tarefasHoraHeader.offsetWidth / params.foundedHours.length) * 0.98;

        columnHoraStyle = {
            width: width + "px",
        };
    }

    // Bloco 
    let tarefasBlocoHeader = document.getElementById("tarefasBlocoHeader");

    if (tarefasBlocoHeader) {
        width = (tarefasBlocoHeader.offsetWidth / 4) * 0.98;

        columnBlocoStyle = {
            width: width + "px",
        };
    }

    const getZebraRowColor = (value) => {
        return value % 2 === 0 ? 'zebra-row-color' : '';
    }

    const getTotalForHour = (hour) => {
        let aux = [];

        params.items.operadores.forEach(op => {
            let obj = op.atividadesPorHora.filter(f => f.hora == hour)[0];
            aux.push(obj ? obj.atividades : 0);
        })

        return sumArray(aux);
    }

    const getTotalForBlock = (block) => {
        let aux = [];

        params.items.operadores.forEach(op => {
            let obj = op.atividadesPorBloco.filter(f => f.bloco == block)[0];
            aux.push(obj ? obj.atividades : 0);
        })

        return sumArray(aux);
    }

    const getSumTotalValues = (entity) => {
        let aux = [];

        params.items.operadores.forEach(op => {
            switch (entity) {
                case 'hora':
                    aux.push(sumArray(op.atividadesPorHora.map(m => m.atividades)));
                    break;

                case 'bloco':
                    aux.push(sumArray(op.atividadesPorBloco.map(m => m.atividades)));
                    break;
            }
        });

        return sumArray(aux);
    }

    const HeaderTable = () => {
        return (
            <div className="row">
                <div id="tarefasNameHeader" className="text-center header-footer-row">
                    <br />
                    <h4 className="text-white">
                        <b>Nome Operador</b>
                    </h4>
                </div>
                <div id="tarefasHoraHeader" className="text-center header-footer-row">
                    <h4 className="text-info"><b>Tarefas por Hora</b></h4>
                    <div className="row">
                        {params.foundedHours.map(m => (
                            <div key={params.foundedHours.indexOf(m)}>
                                <div className="tarefasHoraHeader text-info" style={columnHoraStyle} hidden={m == 'total'}>{m} h</div>
                                <div className="tarefasHoraHeader text-info" style={columnHoraStyle} hidden={m != 'total'}>Total</div>
                            </div>
                        ))}
                    </div>
                    <br />
                </div>
                <div id="tarefasBlocoHeader" className="text-center header-footer-row">
                    <h4 className="text-warning"><b>Tarefas por Bloco</b></h4>
                    <div className="row">
                        {[1, 2, 3, 'total'].map(m => (
                            <div key={[1, 2, 3, 'total'].indexOf(m)}>
                                <div className="tarefasHoraHeader text-warning" style={columnBlocoStyle} hidden={m == 'total'}>Bloco {m}</div>
                                <div className="tarefasHoraHeader text-warning" style={columnBlocoStyle} hidden={m != 'total'}>Total</div>
                            </div>
                        ))}
                    </div>
                    <br />
                </div>
            </div>
        )
    }

    const FooterTable = () => {

        return (
            <div className="row">
                <div id="tarefasNameFooter" className="text-center header-footer-row">
                    <h4 className="text-white">
                        <b>Total</b>
                    </h4>
                </div>
                <div id="tarefasHoraFooter" className="text-center header-footer-row">
                    <div className="row">
                        {params.foundedHours.map(m => (
                            <div key={params.foundedHours.indexOf(m)}>
                                {
                                    m != 'total' ?
                                        <div className="tarefasHoraHeader text-info" style={columnHoraStyle}>{getTotalForHour(m)}</div>
                                        :
                                        <div className="tarefasHoraHeader text-info" style={columnHoraStyle}>{getSumTotalValues('hora')}</div>
                                }
                            </div>
                        ))}
                    </div>
                </div>
                <div id="tarefasBlocoFooter" className="text-center header-footer-row">
                    <div className="row">
                        {[1, 2, 3, 'total'].map(m => (
                            <div key={[1, 2, 3, 'total'].indexOf(m)}>
                                {
                                    m != 'total' ?
                                        <div className="tarefasHoraHeader text-warning" style={columnBlocoStyle}>{getTotalForBlock(m)}</div>
                                        :
                                        <div className="tarefasHoraHeader text-warning" style={columnBlocoStyle}>{getSumTotalValues('hora')}</div>
                                }
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <React.Fragment>

            <HeaderTable />

            {params.items.operadores.map(op => (

                <div key={params.items.operadores.indexOf(op)}>
                    <div className={"row"}>
                        <div id="tarefasNameBody" className={"text-center " + getZebraRowColor(params.items.operadores.indexOf(op))}>
                            <h4 className="text-white vertical-htext">{op.nomeOperador ?? "N/A"}</h4>
                        </div>
                        <div id="tarefasHoraBody" className={"text-center " + getZebraRowColor(params.items.operadores.indexOf(op))}>
                            <div className="row">
                                {params.foundedHours.map(hf => (
                                    <div style={columnHoraStyle} key={params.foundedHours.indexOf(hf)}>

                                        {op.atividadesPorHora.filter(f => f.hora == hf).map(h => (
                                            <h4 className="text-white vertical-htext" key={1}>{h.atividades}</h4>
                                        ))}

                                        {hf != "total" && op.atividadesPorHora.filter(f => f.hora == hf).length == 0 ? <h4 className="text-default vertical-htext">-</h4> : ''}

                                        {hf == "total" ?
                                            <h4 className="text-info font-weight-bold vertical-htext">{sumArray(op.atividadesPorHora.map(m => m.atividades))}</h4>
                                            : ''}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div id="tarefasBlocoBody" className={"text-center " + getZebraRowColor(params.items.operadores.indexOf(op))}>
                            <div className="row">
                                {[1, 2, 3, 'total'].map(bl => (

                                    <div style={columnBlocoStyle} key={[1, 2, 3, 'total'].indexOf(bl)}>
                                        
                                        {op.atividadesPorBloco.filter(f => f.bloco == bl).map(m => (
                                            <h4 className="text-white vertical-htext" key={1}>{m.atividades}</h4>
                                        ))}

                                        {bl != "total" && op.atividadesPorBloco.filter(f => f.bloco == bl).length == 0 ? <h4 className="text-default vertical-htext">-</h4> : ''}

                                        {bl == "total" ?
                                            <h4 className="text-warning font-weight-bold vertical-htext">{sumArray(op.atividadesPorBloco.map(m => m.atividades))}</h4>
                                            : ''}

                                    </div>

                                ))}
                            </div>
                        </div>
                    </div>
                </div>

            ))}

            <FooterTable />

        </React.Fragment>
    );
}

export default ControleOperacaoEmpilhadeiraTable;
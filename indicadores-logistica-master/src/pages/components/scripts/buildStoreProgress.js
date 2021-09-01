import React from 'react';
import '../styles/buildStoreProgress.css';
export default function BuildStoreProgress(buildParams) {
    let percentage;

    if (buildParams.row.volume == 0)
        percentage = 100
    else
        percentage = Math.round(100 - ((buildParams.row.pendente * 100) / buildParams.row.volume));

    if (percentage > 100)
        percentage = 100;

    if ((buildParams.row.pendente > 0) && (percentage == 100))
        percentage = 99;

    const formatHourField = (value) => {
        let moment = new Date(value);
        moment.setHours(moment.getHours() + 3);

        let hourStr = moment.toLocaleTimeString();

        return hourStr.split(':')[0] + ':' + hourStr.split(':')[1];
    }

    if (percentage == 100)
        buildParams.row.atividadesFinalizadas = true;

    if (buildParams.row.atividadesFinalizadas) {
        buildParams.row.statusHora = 3;
    }


    return (
        <table>
            <tbody>
                <tr>
                    <td className="td-name">
                        <div className="row">
                            <div className="col-3 text-center">
                                <span className="span-store">
                                    {buildParams.row.numeroLoja}
                                </span>
                            </div>
                            <div className="col-7 text-left">
                                <span className="span-store">
                                    {buildParams.row.nomeLoja}
                                </span>
                            </div>
                            <div className="col-2 text-center">
                                {buildParams.row.statusHora > 0 ?
                                    <i className={"icon-clock-size far fa-clock color-" + buildParams.row.statusHora} aria-hidden="true"></i>
                                    : ''}
                            </div>
                        </div>
                    </td>

                    <td className="td-bar">
                        <div className="progress-bar-store">
                            <div className={"progress-bar-store-content bg-color-" + buildParams.row.statusHora} style={{ width: percentage + '%' }}>
                                <div className="div-padding"></div>
                            </div>
                        </div>
                        <strong className={"hour-status-text color-" + buildParams.row.statusHora} hidden={buildParams.row.atividadesFinalizadas}>
                            <span className={buildParams.row.statusHora == 1 && buildParams.row.sheepField.length > 0 ? 'to-late-hour-text' : ''}>{buildParams.row.horaPrevistaFim}</span>

                            {
                                buildParams.row.statusHora == 1 && buildParams.row.sheepField.length > 0 ?
                                    <strong>&emsp; <i class="fad fa-arrow-alt-from-left" /> &emsp;{formatHourField(buildParams.row.sheepField)}</strong>
                                    : ''
                            }

                        </strong>
                        <strong className="percentage-text" hidden={buildParams.row.atividadesFinalizadas}>{percentage + '%'}</strong>
                        <span className="final-text color-3" hidden={!buildParams.row.atividadesFinalizadas}>Atividades Finalizadas</span>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}
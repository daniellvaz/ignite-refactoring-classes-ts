import React from "react";
import axios from "axios";
import env from "../../../config";
import { callNotification } from "../../../utils";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import "../styles/draggableTable.css";

export default function draggableTable(params) {
  if (typeof params.lojas != "undefined") {
    params.lojas.sort((a, b) => {
      if (a.sequencia < b.sequencia) return -1;
      if (a.sequencia > b.sequencia) return 1;
      return 0;
    });
  }

  const formatText = (text) => {
    text = text.replace("FESTVAL - ", "");
    text = text.replace("BEAL -", "");

    return text;
  };

  const formatTimeField = (event) => {
    let value = event.target.value;
    let valueFormatted = value.replace(/[^0-9.]/g, "");

    let strHour = "";
    let hour = valueFormatted.substr(0, 2);
    let minutes = valueFormatted.substr(2, 2);

    if (parseInt(hour) > 23) hour = "23";

    if (parseInt(hour) < 0) hour = "00";

    strHour += hour;

    if (valueFormatted.length > 2) strHour += ":";

    if (parseInt(minutes) > 59) minutes = "59";

    if (parseInt(minutes) < 0) minutes = "00";

    strHour += minutes;

    event.target.value = strHour;

    let messageEdit = document.getElementById(
      "messageEdit" + event.target.id.replace("input", "")
    );
    messageEdit.className = "draggable-message-edit ";
  };

  const applyToEditInput = (storeId) => {
    let savedInput = document.getElementById("saved-input" + storeId);
    let input = document.getElementById("input" + storeId);

    if (typeof savedInput != "undefined" && typeof input != "undefined") {
      input.className = "form-control width-80 text-center hour-text";
      savedInput.className =
        "form-control width-80 text-center default-hour-text hide";
      input.focus();
    }
  };

  const applyToDefaultInput = (storeId) => {
    let savedInput = document.getElementById("saved-input" + storeId);
    let input = document.getElementById("input" + storeId);

    if (typeof savedInput != "undefined" && typeof input != "undefined") {
      input.className = "form-control width-80 text-center hour-text hide";
      savedInput.className =
        "form-control width-80 text-center default-hour-text";
    }
  };

  const setatividadesFinalizadas = (storeId, atividadesFinalizadas) => {
    let obj = {
      finalizada: atividadesFinalizadas,
      numeroLoja: storeId,
    };

    const options = {
      method: "POST",
      url: env.URL_BASE + "/setStatusFinalizacaoLoja",
      data: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios(options)
      .then(() => {
        callNotification("success", "Hora Alterada com Sucesso!");
        params.reload();
      })
      .catch((e) => {
        callNotification("danger", "Houve um erro ao buscar os dados");
        console.error(e);
      });
  };

  const limparHoraEsperadaLoja = (numeroLoja) => {
    const options = {
      method: "DELETE",
      url: env.URL_BASE + "/limparHoraEsperadaLoja?numeroLoja=" + numeroLoja,
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios(options)
      .then(() => {
        callNotification("success", "Operação Efetuada com Sucesso");
        params.reload();
      })
      .catch((e) => {
        callNotification("danger", "Houve um Erro ao Processar essa Operação");
        console.error(e);
      });
  };

  const save = (event) => {
    let horaEsperadaTermino = event.target.value;

    if (event.key !== "Enter" && typeof event.key !== "undefined") return;

    let numeroLoja = parseInt(event.target.id.replace("input", ""));
    let currentHour = params.lojas.filter((f) => f.numeroLoja == numeroLoja)[0]
      .horaEsperadaTermino;

    if (
      horaEsperadaTermino.length === 5 &&
      horaEsperadaTermino !== currentHour
    ) {
      let obj = {
        horaEsperadaTermino: horaEsperadaTermino,
        numeroLoja: numeroLoja,
      };

      const options = {
        method: "POST",
        url: env.URL_BASE + "/salvarHoraEsperadaLoja",
        data: JSON.stringify(obj),
        headers: {
          "Content-Type": "application/json",
        },
      };

      axios(options)
        .then(() => {
          callNotification("success", "Hora Alterada com Sucesso!");
          applyToDefaultInput(numeroLoja);
          params.reload();
        })
        .catch((e) => {
          callNotification("danger", "Houve um erro ao salvar os dados");
          console.error(e);
        });
    } else {
      applyToDefaultInput(numeroLoja);
    }

    let messageEdit = document.getElementById(
      "messageEdit" + event.target.id.replace("input", "")
    );
    messageEdit.className = "draggable-message-edit  hide";

    event.target.focus();
  };

  const actionTooltip = (text) => {
    return (
      <Tooltip className="draggable-tooltip">
        <strong>{text}</strong>
      </Tooltip>
    );
  };

  const updateSequenciaLoja = (numeroLoja, sequencia) => {
    let obj = {
      sequencia: sequencia,
      numeroLoja: numeroLoja,
    };

    const options = {
      method: "POST",
      url: env.URL_BASE + "/updateSequenciaLoja",
      data: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios(options)
      .then(() => {
        params.reload();
      })
      .catch((e) => {
        callNotification("danger", "Houve um erro ao realizar essa operação");
        console.error(e);
      });
  };

  return (
    <React.Fragment>
      <div className="back-space-drag" />

      {params.lojas.map((m) => (
        <div className="row card-details-store" key={params.lojas.indexOf(m)}>
          <div className="col-2 text-center">
            <div className="row">
              <div className="col-2">
                <OverlayTrigger
                  overlay={actionTooltip(
                    "Mover para " + (m.sequencia - 1) + "° ?"
                  )}
                >
                  <span className="d-inline-block">
                    <button
                      type="button"
                      className="btn btn-link text-info btn-up-down"
                      onClick={() => {
                        updateSequenciaLoja(m.numeroLoja, m.sequencia - 1);
                      }}
                      tabIndex="-1"
                      hidden={m.sequencia == 1}
                    >
                      <i className="fas fa-arrow-circle-up"></i>
                    </button>
                  </span>
                </OverlayTrigger>
              </div>

              <div className="col-2">
                <OverlayTrigger
                  overlay={actionTooltip(
                    "Mover para " + (m.sequencia + 1) + "° ?"
                  )}
                >
                  <span className="d-inline-block">
                    <button
                      type="button"
                      className="btn btn-link text-info btn-up-down"
                      onClick={() => {
                        updateSequenciaLoja(m.numeroLoja, m.sequencia + 1);
                      }}
                      tabIndex="-1"
                      hidden={m.sequencia >= params.lojas.length}
                    >
                      <i className="fas fa-arrow-circle-down"></i>
                    </button>
                  </span>
                </OverlayTrigger>
              </div>

              <div className="col-6 text-center">
                <div className="small-space-row" />
                <strong className="text-light">{m.sequencia}</strong>
              </div>
            </div>
          </div>

          <div className="col-4 text-left">
            <div className="small-space-row" />
            <span className="text-white back-space text-big">
              {m.numeroLoja} - {formatText(m.nomeLoja)}
            </span>
          </div>

          <div className="col-4 text-center">
            <strong
              className="text-center text-success"
              hidden={!m.atividadesFinalizadas}
            >
              Atividades Finalizadas!
            </strong>

            <div hidden={m.atividadesFinalizadas}>
              <input
                id={"saved-input" + m.numeroLoja}
                type="text"
                className="form-control width-80 text-center default-hour-text"
                readOnly
                value={m.horaEsperadaTermino ?? ""}
                onFocus={() => {
                  applyToEditInput(m.numeroLoja);
                }}
              />

              <input
                id={"input" + m.numeroLoja}
                type="text"
                className="form-control width-80 text-center hour-text hide"
                model={m.horaEsperadaTermino ?? ""}
                onChange={formatTimeField}
                onBlur={save}
                onKeyDown={save}
              />

              <span
                id={"messageEdit" + m.numeroLoja}
                className="draggable-message-edit hide text-center"
              >
                Pressione {"<Tab>"} ou {"<Enter>"} para Salvar
              </span>
            </div>
          </div>

          <div className="col-2 text-center">
            <div className="row">
              <div className="col-4" />
              <div className="col-2 text-center">
                <OverlayTrigger overlay={actionTooltip("Limpar Campo")}>
                  <span className="d-inline-block">
                    <button
                      type="button"
                      className="btn btn-link float-action text-danger-custom"
                      onClick={() => {
                        limparHoraEsperadaLoja(m.numeroLoja);
                      }}
                      disabled={m.horaEsperadaTermino == null}
                      tabIndex="-1"
                    >
                      <i className="fa fa-trash"></i>
                    </button>
                  </span>
                </OverlayTrigger>
              </div>
              <div className="col-2 text-center">
                <OverlayTrigger
                  overlay={actionTooltip(
                    m.atividadesFinalizadas
                      ? "Marcar como não Finalizado"
                      : "Marcar como Finalizado"
                  )}
                >
                  <span className="d-inline-block">
                    <button
                      type="button"
                      className="btn btn-link float-action"
                      onClick={() => {
                        setatividadesFinalizadas(
                          m.numeroLoja,
                          !m.atividadesFinalizadas
                        );
                      }}
                      tabIndex="-1"
                    >
                      <i
                        className={
                          !m.atividadesFinalizadas
                            ? "text-success fa fa-clock"
                            : " text-danger-custom fa fa-times"
                        }
                      ></i>
                    </button>
                  </span>
                </OverlayTrigger>
              </div>
              <div className="col-4" />
            </div>
          </div>
        </div>
      ))}
    </React.Fragment>
  );
}

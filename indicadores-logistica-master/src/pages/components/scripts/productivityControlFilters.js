import Select from 'react-select';
import React, { useState } from "react";
import { callNotification } from '../../../utils';
import DatePicker from "react-modern-calendar-datepicker";
import { colourStyles } from '../../components/scripts/dropdownSearchConfigs';
import { datePickerConfig } from '../../../layouts/components/utils/datepicker';
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import '../../styles/detailsVolumetry.css';

export default function Filters(params) {
    const today = new Date();

    const [currentStreetSelected, setCurrentStreetSelected] = useState(null);
    const [currentOperatorSelected, setCurrentOperatorSelected] = useState(null);

    const [endHour, setEndHour] = useState(21);
    const [startHour, setStartHour] = useState(6);
    const [selectedOption, setSelectedOption] = useState('');

    const [filterByDockReservation, setFilterByDockReservation] = useState(false);
    const [filterByPickingReservation, setFilterByPickingReservation] = useState(false);
    const [filterByFractionalCollection, setFilterByFractionalCollection] = useState(true);

    const [endDate, setEndDate] = useState({ year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate() });
    const [startDate, setStartDate] = useState({ year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate() });

    const compareDates = (startDateParam, endDateParam) => {
        let diff = Math.round((endDateParam - startDateParam) / (1000 * 60 * 60 * 24));
        if (startDateParam > endDateParam) {
            callNotification("danger", "A Data Fim não pode ser menor que a Data de Início");
            return false;
        }

        else if (diff > 8 || diff < 0) {
            callNotification("danger", "A diferença entre as datas não deve exceder 7 dias");
            return false;
        }

        return true;
    }

    const formatDate = (year, month, day) => {
        var newDate = new Date();

        newDate.setFullYear(year)
        newDate.setMonth(month)
        newDate.setDate(day)

        newDate.setHours(0)
        newDate.setMinutes(0)
        newDate.setSeconds(0)

        return newDate;
    }

    const startDateText = () => {
        if (!startDate) return '';

        return startDate.day + '/' + startDate.month + '/' + startDate.year;
    }

    const endDateText = () => {
        if (!endDate) return '';

        return endDate.day + '/' + endDate.month + '/' + endDate.year;
    }

    const changeStartDate = (startEvent) => {
        if (endDate == null) {
            setStartDate(startEvent)
            return;
        }

        let startDateFormatted = formatDate(startEvent.year, startEvent.month, startEvent.day);
        let endDateFormatted = formatDate(endDate.year, endDate.month, endDate.day);

        if (compareDates(startDateFormatted, endDateFormatted)) {
            setStartDate(startEvent)
        }
    }

    const changeEndDate = (endEvent) => {
        if (startDate == null) {
            setEndDate(endEvent)
            return;
        }

        let startDateFormatted = formatDate(startDate.year, startDate.month, startDate.day);
        let endDateFormatted = formatDate(endEvent.year, endEvent.month, endEvent.day);

        if (compareDates(startDateFormatted, endDateFormatted)) {
            setEndDate(endEvent)
        }
    }

    const validateHour = (value) => {
        if (value > 23)
            value = 23;

        if (value < 0)
            value = 0;

        return parseInt(value);
    }

    const changeFilterFractionalCollection = (item) => {
        setFilterByFractionalCollection(item.target.checked);

        let obj = {
            startHour: startHour,
            endHour: endHour,
            fractionalCollection: item.target.checked,
            pickingReservation: filterByPickingReservation,
            dockReservation: filterByDockReservation,
            street: selectedOption,
            startDate: startDate,
            endDate: endDate
        }

        params.getDetalhesProdutividade(obj);
    }

    const changeFilterDockReservation = (item) => {
        setFilterByDockReservation(item.target.checked);

        let obj = {
            startHour: startHour,
            endHour: endHour,
            fractionalCollection: filterByFractionalCollection,
            pickingReservation: filterByPickingReservation,
            dockReservation: item.target.checked,
            street: selectedOption,
            startDate: startDate,
            endDate: endDate
        }

        params.getDetalhesProdutividade(obj);
    }

    const changefilterByPickingReservation = (item) => {
        setFilterByPickingReservation(item.target.checked);

        let obj = {
            startHour: startHour,
            endHour: endHour,
            pickingReservation: item.target.checked,
            fractionalCollection: filterByFractionalCollection,
            dockReservation: filterByDockReservation,
            street: selectedOption,
            startDate: startDate,
            endDate: endDate
        }

        params.getDetalhesProdutividade(obj);
    }

    const handleSetSelectedOption = (item) => {
        setSelectedOption(item.label);

        let obj = {
            startHour: startHour,
            endHour: endHour,
            fractionalCollection: filterByFractionalCollection,
            pickingReservation: filterByPickingReservation,
            dockReservation: filterByDockReservation,
            street: item.label == 'Todas' ? '' : item.label,
            startDate: startDate,
            endDate: endDate
        }

        params.getDetalhesProdutividade(obj);
    }

    const buildObjParam = (replaceStreet, replaceOperator) => {
        let obj = {
            startHour: startHour,
            endHour: endHour,
            fractionalCollection: filterByFractionalCollection,
            pickingReservation: filterByPickingReservation,
            dockReservation: filterByDockReservation,
            street: replaceStreet ?? selectedOption,
            operator: replaceOperator ?? "",
            startDate: startDate,
            endDate: endDate
        }

        return obj;
    }

    const editBarColor = (id, isNotSelected) => {
        return;
        
        if(id) {
            let editBarColor = setInterval(() => {
                let element = document.getElementById("street" + id);

                if (element) {
                    clearInterval(editBarColor);
                    element.children[0].className = isNotSelected ? "progress-bar" : "progress-bar selected-bar";
                }
    
            }, 1000);
        }
    }

    if (params.streetSelected != currentStreetSelected) {
        editBarColor(params.streetSelected ?? currentStreetSelected, !params.streetSelected);

        setCurrentStreetSelected(params.streetSelected);
        params.getDetalhesProdutividade(buildObjParam(params.streetSelected, null));
    }

    if (params.operatorSelected != currentOperatorSelected) {
        editBarColor(params.operatorSelected ?? currentOperatorSelected, !params.operatorSelected);

        setCurrentOperatorSelected(params.operatorSelected);
        params.getDetalhesProdutividade(buildObjParam(null, params.operatorSelected));
    }

    return (
        <React.Fragment>
            <div className="row">

                <div className="col-3 pad-left-2em">
                    <div className="row">
                        <div className="col-10">
                            <strong>Rua</strong>
                        </div>
                    </div>
                    <div className="row pad-top-1em">
                        <div className="col-10">
                            <Select
                                placeholder="Selecione a Rua"
                                label="Selecione a Rua"
                                options={params.optionsSearch}
                                onChange={handleSetSelectedOption}
                                styles={colourStyles}
                                model={selectedOption}
                            />
                        </div>
                    </div>
                </div>

                <div className="col-4 text-center">
                    <div className="row">
                        <div className="col-12">
                            <strong>Data</strong>
                        </div>
                    </div>

                    <div className="row date-time-filters-space">
                        <div className="col-6">
                            <DatePicker
                                locale={datePickerConfig}
                                value={startDate}
                                onChange={changeStartDate}
                                inputPlaceholder="De"
                                formatInputText={startDateText}
                                inputClassName="form-control text-center text-header-filters"
                                shouldHighlightWeekends
                            />
                        </div>
                        <div className="col-6">
                            <DatePicker
                                locale={datePickerConfig}
                                value={endDate}
                                onChange={changeEndDate}
                                inputPlaceholder="Até"
                                formatInputText={endDateText}
                                inputClassName="form-control text-center text-header-filters"
                                shouldHighlightWeekends
                            />
                        </div>
                    </div>

                    <div className="row label-filter-date">
                        <div className="col-6">
                            <strong>Início</strong>
                        </div>
                        <div className="col-6">
                            <strong>Fim</strong>
                        </div>
                    </div>
                </div>

                <div className="col-4 text-center">
                    <div className="row">
                        <div className="col-10">
                            <strong>Hora</strong>
                        </div>
                    </div>

                    <div className="row date-time-filters-space">
                        <div className="col-5">
                            <input
                                type="number"
                                min={0}
                                max={23}
                                className="form-control text-center text-header-filters"
                                value={startHour}
                                onChange={changeEvent => setStartHour(validateHour(changeEvent.target.value))} />
                        </div>
                        <div className="col-5">
                            <input
                                type="number"
                                min={startHour + 1}
                                max={23}
                                className="form-control text-center text-header-filters"
                                value={endHour}
                                disabled={startHour == 0}
                                onChange={changeEvent => setEndHour(validateHour(changeEvent.target.value))} />
                        </div>
                        <div className="col-1">
                            <button
                                className="btn btn-info btn-just-icon btn-filter-hour-search"
                                disabled={startHour == 0 || endHour == 0}
                                onClick={() => params.getDetalhesProdutividade(buildObjParam())}>
                                <i className="fa fa-search icon-filter-hour-search"></i>
                            </button>
                        </div>
                    </div>

                    <div className="row label-filter-hour">
                        <div className="col-5">
                            <strong>Início</strong>
                        </div>
                        <div className="col-5">
                            <strong>Fim</strong>
                        </div>
                    </div>

                </div>

            </div>

            <div className="row">

                <div className="col-3 pad-left-2em">
                    <div className="padding-1" />
                    <div className="custom-control custom-checkbox padding-1">
                        <input
                            type="checkbox"
                            className="custom-control-input info-color"
                            id="filterByFractionalCollection"
                            defaultChecked={filterByFractionalCollection}
                            model={filterByFractionalCollection}
                            onChange={changeFilterFractionalCollection} />

                        {filterByFractionalCollection ?
                            <label
                                className="custom-control-label text-info cursor-pointer"
                                htmlFor="filterByFractionalCollection">Filtrando por Coletas Fracionadas</label>
                            :
                            <label
                                className="custom-control-label text-white cursor-pointer"
                                htmlFor="filterByFractionalCollection">Clique para Filtrar por: <strong>Coletas Fracionadas</strong></label>
                        }

                    </div>
                </div>

                <div className="col-3">
                    <div className="padding-1" />
                    <div className="custom-control custom-checkbox padding-1">
                        <input
                            type="checkbox"
                            className="custom-control-input"
                            id="filterByDockReservation"
                            defaultChecked={filterByDockReservation}
                            model={filterByDockReservation}
                            onChange={changeFilterDockReservation} />

                        {filterByDockReservation ?
                            <label
                                className="custom-control-label text-info cursor-pointer"
                                htmlFor="filterByDockReservation">Filtrando por Reserva Doca</label>
                            :
                            <label
                                className="custom-control-label text-white cursor-pointer"
                                htmlFor="filterByDockReservation">Clique para Filtrar por: <strong>Reserva Doca</strong></label>
                        }

                    </div>
                </div>

                <div className="col-3">
                    <div className="padding-1" />
                    <div className="custom-control custom-checkbox padding-1">
                        <input
                            type="checkbox"
                            className="custom-control-input info-color"
                            id="filterByPickingReservation"
                            defaultChecked={filterByPickingReservation}
                            model={filterByPickingReservation}
                            onChange={changefilterByPickingReservation} />

                        {filterByPickingReservation ?
                            <label
                                className="custom-control-label text-info cursor-pointer"
                                htmlFor="filterByPickingReservation">Filtrando por Reserva Picking</label>
                            :
                            <label
                                className="custom-control-label text-white cursor-pointer"
                                htmlFor="filterByPickingReservation">Clique para Filtrar por: <strong>Reserva Picking</strong></label>
                        }

                    </div>
                </div>

            </div>

        </React.Fragment>
    )
}
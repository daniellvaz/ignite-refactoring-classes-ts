import React, { useState } from "react";
import { callNotification } from '../../../utils';
import DatePicker from "react-modern-calendar-datepicker";
import { datePickerConfig } from '../../../layouts/components/utils/datepicker';
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import '../../styles/controleOperacaoEmpilhadeira.css';

export default function Filters(params) {
    const today = new Date();

    // const [endDate, setEndDate] = useState({
    //     year: params.dateParams.endDate.substr(0, 4),
    //     month: params.dateParams.endDate.substr(4, 2),
    //     day: params.dateParams.endDate.substr(6, 2)
    // });
    // const [startDate, setStartDate] = useState({
    //     year: params.dateParams.startDate.substr(0, 4),
    //     month: params.dateParams.startDate.substr(4, 2),
    //     day: params.dateParams.startDate.substr(6, 2)
    // });

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

            let paramStartDate = startEvent.year + startEvent.month.toString().padStart(2, "0") + startEvent.day.toString().padStart(2, "0");
            let paramEndDate = endDate.year + endDate.month.toString().padStart(2, "0") + endDate.day.toString().padStart(2, "0");

            params.handleChangeFilters(paramStartDate, paramEndDate);
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

            let paramStartDate = startDate.year + startDate.month.toString().padStart(2, "0") + startDate.day.toString().padStart(2, "0");
            let paramEndDate = endEvent.year + endEvent.month.toString().padStart(2, "0") + endEvent.day.toString().padStart(2, "0");

            params.handleChangeFilters(paramStartDate, paramEndDate);
        }
    }

    return (
        <React.Fragment>
            <div className="row">
                <div className="col-12 text-center pad-top-1em">
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

            </div>
        </React.Fragment>
    )
}
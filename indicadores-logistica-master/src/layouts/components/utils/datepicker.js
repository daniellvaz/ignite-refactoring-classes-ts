export const datePickerConfig = {
  months: [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro'
  ],

  weekDays: [
      {
          name: 'Domingo', 
          short: 'D', 
          isWeekend: true
      },
      {
          name: 'Segunda',
          short: 'S'
      },
      {
          name: 'Terça',
          short: 'T'
      },
      {
          name: 'Quarta',
          short: 'Q'
      },
      {
          name: 'Quinta',
          short: 'Q'
      },
      {
          name: 'Sexta',
          short: 'S'
      },
      {
          name: 'Sábado',
          short: 'S',
          isWeekend: true
      },
  ],
  weekStartingIndex: 0,
  getToday(gregorainTodayObject) {
      return gregorainTodayObject;
  },
  toNativeDate(date) {
      return new Date(date.year, date.month - 1, date.day);
  },
  getMonthLength(date) {
      return new Date(date.year, date.month, 0).getDate();
  },
  transformDigit(digit) {
      return digit;
  },
  nextMonth: 'Next Month',
  previousMonth: 'Previous Month',
  openMonthSelector: 'Open Month Selector',
  openYearSelector: 'Open Year Selector',
  closeMonthSelector: 'Close Month Selector',
  closeYearSelector: 'Close Year Selector',
  defaultPlaceholder: 'Select...',
  from: 'from',
  to: 'to',
  digitSeparator: ',',
  yearLetterSkip: 0,
  isRtl: false
}

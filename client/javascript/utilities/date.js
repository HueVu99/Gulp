function formatDateNumber(number) {
  return number >= 10 ? `${number}` : `0${number}`;
}

export function formatLongDateTime(date, includeTime = true) {
  const timeString = includeTime
    ? ` ${formatDateNumber(date.getUTCHours())}:${formatDateNumber(date.getUTCMinutes())}`
    : '';
  return `${date.getUTCFullYear()}-
          ${formatDateNumber(date.getUTCMonth() + 1)}-
          ${formatDateNumber(date.getUTCDate())}${timeString}`;
}

export function formatTodayTime(date) {
  return `I dag ${formatDateNumber(date.getUTCHours())}:${formatDateNumber(date.getUTCMinutes())}`;
}

export function isSameDay(date1, date2) {
  const date1Copy = new Date(date1.getUTCFullYear(), date1.getUTCMonth(), date1.getUTCDate());
  const date2Copy = new Date(date2.getUTCFullYear(), date2.getUTCMonth(), date2.getUTCDate());
  const datesAreSameDay = date1Copy.setHours(0, 0, 0, 0) === date2Copy.setHours(0, 0, 0, 0);
  return datesAreSameDay;
}

export function getMonthName(month) {
  const monthNames = ['Januari', 'Februari', 'Mars', 'April', 'Maj', 'Juni',
    'Juli', 'Augusti', 'September', 'Oktober', 'November', 'December',
  ];

  return monthNames[month];
}

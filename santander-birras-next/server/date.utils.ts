export function formatDateForCompare(date: Date) {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

export function isDiffLessThanTwelveHours(dateAsNumber1: number, dateAsNumber2: number) {
  return Math.abs(dateAsNumber1 - dateAsNumber2) < 43200;
}
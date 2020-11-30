export class CompositeDate {
  day: number | string = "";
  month: number | string = "";
  year: number | string = "";
  hour: number | string = "";
  minute: number | string = "";

  static isValid(date: CompositeDate) {
    return (
      date &&
      date.day != "" &&
      date.month != "" &&
      date.year != "" &&
      date.hour != "" &&
      date.minute != "" &&
      !isNaN(+date.day) &&
      !isNaN(+date.month) &&
      !isNaN(+date.year) &&
      !isNaN(+date.hour) &&
      !isNaN(+date.minute) &&
      date.day <= 31 &&
      date.month <= 12
    );
  }

  static getDate(date: CompositeDate) {
    return this.isValid(date)
      ? new Date(
          +date.year,
          +date.month - 1,
          +date.day,
          +date.hour,
          +date.minute
        )
      : null;
  }

  static getFormattedDate(date: CompositeDate) {
    return this.isValid(date)
      ? `${date.day}/${date.month}/${date.year} ${date.hour}:${date.minute}`
      : null;
  }
}

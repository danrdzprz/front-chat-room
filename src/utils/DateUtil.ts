// parse a date in yyyy-mm-dd format
export const TimeStringToDate = (input : string, delimiter = ':') =>{
  let parts = input.split(delimiter);
  const today = new Date();
  // new Date(year, month [, day [, hours[, minutes[, seconds[, ms]]]]])
  return new Date(today.getFullYear(), today.getMonth(), today.getDate(), parseInt(parts[0]), parseInt(parts[1]), 0);
}

export const DateToString = (date : Date):string=>{
  var getYear = date.toLocaleString("default", { year: "numeric" });
  var getMonth = date.toLocaleString("default", { month: "2-digit" });
  var getDay = date.toLocaleString("default", { day: "2-digit" });
  return getYear + "-" + getMonth + "-" + getDay;
}

export const DateToStringFormat = (date : Date):string=>{
  var getYear = date.toLocaleString("default", { year: "numeric" });
  var getMonth = date.toLocaleString("default", { month: "2-digit" });
  var getDay = date.toLocaleString("default", { day: "2-digit" });
  return  getDay  + "-" + getMonth + "-" + getYear;
}

export const DateTimeToString = (date : Date):string=>{
  var getYear = date.toLocaleString("default", { year: "numeric" });
  var getMonth = date.toLocaleString("default", { month: "2-digit" });
  var getDay = date.toLocaleString("default", { day: "2-digit" });
  var getMinute = date.toLocaleString("default", { minute: "2-digit" });
  var getHour = date.toLocaleString("default", { hour: "2-digit",hour12: false });
  return getYear + "-" + getMonth + "-" + getDay + " " + getHour +":"+ getMinute;
}

export const DateLocaleString = (date: Date): string=>{
  const month = date.toLocaleString('es-MX', { month: 'long' });
  const day = date.toLocaleString("es-MX", { day: "2-digit" });
  return `${day} DE ${month}`.toUpperCase();
}

export const DateParser = (input : string, delimiter = '-', key_year = 0, key_month = 1,key_day = 2 ) =>{
  let parts = input.split(delimiter);
  // new Date(year, month [, day [, hours[, minutes[, seconds[, ms]]]]])
  return new Date(Number(parts[key_year]), Number(parts[key_month])-1, Number(parts[key_day])); // Note: months are 0-based
}

export const listOfYears = (num_years = 20) => {
  const getCurrentYear = new Date().getFullYear(); // current year
  return Array.from({length: num_years}, (_, i) => getCurrentYear - i);
}

export const listOfMonths = ()=> {
  return Array.from({length: 12}, (item, i) => {
    return new Date(0, i).toLocaleString('es-MX', {month: 'long'})
  });
}
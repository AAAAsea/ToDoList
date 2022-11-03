export function getMonthAndDate(timestamp){
  let date = new Date(timestamp);
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let time = (date.getHours() > 9 ? date.getHours() : '0' + date.getHours()) + ':' +( date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes()); 
  let week = date.getDay();
  return {
    month,
    day,
    time,
    week
  }
}
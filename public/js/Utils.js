function getDateYYMMDD() {
  // getCurrentDateYYMMDD
  const date = new Date();
  const year = date.getFullYear().toString().substr(-2);
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  return year + month + day;
}

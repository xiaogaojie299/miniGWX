const getYearMonthDay = (date) => {
  let year = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDate();
  return { year, month, day };
};
const getDate = (year, month, day) => {
  return new Date(year, month, day);
};
// 获取时间戳
const getTimer=(time)=>{
  return new Date(time*60*60*24*1000);
}
export { getYearMonthDay, getDate,getTimer };

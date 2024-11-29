const getDayDifference = (checkIn: Date, checkOut: Date) => {

  const date1 = new Date(checkIn);
  const date2 = new Date(checkOut);
  const diffTime = Math.abs(date2.getTime() - date1.getTime());
  const dayDifference = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return dayDifference
};

export { getDayDifference };

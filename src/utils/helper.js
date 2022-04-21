//getting unique values of state and city
export const getUniqueValues = (data, key) => {
  const uniqueArr = [
    ...new Map(data.map((item) => [item[key], item])).values(),
  ];
  return uniqueArr;
};

//getting filterd data from api
export const getFilteredData = (apiData, pastData) => {
  let fltData = [];
  if (pastData) {
    fltData = apiData.filter((item) => new Date() > new Date(item.date));
  } else {
    fltData = apiData.filter((item) => new Date() < new Date(item.date));
  }
  return fltData;
};

// nearest value inside station_path array
export const getNearestValue = (data, target) => {
  let nearesVal = data.reduce((acc, obj) =>
    Math.abs(target - obj) < Math.abs(target - acc) ? obj : acc
  );

  return nearesVal;
};

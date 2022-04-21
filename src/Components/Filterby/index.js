import React, { useState } from "react";
import "./index.css";
import { getNearestValue, getUniqueValues } from "../../utils/helper";

export default function Filterby({
  apiData,
  setData,
  uniqueState,
  apiUserData,
  setSelectedRide,
}) {
  const [city, setCity] = useState("City");
  const [state, setState] = useState("State");
  const [uniqueCity, setUniqueCity] = useState([]); // after extracting all cities name made a new array of unique cities

  const filteredData = (e, type) => {
    let { value } = e.target;
    let fltData = []; //where we filter data from api of state and city
    let myData = []; //my data is a new array where we push calculated distance
    setSelectedRide(1);

    if (type === "city") {
      setCity(value);

      fltData = apiData.filter(
        (item) => item.city?.toLowerCase() === value?.toLowerCase()
      );

      for (let index = 0; index < fltData.length; index++) {
        const element = fltData[index];

        //calculating the nearest distance from the user station code by using data from api
        let distance = Math.abs(
          +getNearestValue(element?.station_path, +apiUserData?.station_code) -
            parseInt(apiUserData?.station_code)
        );
        myData.push({ ...element, distance });
      }
      fltData = myData;
    } else {
      setState(value);

      fltData = apiData.filter(
        (item) => item.state?.toLowerCase() === value?.toLowerCase()
      );

      const arrayUniqueByCity = getUniqueValues(fltData, "city");

      for (let index = 0; index < arrayUniqueByCity.length; index++) {
        const element = arrayUniqueByCity[index];
        let distance = Math.abs(
          +getNearestValue(element?.station_path, +apiUserData?.station_code) -
            parseInt(apiUserData?.station_code)
        );

        myData.push({ ...element, distance });
      }
      fltData = myData;
      setUniqueCity(fltData);
      setState(value);
    }
    // sorting the rides according to distance calculated
    fltData.sort((a, b) =>
      a.distance > b.distance ? 1 : b.distance > a.distance ? -1 : 0
    );
    setData(fltData);
  };

  return (
    <div className="filters">
      <p>Filters</p>
      <select value={state} onChange={(e) => filteredData(e, "state")}>
        <option value="select">State</option>
        {uniqueState?.map((item, index) => {
          return (
            <option key={index} value={item.state}>
              {item.state}
            </option>
          );
        })}
      </select>

      <select value={city} onChange={(e) => filteredData(e, "city")}>
        <option value="select">City</option>
        {uniqueCity?.map((item, index) => {
          return (
            <option key={index} value={item.city}>
              {item.city}
            </option>
          );
        })}
      </select>
    </div>
  );
}

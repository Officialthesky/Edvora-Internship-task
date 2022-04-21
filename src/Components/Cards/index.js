import React, { Fragment } from "react";
import "./index.css";

export default function Cards({ item }) {
  return (
    <div className="cards">
      <div className="card">
        <div className="mapImg">
          <img src={item.map_url} alt={item.map_url} />
        </div>
        <div className="rideInfo">
          <p>Ride id: {item.id}</p>
          <p>Origin Station : {item.origin_station_code}</p>
          <p>
            station_path :[
            {item.station_path?.map((i, index) => {
              return (
                <Fragment key={index}>
                  {i}
                  {item.station_path?.length - 1 !== index ? "," : ""}
                </Fragment>
              );
            })}
            ]
          </p>
          <p>Date : {item.date}</p>

          {item?.distance && <p>Distance : {item?.distance}</p>}
        </div>
        <div className="filtersName">
          <p>{item.city}</p>
          <p>{item.state}</p>
        </div>
      </div>
    </div>
  );
}

import React, { Fragment, useEffect, useState, useRef } from "react";
import "./index.css";
import { BsFilterLeft } from "react-icons/bs";
import Cards from "../Cards";
import axios from "axios";
import { getFilteredData, getUniqueValues } from "../../utils/helper";
import Loading from "../Loading";
import Message from "../Message";
import Filterby from "../Filterby";
import { activeCss } from "./activeCss";
import { ridesTypeData } from "./tabsdata";
import { useNavigate } from "react-router";
import BottomBorder from "./BottomBorder";

export default function Tabs({ apiUserData }) {
  const [selectedRide, setSelectedRide] = useState(1); //select which type you want to see
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [countOfPastData, setCountOfPastData] = useState(null); //count of past rides happen
  const [countOfUpcoming, setCountOfUpcoming] = useState(null); // count of upcoming rides
  const [uniqueState, setUniqueState] = useState([]); // after extracting all states name made a new array of unique states
  const [uniqueCity, setUniqueCity] = useState([]); // after extracting all cities name made a new array of unique cities
  const [apiData, setApiData] = useState([]);
  const [openFilterBy, setopenFilterBy] = useState(false); //state change for open filter modal

  let navigate = useNavigate();

  const rideSelected = (rides) => {
    navigate(`/${rides.route}`);

    setSelectedRide(rides.id);
    let showData = [];
    if (rides.id === 2) {
      showData = getFilteredData(apiData, false);
    }
    if (rides.id === 3) {
      showData = getFilteredData(apiData, true);
    }
    setData(showData);
  };

  //showing all api data after rendering the website
  useEffect(() => {
    getApiData();
    // eslint-disable-next-line
  }, []);

  //getting api data
  const getApiData = async () => {
    await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/rides`,

      data: {},
    })
      .then((res) => {
        setApiData(res.data);
        setLoading(false);
        const arrayUniqueByState = getUniqueValues(res.data, "state");
        setUniqueState(arrayUniqueByState);
        const arrayUniqueByCity = getUniqueValues(res.data, "city");
        setUniqueCity(arrayUniqueByCity);
        // getting past data calculated from today date
        const pastData = res.data.filter(
          (item) => new Date() > new Date(item.date)
        );
        // getting upcoming data calculated from today date

        const upcomingData = apiData.filter(
          (item) => new Date() < new Date(item.date)
        );
        setCountOfPastData(pastData.length);
        setCountOfUpcoming(upcomingData.length);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const setFilterData = (values) => {
    setData(values);
  };

  const openFilterPopup = () => {
    setopenFilterBy(true);
  };

  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setopenFilterBy(false);
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  return (
    <div className="tabs">
      <header className="tabHeader">
        {ridesTypeData.map((ride, index) => {
          let isActive = selectedRide === ride.id;
          return (
            <div key={index} className="leftTabHeader">
              <p
                onClick={() => rideSelected(ride)}
                style={isActive ? activeCss : {}}
              >
                {ride.rideType}
                {index === 1 && `(${countOfUpcoming})`}
                {index === 2 && `(${countOfPastData})`}

                {isActive ? (
                  <BottomBorder display={true} />
                ) : (
                  <BottomBorder display={false} />
                )}
              </p>
            </div>
          );
        })}
        <div ref={wrapperRef} className="rightTabHeader">
          <div className="filterIcon" onClick={openFilterPopup}>
            {openFilterBy ? (
              <div className="filterby">
                <Filterby
                  setSelectedRide={(e) => setSelectedRide(e)}
                  apiUserData={apiUserData}
                  uniqueState={uniqueState}
                  apiData={apiData}
                  setData={setFilterData}
                  uniqueCity={uniqueCity}
                />
              </div>
            ) : (
              <div style={{ cursor: "pointer" }} className="filterWithData">
                <div className="filterIcon">
                  <BsFilterLeft />
                </div>
                <p>Filters</p>
              </div>
            )}
          </div>
        </div>
      </header>
      <Loading loading={loading} />
      <Message
        loading={loading}
        data={data}
        selectedRide={selectedRide}
        messgae="No Ride Available"
      />

      {data.map((item, index) => {
        return (
          <Fragment key={index}>
            <Cards item={item} />
          </Fragment>
        );
      })}
    </div>
  );
}

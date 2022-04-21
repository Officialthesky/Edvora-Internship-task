import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import Tabs from "../Components/Tabs";
export default function Home() {
  const [apiUserData, setApiUserData] = useState();

  useEffect(() => {
    // getting api data from user
    const getApiUserData = async () => {
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}/user`,
        data: {},
      })
        .then((res) => {
          setApiUserData(res.data);
        })
        .catch((err) => {});
    };
    getApiUserData();
  }, []);

  return (
    <div>
      <Header apiUserData={apiUserData} />
      <Tabs apiUserData={apiUserData} />
    </div>
  );
}

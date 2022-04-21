import React from "react";
import "./index.css";
export default function Loading({ loading }) {
  return (
    <>
      {loading && (
        <div className="loading">
          <h1>LOADING RIDES....</h1>
        </div>
      )}
      ;
    </>
  );
}

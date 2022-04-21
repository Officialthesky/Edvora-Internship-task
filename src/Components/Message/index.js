import React from "react";

export default function Message({ loading, data, selectedRide, messgae }) {
  return (
    <>
      {!loading && data.length === 0 && (
        <div
          style={{
            width: "100%",
            height: "80vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h1 style={{ color: "white", textAlign: "center" }}>
            {selectedRide === 1
              ? " Select City And State For Nearest Ride 🥰"
              : messgae}
          </h1>
        </div>
      )}
    </>
  );
}

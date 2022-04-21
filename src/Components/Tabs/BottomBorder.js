import React from "react";

export default function BottomBorder({ display }) {
  return (
    <div
      style={{
        width: "100%",
        height: 3,
        marginTop: 5,
        backgroundColor: display ? "#fff" : "transparent",
      }}
    />
  );
}

import React from "react";
import AppBar from "./AppBar";
export default function Main({ children }) {
  return (
    <React.Fragment>
      <AppBar />
      <div>{children}</div>
    </React.Fragment>
  );
}

import React from "react";
import "./App.css";
import ResponsiveAppBar from "./ResponsiveAppBar";
import Form from "./Form";
export default function Home() {
  return (
    <div className="Home">
      <ResponsiveAppBar />
      <Form />
    </div>
  );
}

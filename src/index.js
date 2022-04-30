import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { render } from "react-dom";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Pasted from "./Pasted";

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/:id" element={<Pasted />} />
    </Routes>
  </BrowserRouter>,
  rootElement
);

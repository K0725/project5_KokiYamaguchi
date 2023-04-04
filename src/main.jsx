import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import NavBar from "./NavBar";
import Detail from "./routers/Detail";
import Charts from "./routers/Charts";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavBar/>}> 
          <Route path="/" index element={<App />} />
          <Route path="/detail/:id" element={<Detail/>} />
          <Route path="/Charts" element={<Charts/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
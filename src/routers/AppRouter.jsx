import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import AllRoutes from "./AllRoutes";
import Navbar from "../components/common/NavBar";

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/*" element={<AllRoutes />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;

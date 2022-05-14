import React, { useEffect, useState } from "react";
import "./App.css";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { selectStatus } from "./features/counter/classSlice";
import Home from "./pages/Login";
import ClassDetails from "./pages/ClassDetails";

function App() {
  const status = useAppSelector(selectStatus);
  // const dispatch = useAppDispatch();
  



  return (
    <div className="App">
      {status === "idle" ? (
        <Home />
      ) : status === "loading" ? (
        <p>Loaging...</p>
      ) : (
        <ClassDetails />
      )}
    </div>
  );
}

export default App;

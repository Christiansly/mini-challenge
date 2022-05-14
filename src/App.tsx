import React from "react";
import "./App.css";
import { useAppSelector } from "./app/hooks";
import { selectStatus } from "./features/class/classSlice";
import Home from "./pages/Login";
import ClassDetails from "./pages/ClassDetails";

function App() {
  const status = useAppSelector(selectStatus);

  return (
    <div className="App">
      {status === "idle" ? (
        <Home />
      ) : status === "loading" ? (
        <p>Loading...</p>
      ) : (
        <ClassDetails />
      )}
    </div>
  );
}

export default App;

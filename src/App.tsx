import React, { useEffect, useState } from "react";
import "./App.css";
import Home from "./pages/Home"
import Airtable from "airtable";
const base = new Airtable({ apiKey: "keyBWm4AVqjzrCj6a" }).base(
  "appX1CDf9NSxNvfRf"
);
function App() {
  const [goals, setGoals] = useState([]);
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    base("Students")
      .select({
        filterByFormula: `Name = "Jenny"`,
        // fields: ["Classes"],
        view: "Grid view" 
      })
      .eachPage((records: any, fetchNextPage: any) => {
        console.log(records);
        // records.forEach((rec: any) => console.log(rec.fields.Classes));
        getClassStudents(records[0].fields.Classes)
        // setGoals(records);
        // fetchNextPage();
      });
  }, []);
  return <div className="App"><Home /></div>;
}

export default App;

const getClassStudents = (ids: string[]) => {
  base("Classes")
    .select({
      filterByFormula:
        "OR(" +
        ids
          .map((id: string) => {
            return `RECORD_ID()='${id}'`;
          })
          .join(",") +
        ")",
      fields: ["Studentstext", "Name"],
      view: "Grid view" 
    })
    .eachPage((records: any, fetchNextPage: any) => {
      console.log(records);
      // setUpdates(records);
      fetchNextPage();
    });
};

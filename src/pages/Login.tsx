import React, { useState } from "react";
import "./Home.css";
import Airtable from "airtable";
import { useAppDispatch } from "../app/hooks";
import { setStatus, setClassRecords } from "../features/class/classSlice";
const base = new Airtable({ apiKey: process.env.REACT_APP_AIRTABLE_KEY }).base(
  "appX1CDf9NSxNvfRf"
);
function Login() {
  const dispatch = useAppDispatch();
  const [studentName, setStudentName] = useState("");
  const onLogin = async (e: any) => {
    const name = studentName[0].toUpperCase() + studentName.slice(1);
    e.preventDefault();
    dispatch(setStatus("loading"));
    base("Students")
      .select({
        filterByFormula: `Name = "${name}"`,
        view: "Grid view",
      })
      .eachPage(
        (records: any, fetchNextPage: any) => {
          console.log(records);
          if (records.length > 0) {
            base("Classes")
              .select({
                filterByFormula:
                  "OR(" +
                  records[0].fields.Classes.map((id: string) => {
                    return `RECORD_ID()='${id}'`;
                  }).join(",") +
                  ")",
                fields: ["Studentstext", "Name"],
                view: "Grid view",
              })
              .eachPage(function page(records: any, fetchNextPage: any) {
                console.log(records);
                let refinedRecords: any = [];
                records.map((rec: any) =>
                  refinedRecords.push({
                    className: rec.fields.Name,
                    students: rec.fields.Studentstext,
                  })
                );

                dispatch(setClassRecords(refinedRecords));
              });
          } else {
            dispatch(setStatus("show"));
          }
        },
        function done(error) {
          return;
        }
      );
  };

  return (
    <form className="student-name-form" onSubmit={onLogin}>
      <div className="student-name-input">
        <label htmlFor="student-name">Student Name:</label>
        <input
          onChange={(e) => {
            setStudentName(e.target.value);
          }}
          type="text"
          name="student-name"
          id="student-name"
          value={studentName}
        />
      </div>
      <div>
        <button>Login</button>
      </div>
    </form>
  );
}

export default Login;

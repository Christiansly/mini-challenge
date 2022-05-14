import React, { useState } from "react";
import "./Home.css";
// import { useAppDispatch, useAppSelector } from "../app/hooks";
// import { selectStatus, login } from "../features/counter/classSlice";
import Airtable from "airtable";
import { useAppDispatch } from "../app/hooks";
import { setStatus, setClassRecords } from "../features/counter/classSlice";
const base = new Airtable({ apiKey: "keyBWm4AVqjzrCj6a" }).base(
  "appX1CDf9NSxNvfRf"
);
function Login() {
  const dispatch = useAppDispatch();
  const [studentName, setStudentName] = useState("");
  const onLogin = async (e: any) => {
    e.preventDefault();
    // dispatch(login(studentName));
    dispatch(setStatus("loading"));
    base("Students")
      .select({
        filterByFormula: `Name = "${studentName}"`,
        // fields: ["Classes"],
        view: "Grid view",
      })
      .eachPage(
        (records: any, fetchNextPage: any) => {
          console.log(records);

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
              // setUpdates(records);
              // return records;
              console.log(refinedRecords);

              // console.log(state.classRecords, "ree")
              // fetchNextPage();
              // return classRecord;
            });
          // fetchNextPage();
        },
        function done(error) {
          return;
        }
      );
    // console.log(classRecord, "hello");
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

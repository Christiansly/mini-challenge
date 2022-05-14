import React from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectClassRecords, logout } from "../features/counter/classSlice";
import ClassDetail from "../components/ClassDetail/ClassDetail";
import "./ClassDetails.css"
function ClassDetails() {
  const classRecords = useAppSelector(selectClassRecords);
  const dispatch = useAppDispatch();
  const onLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      <div className="header">
        <button onClick={onLogout}>Logout</button>
      </div>

      {classRecords.length ? (
        classRecords.map((rec: any) => (
          <ClassDetail key={rec.className} name={rec.className} students={rec.students} />
        ))
      ) : (
        <div>No Data</div>
      )}
    </div>
  );
}

export default ClassDetails;

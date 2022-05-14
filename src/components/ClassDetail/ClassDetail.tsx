import React from "react";
import "./ClassDetail";

function ClassDetail({ name, students }) {
  return (
    <div className="class-detail">
      <ClassInfo header={"Name"} data={name} />
      <ClassInfo header={"Students"} data={students} />
    </div>
  );
}

function ClassInfo({ header, data }) {
  return (
    <div className="class-detail-info">
      <h1>{header}</h1>
      <p>{data}</p>
    </div>
  );
}

export default ClassDetail;

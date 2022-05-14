import React from "react";
import "./ClassDetail.css";


function ClassDetail({ name, students }: any) {
  return (
    <div className="class-detail">
      <ClassInfo header={"Name"} data={name} />
      <ClassInfo header={"Students"} data={students} />
    </div>
  );
}

function ClassInfo({ header, data}: any) {
  return (
    <div className="class-detail-info">
      <h1>{header}</h1>
      <p>{data}</p>
    </div>
  );
}

export default ClassDetail;

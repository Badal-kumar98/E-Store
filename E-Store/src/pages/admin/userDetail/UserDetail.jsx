import React, { useContext } from "react";
import "./userDetail.css";
import MyContext from "../../../context/MyContext";

const UserDetail = () => {
  const context = useContext(MyContext);
  const { getAllUser } = context;
  return (
    <div className="ud-container">
      <div className="ud-header">
        <h1 className="ud-title">All Users</h1>
      </div>
      <div className="ud-table-container">
        <table className="ud-table">
          <thead>
            <tr>
              <th className="ud-th">S.No.</th>
              <th className="ud-th">User Name</th>
              <th className="ud-th">Email</th>
              <th className="ud-th">Uid</th>
              <th className="ud-th">Role</th>
              <th className="ud-th">Date</th>
            </tr>
          </thead>
          <tbody>
            {getAllUser.map((item, index) => (
              <tr key={index} className="ud-row">
                <td className="ud-td">{index + 1}.</td>
                <td className="ud-td">{item.name}</td>
                <td className="ud-td">{item.email}</td>
                <td className="ud-td">{item.uid}</td>
                <td className="ud-td">{item.role}</td>
                <td className="ud-td">{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserDetail;

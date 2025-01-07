import React from 'react';

const Dashboard = () => {
  return (
    <div style={{ margin: "30px" }}>
      <h2 >My Surveys</h2>
<br />
      <div style = {{display: "flex", gap: "20px"}} >
        {/* First Card */}
        <div className="card" style={{ width: "18rem" }}>
          <div className="card-body">
            <h5 className="card-title">Survey Title 1</h5>
            <p className="card-text">Survey description ......</p>
            <a href="#" className="btn btn-primary">Edit survey</a>
          </div>
        </div>

        {/* Second Card */}
        <div className="card" style={{ width: "18rem" }}>
          <div className="card-body">
            <h5 className="card-title">Survey Title 2</h5>
            <p className="card-text">Survey description ....</p>
            <a href="#" className="btn btn-primary">Edit survey</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

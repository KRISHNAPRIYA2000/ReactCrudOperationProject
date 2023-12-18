import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const EmpCreate = () => {
  const [employeeId, employeeIdChange] = useState("");
  const [employeeName, employeeNameChange] = useState("");
  const [employeeAge, employeeAgeChange] = useState("");
  const [description, descriptionChange] = useState("");
  const [salary, salaryChange] = useState("");
  const [validation, valChange] = useState(false);

  const navigate = useNavigate();

  const handleNumericInputChange = (value, setterFunction) => {
    const isValidInput = /^\d*$/.test(value); // Only numbers are allowed
    if (isValidInput || value === "") {
      setterFunction(value);
    }
  };

  const handleAlphanumericInputChange = (value, setterFunction) => {
    const isValidInput = /^[a-zA-Z0-9\s]*$/.test(value); // Only letters and numbers are allowed
    if (isValidInput || value === "") {
      setterFunction(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Your validation logic goes here before submitting

    const empdata = { employeeId, employeeName, employeeAge, description, salary };

    fetch("https://localhost:7218/api/Employee/AddEmployee", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(empdata),
    })
      .then((res) => {
        if (res.ok) {
          alert('Saved successfully. ');
          navigate('/');
        } else {
          console.log(`Error: ${res.status}`);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div>
      <div className="row">
        <div className="offset-lg-3 col-lg-6">
          <form className="container" onSubmit={handleSubmit}>
            <div className="card">
              <div className="card-title">
                <h2>Employee Create</h2>
              </div>
            </div>
            <div className="card-body" style={{ "textAlign": "left" }}>
              <div className="row">
                <div className="col-lg-12">
                  <div className="form-group">
                    <label>Employee ID</label>
                    <input type="text" value={employeeId} onChange={(e) => handleNumericInputChange(e.target.value, employeeIdChange)} className="form-control"></input>
                    {employeeId.length === 0 && <span className="text-danger">Enter the ID</span>}
                  </div>
                </div>

                <div className="col-lg-12">
                  <div className="form-group">
                    <label>Employee Name</label>
                    <input type="text" value={employeeName} onChange={(e) => handleAlphanumericInputChange(e.target.value, employeeNameChange)} className="form-control"></input>
                    {employeeName.length === 0 && validation && <span className="text-danger">Enter the Name</span>}
                  </div>
                </div>

                <div className="col-lg-12">
                  <div className="form-group">
                    <label>Employee Age</label>
                    <input type="text" value={employeeAge} onChange={(e) => handleNumericInputChange(e.target.value, employeeAgeChange)} className="form-control"></input>
                    {employeeAge.length === 0 && <span className="text-danger">Enter the Age</span>}
                  </div>
                </div>

                <div className="col-lg-12">
                  <div className="form-group">
                    <label>Description</label>
                    <input type="text" value={description} onChange={(e) => handleAlphanumericInputChange(e.target.value, descriptionChange)} className="form-control"></input>
                    {description.length === 0 && <span className="text-danger">Enter the description</span>}
                  </div>
                </div>

                <div className="col-lg-12">
                  <div className="form-group">
                    <label>Salary</label>
                    <input type="text" value={salary} onChange={(e) => handleNumericInputChange(e.target.value, salaryChange)} className="form-control"></input>
                    {salary.length === 0 && <span className="text-danger">Enter the salary</span>}
                  </div>
                </div>

                <div className="col-lg-12">
                  <div className="form-group">
                    <button className="btn btn-success" type="submit">Save</button>&nbsp;
                    <Link to="/" className="btn btn-danger">Back</Link>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EmpCreate;

import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const EmpEdit = () => {
  const { employeeId: paramEmployeeId } = useParams();
  const navigate = useNavigate();

  const [employeeId, setEmployeeId] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [employeeAge, setEmployeeAge] = useState("");
  const [description, setDescription] = useState("");
  const [salary, setSalary] = useState("");

  useEffect(() => {
    if (paramEmployeeId) {
      fetch(`https://localhost:7218/api/Employee/GetEmployeeById?id=${paramEmployeeId}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("Fetched data:", data);

          setEmployeeId(data[0].employeeId);
          setEmployeeName(data[0].employeeName);
          setEmployeeAge(data[0].employeeAge);
          setDescription(data[0].description);
          setSalary(data[0].salary);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, [paramEmployeeId]);

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

    const empData = { paramEmployeeId,employeeId, employeeName, employeeAge, description, salary };

    fetch(`https://localhost:7218/api/Employee/UpdateEmployee?id=${paramEmployeeId}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(empData),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Saved successfully.");
        navigate("/");
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
                <h2>Employee Edit</h2>
              </div>
            </div>
            <div className="card-body" style={{ textAlign: "left" }}>
              <div className="row">
                <div className="col-lg-12">
                  <div className="form-group">
                    <label>Employee ID</label>
                    <input type="text" value={employeeId} onChange={(e) => handleNumericInputChange(e.target.value, setEmployeeId)} className="form-control" disabled />
                  </div>
                </div>

                <div className="col-lg-12">
                  <div className="form-group">
                    <label>Employee Name</label>
                    <input type="text" value={employeeName} onChange={(e) => handleAlphanumericInputChange(e.target.value, setEmployeeName)} className="form-control" />
                  </div>
                </div>

                <div className="col-lg-12">
                  <div className="form-group">
                    <label>Employee Age</label>
                    <input type="text" value={employeeAge} onChange={(e) => handleNumericInputChange(e.target.value, setEmployeeAge)} className="form-control" />
                  </div>
                </div>

                <div className="col-lg-12">
                  <div className="form-group">
                    <label>Description</label>
                    <input type="text" value={description} onChange={(e) => handleAlphanumericInputChange(e.target.value, setDescription)} className="form-control" />
                  </div>
                </div>

                <div className="col-lg-12">
                  <div className="form-group">
                    <label>Salary</label>
                    <input type="text" value={salary} onChange={(e) => handleNumericInputChange(e.target.value, setSalary)} className="form-control" />
                  </div>
                </div>

                <div className="col-lg-12">
                  <div className="form-group">
                    <button className="btn btn-success" type="submit">
                      Save
                    </button>
                    &nbsp;
                    <Link to="/" className="btn btn-danger">
                      Back
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmpEdit;

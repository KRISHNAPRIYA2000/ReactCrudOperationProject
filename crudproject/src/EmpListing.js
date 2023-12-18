import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

const EmpListing = () => {
    const [empdata, setEmpData] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [filter, setFilter] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");
    const navigate = useNavigate();

    const LoadEdit = (employeeId) => {
        navigate(`/employee/edit/${employeeId}`);
    }

    const RemoveFunction = (employeeId) => {

        const shouldDelete = window.confirm("Are you sure you want to delete this employee?");

        if (shouldDelete) {
            const deleteEndpoint = `https://localhost:7218/api/Employee/DeleteEmployee?id=${employeeId}`;

            fetch(deleteEndpoint, {
                method: "DELETE",
            })
                .then((res) => {
                    if (res.ok) {
                        console.log(`Employee with ID ${employeeId} deleted successfully.`);
                        fetchData();
                    } else {
                        console.log(`Error deleting employee with ID ${employeeId}`);
                    }
                })
                .catch((err) => {
                    console.log(err.message);
                });
        }
    };

    const fetchData = () => {
        const url = `https://localhost:7218/api/Employee/GetEmployeeDetails?page=${pageNumber}&sort=${sortOrder}&filter=${filter}`;

        fetch(url)
            .then((res) => res.json())
            .then((resp) => setEmpData(resp))
            .catch((err) => console.log(err.message));
    };

    useEffect(() => {
        fetchData();
    }, [pageNumber, sortOrder, filter]);

    return (
        <div className="container">
            <div className="card">
                <div className="card-title">
                    <h2>Employee Listing</h2>
                </div>
                <div className="card-body">
                    <div className="divbtn">
                        <Link to="employee/create" className="btn btn-success">
                            Add New (+)
                        </Link>
                    </div>
                    <div>
                        <label>Filter:</label>
                        <input
                            type="text"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            placeholder="Filter"
                        />
                    </div>
                    <table className="table table-bordered">
                        <thead className="bg-dark text-white">
                            <tr>
                                <td>Employee ID</td>
                                <td>Employee Name</td>
                                <td>Employee Age</td>
                                <td>Description</td>
                                <td>Salary</td>
                                <td>Last Updated</td>
                                <td>Created</td>
                                <td>Action</td>
                            </tr>
                        </thead>
                        <tbody>
                            {empdata &&
                                empdata.map((item) => (
                                    <tr key={item.employeeId}>
                                        <td>{item.employeeId}</td>
                                        <td>{item.employeeName}</td>
                                        <td>{item.employeeAge}</td>
                                        <td>{item.description}</td>
                                        <td>{item.salary}</td>
                                        <td>{item.lastModified}</td>
                                        <td>{item.created}</td>
                                        <td>
                                            <button onClick={() => LoadEdit(item.employeeId)} className="btn btn-success">
                                                Edit
                                            </button>
                                            &nbsp;
                                            <button onClick={() => RemoveFunction(item.employeeId)} className="btn btn-danger">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                    <div>
                        <label>Page:</label>
                        <button onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}>Previous</button>
                        &nbsp;
                        <button onClick={() => setPageNumber((prev) => prev + 1)}>Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmpListing;

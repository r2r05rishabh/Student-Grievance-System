import React, {useEffect, useState}  from 'react'
import deptpic from "../images/department.png";
import { Link, useHistory } from "react-router-dom";
import {UserContext} from "../App";
const DeptMain = () => {

    const history = useHistory();
    const [DeptData, setDeptData] = useState('');

    const deptMainPage = async () => {
        try {
            const res = await fetch('/getdept', {
                method: "GET",
                headers: {
                    Accept: "appllication/json",
                    "Content-Type": "application/json"
                },
            });

            const data = await res.json();
            console.log(data);
            setDeptData(data);

            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }

        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        deptMainPage();
    }, []);
    return (
        <>
            <section className="addDept">
                <div className="container mt-5">
                    <div className="addDept-content">
                        <div className="addDept-form">
                            <h1 className="form-title">Department</h1>
                            <h2 className="form-title">{DeptData.deptName}</h2>
                            <div className="department-image">
                                <figure>
                                    <img src={deptpic} alt="department pic" />
                                </figure>
                            </div>

                            <form method="POST" className="deptAdd-form" id="deptAdd-form">
                                
                                <div className="form-group">
                                <Link to="/viewStatus" className="btn btn-primary">View Complaint</Link>   
                                </div>

                                 <div className="form-group">
                                 <Link to="/UpdateStatus" className="btn btn-primary">Update Status</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
           </section>
        </>
    )
}

export default DeptMain
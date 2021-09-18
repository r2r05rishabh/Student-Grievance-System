import React, {useEffect, useState}  from 'react'
import studpic from "../images/studpic.png";
import { Link, useHistory } from "react-router-dom";
import {UserContext} from "../App";
const Student = () => {

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
                            <h1 className="form-title">Student</h1>
                            <h2 className="form-title">{DeptData.deptName}</h2>
                            <div className="department-image">
                                <figure>
                                    <img src={studpic} alt="student pic" />
                                </figure>
                            </div>

                            <form method="POST" className="deptAdd-form" id="deptAdd-form">
                                
                                <div className="form-group">
                                <Link to="/signup" className="btn btn-primary">Register</Link>   
                                </div>

                                 <div className="form-group">
                                 <Link to="/login" className="btn btn-primary">Login</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
           </section>
        </>
    )
}

export default Student
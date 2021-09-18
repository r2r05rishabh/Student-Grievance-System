import React, {useEffect, useState}  from 'react'
import admpic from "../images/admin.png";
import { Link, useHistory } from "react-router-dom";
import {UserContext} from "../App";
const AdmMain = () => {

    const history = useHistory();
    const [AdmData, setAdmData] = useState('');
    return (
        <>
            <section className="admin">
                <div className="container mt-5">
                    <div className="addDept-content">
                        <div className="addDept-form">
                            <h1 className="form-title">Admin</h1>
                            <div className="-image">
                                <figure>
                                    <img src={admpic} alt="admin pic" />
                                </figure>
                            </div>

                            <form method="POST" className="admin-form" id="admin-form">
                                
                                <div className="form-group">
                                <Link to="/ViewStatusAdm" className="btn btn-primary">View Complaint</Link>   
                                </div>

                                 {/* <div className="form-group">
                                 <Link to="/addDepartment" className="btn btn-primary">Add Department</Link>
                                </div> */}

                                <div className="form-group">
                                 <Link to="/viewDepartment" className="btn btn-primary">View Department</Link>
                                </div>

                                <div className="form-group">
                                 <Link to="/ViewStudent" className="btn btn-primary">View Students</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
           </section>
        </>
    )
}

export default AdmMain
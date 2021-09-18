import React, {useState}  from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import deptpic from "../images/department.png";

const AddDept = () => {
    const history = useHistory();
    const [department, setDept] = useState({
        deptName: "", email: "", password: "", cpassword: ""
    });

    let name, value;

    const handleInputs = (e) => {
        console.log(e);
        name = e.target.name;
        value = e.target.value;
        
        setDept({...department, [name]:value});
    }


    const PostData = async (e) => {
        e.preventDefault();

        const { deptName, email, password, cpassword } = department;

        const res = await fetch("/department", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                deptName, email, password, cpassword
            })
        });

        const data = await res.json();

        // I need to change the data to res 
        if (data.status === 422 || !data) {
            window.alert("INvalid Registration");
            console.log("INvalid Registration");
        } else {
             window.alert(" Registration Successfull");
            console.log("Successfull Registration");

            history.push("/officialLogin");
        }
    }


    return (
        <>
            <section className="addDept">
                <div className="container mt-5">
                    <div className="addDept-content">
                        <div className="addDept-form">
                            <h2 className="form-title">Add Department</h2>

                            <div className="department-image">
                                <figure>
                                    <img src={deptpic} alt="department pic" />
                                </figure>
                            </div>

                            <form method="POST" className="deptAdd-form" id="deptAdd-form">
                                
                                <div className="form-group">
                                    <label htmlFor="deptName">
                                        <i className="zmdi zmdi-book material-icons-name"></i>
                                    </label>
                                    <input type="text" name="deptName" id="deptName" autocomplete="off"
                                        value={department.deptName}
                                        onChange={handleInputs}
                                        placeholder="Department Name"
                                    />
                                </div>

                                 <div className="form-group">
                                    <label htmlFor="email">
                                        <i className="zmdi zmdi-email material-icons-name"></i>
                                    </label>
                                    <input type="email" name="email" id="email" autoComplete="off"
                                        value={department.email}
                                        onChange={handleInputs}
                                        placeholder="Department HOD Email"
                                    />
                                </div>

                                 <div className="form-group">
                                    <label htmlFor="password">
                                        <i className="zmdi zmdi-lock material-icons-name"></i>
                                    </label>
                                    <input type="password" name="password" id="password" autoComplete="off"
                                        value={department.password}
                                        onChange={handleInputs}
                                        placeholder="Department Password"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="cpassword">
                                        <i className="zmdi zmdi-lock material-icons-name"></i>
                                    </label>
                                    <input type="password" name="cpassword" id="cpassword" autoComplete="off"
                                        value={department.cpassword}
                                        onChange={handleInputs}
                                        placeholder="Confirm Department Password"
                                    />
                                </div>
                               
                                <div className="form-group form-button">
                                    <input type="submit" name="addDepartment" id="addDepartment" className="form-submit"
                                        value="Add Department" onClick={PostData}
                                     
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
           </section>
        </>
    )
}

export default AddDept

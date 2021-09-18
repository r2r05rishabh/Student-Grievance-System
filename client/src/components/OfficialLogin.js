import React, { useState, useContext } from "react";
import loginpic from "../images/login.svg";
import adminpic from "../images/admin.png";
import { NavLink, useHistory } from "react-router-dom";
import { UserContext } from "../App";
const OfficialLogin = () => {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  const [d_name, setDepartment] = useState("");
  const [d_email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminPassword, setAdmPassword] = useState("");

  //login Department
  const loginDepartment = async (e) => {
    e.preventDefault();
    const email = d_email;
    // const password = password;
    // alert(email);
    // alert(dPassword);
    const result = await fetch("/loginDepartment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "email" : email,"password" : password
      }),
    });
    console.log(email);
    console.log(password);
    const data = await result.json();
    console.log(data);
    console.log(data.login);
    if(data.login){
      window.alert("Login Successfull");
            history.push("/Department");
    }
    else{
      alert("invalid credentials")
    }
  };

  // login admin
  const loginAdmin = () => {
    if(adminPassword === 'admin'){
      alert("Login successfull");
      history.push("/Admin");
    }
    else{
      alert("invalid credentials")
      history.push("/OfficialLogin");
    }
  };

  return (
    <>
      <section className="sign-in">
        <div className="container mt-5">
          <div className="signin-content">
            <div className="signin-image">
              <figure>
                <img src={loginpic} alt="Login pic" />
              </figure>
              {/* <NavLink to="/addDepartment" className="deptAdd-image-link">
                Department not Added
              </NavLink> */}
            </div>
            <div className="signin-form">
              <h2 className="form-title">Department Login</h2>
              <form method="POST" className="register-form" id="register-form">
                <div className="form-group">
                  <label htmlFor="d_email">
                    <i className="zmdi zmdi-email material-icons-name"></i>
                  </label>
                  <input
                    type="d_email"
                    name="d_email"
                    id="d_email"
                    autoComplete="off"
                    value={d_email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your HOD Email"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">
                    <i className="zmdi zmdi-lock material-icons-name"></i>
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    autoComplete="off"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Your Password"
                  />
                </div>
                <div className="form-group form-button">
                  <input
                    type="submit"
                    name="signin"
                    id="signin"
                    className="form-submit"
                    value="Log In"
                    onClick={loginDepartment}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <section className="admin">
        <div className="container mt-5">
          <div className="admin-content">
            <div className="admin-image">
              <figure>
                <img src={adminpic} alt="Admin pic" />
              </figure>
            </div>
            <div className="admin-form">
              <h2 className="form-title">Admin Login</h2>
              <form
                method="POST"
                className="register-form"
                id="register-form-admin"
              >
                <div className="form-group">
                  <label htmlFor="admPassword">
                    <i className="zmdi zmdi-lock material-icons-name"></i>
                  </label>
                  <input
                    type="adminPassword"
                    name="adminPassword"
                    id="adminPassword"
                    autoComplete="off"
                    value={adminPassword}
                    onChange={(e) => setAdmPassword(e.target.value)}
                    placeholder="Your Password"
                  />
                </div>
                <div className="form-group form-button">
                  <input
                    type="submit"
                    name="admin"
                    id="admin"
                    className="form-submit"
                    value="Log In"
                    onClick={loginAdmin}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default OfficialLogin;

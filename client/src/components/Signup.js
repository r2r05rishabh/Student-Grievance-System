import React, {useState}  from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import signpic from "../images/signup.svg";

const Signup = () => {
    const history = useHistory();
    const [user, setUser] = useState({
        name: "", email: "", admissionno: "",phone: "", branch: "", semester: "", password: "", cpassword: ""
    });

    let name, value;

    const handleInputs = (e) => {
        console.log(e);
        name = e.target.name;
        value = e.target.value;
        
        setUser({...user, [name]:value});
    }


    const PostData = async (e) => {
        e.preventDefault();

        const { name, email, admissionno, phone, branch, semester, password, cpassword } = user;

        const res = await fetch("/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, admissionno, phone, branch, semester, password, cpassword
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

          //  history.push("/login");
          history.push("/Student");
        }
    }


    return (
        <>
            <section className="signup">
                <div className="container mt-5">
                    <div className="signup-content">
                        <div className="signup-form">
                            <h2 className="form-title">Register</h2>
                            <form method="POST" className="register-form" id="register-form">
                                
                                <div className="form-group">
                                    <label htmlFor="name">
                                        <i className="zmdi zmdi-account material-icons-name"></i>
                                    </label>
                                    <input type="text" name="name" id="name" autocomplete="off"
                                        value={user.name}
                                        onChange={handleInputs}
                                        placeholder="Your Name"
                                    />
                                </div>

                                 <div className="form-group">
                                    <label htmlFor="email">
                                        <i className="zmdi zmdi-email material-icons-name"></i>
                                    </label>
                                    <input type="email" name="email" id="email" autoComplete="off"
                                        value={user.email}
                                        onChange={handleInputs}
                                        placeholder="Your Email"
                                    />
                                </div>

                                 <div className="form-group">
                                    <label htmlFor="admissionno">
                                        <i className="zmdi zmdi-format-list-numbered material-icons-name"></i>
                                    </label>
                                    <input type="text" name="admissionno" id="admissionno" autoComplete="off"
                                        value={user.admissionno}
                                        onChange={handleInputs}
                                        placeholder="Your Admission Number"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="phone">
                                        <i className="zmdi zmdi-phone material-icons-name"></i>
                                    </label>
                                    <input type="text" name="phone" id="phone" autoComplete="off"
                                        value={user.phone}
                                        onChange={handleInputs}
                                        placeholder="Your Phone Number"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="branch">
                                        <i className="zmdi zmdi-book material-icons-name"></i>
                                    </label>
                                    <input type="text" name="branch" id="branch" autoComplete="off"
                                        value={user.work}
                                        onChange={handleInputs}
                                        placeholder="Your Branch"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="semester">
                                        <i className="zmdi zmdi-calendar-alt material-icons-name"></i>
                                    </label>
                                    <input type="text" name="semester" id="semester" autoComplete="off"
                                        value={user.work}
                                        onChange={handleInputs}
                                        placeholder="Your Semester"
                                    />
                                </div>

                                 <div className="form-group">
                                    <label htmlFor="password">
                                        <i className="zmdi zmdi-lock material-icons-name"></i>
                                    </label>
                                    <input type="password" name="password" id="password" autoComplete="off"
                                        value={user.password}
                                        onChange={handleInputs}
                                        placeholder="Your Password"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="cpassword">
                                        <i className="zmdi zmdi-lock material-icons-name"></i>
                                    </label>
                                    <input type="password" name="cpassword" id="cpassword" autoComplete="off"
                                        value={user.cpassword}
                                        onChange={handleInputs}
                                        placeholder="Confirm Your Password"
                                    />
                                </div>
                               
                                <div className="form-group form-button">
                                    <input type="submit" name="signup" id="signup" className="form-submit"
                                        value="register" onClick={PostData}
                                     
                                    />
                                </div>

                            </form>
                        </div>
                        
                            <div className="signup-image">
                                <figure>
                                    <img src={signpic} alt="registration pic" />
                                </figure>
                                <NavLink to="/login" className="signup-image-link">I am already registered</NavLink>
                            </div>
                       
                    </div>
                </div>
           </section>
        </>
    )
}

export default Signup

import React, {useEffect, useState}  from 'react'
import { useHistory } from "react-router-dom";

const Complaint = () => {
    const [userData, setUserData] = useState({name:"", email:"", admissionno:"", branch:"", semester:"",   phone:"", complaint:""});

    const userContact = async () => {
        try {
            const res = await fetch('/getdata', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            });

            const data = await res.json();
            console.log(data);
            setUserData({...userData, name:data.name, email:data.email, admissionno:data.admissionno, branch:data.branch, semester:data.semester, phone:data.phone });

            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }

        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        userContact();
    }, []);

    // we are storing data in states 

    const handleInputs = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setUserData({ ...userData, [name]:value });
    }   

   //  send the data to backend 

    const complainForm = async (e) => {
        e.preventDefault();
        const cmptid=1000

        const { name, email, admissionno, branch, semester, phone, complaint} = userData;

        const res = await fetch('/registerComplaint', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                //name, email, admissionno, branch, semester, phone, complaint
                cmptid, name, email, admissionno, phone, branch, semester, complaint
            })
        });

        const data = await res.json();

        if (!data) {
            console.log("complains not send ");
        } else {
            alert("complains Send");
            setUserData({ ...userData, complaint});
        }

    }



  return (
    <>
       <section  className="complain">
          <div className="container mt-5">
             <div className="complain-content">
                <div className="complain-form">
                  <h2 className="form-title">Fill The Complain Form Carefully:-</h2>
                    <form method="POST" className="complain" id="complain">
                       <div className="form-group">
                           <p>Full Name: </p>
                          <input type="text" name="name" id="name" value={userData.name} onChange={handleInputs} placeholder="name"/>
                       </div>
                       <div className="form-group">
                           <p>Email:</p>
                          <input type="text" name="email" id="email" value={userData.email} onChange={handleInputs} placeholder="email"/>
                       </div>
                       <div className="form-group">
                           <p>Admission No:</p>
                          <input type="text" name="admissionno" id="admissionno" value={userData.admissionno} onChange={handleInputs} placeholder="admissionno"/>
                       </div>
                       <div className="form-group">
                           <p>Branch:</p>
                          <input type="text" name="branch" id="branch" value={userData.branch} onChange={handleInputs} placeholder="branch"/>
                       </div>
                       <div className="form-group">
                           <p>Semester:</p>
                          <input type="text" name="semester" id="semester" value={userData.semester} onChange={handleInputs} placeholder="semester"/>
                       </div>
                       <div className="form-group">
                           <p>Phone No:</p>
                          <input type="text" name="phone" id="phone" value={userData.phone} onChange={handleInputs} placeholder="phone"/>
                       </div>
                       <div className="form-group">
                                        <textarea className="text_field complain_form"
                                            name="complaint"
                                           value={userData.complaint}
                                           onChange={handleInputs}
                                            placeholder="Write your problem in brief:" cols="30" rows="10"></textarea>
                        </div>

                        <div className="form-group">
                           Upload required documents for proof purpose:
                          <input type="file" name="file" id="file"/>
                       </div>

               

                       <div className="form-group form-button">
                          <input type="submit" name="sub" id="sub"  className="form-submit" onClick={complainForm} value="submit form"/>
                           
                       </div>
                    </form>

                </div>

             </div>

          </div>
       </section>
    </>
  );



}
 export default Complaint;
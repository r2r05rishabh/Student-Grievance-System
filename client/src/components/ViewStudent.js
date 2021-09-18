
import React, {useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";

const axios = require('axios');


const ViewStudent = () => {

    const history = useHistory();
    const [data, setData] = useState([]);


    // GET request function to your Mock API

    const callStatus = async () => {

        const userData = await axios.get('/viewStudent')
        console.log(userData.data);
        setData(userData.data);
        return userData.data;

    }



    // Calling the function on component mount

    useEffect(() => {

        callStatus();

    }, []);



    return (

        <div className="container">

            <h1>Student Details</h1>

            <table class="styled-table">

                <thead>

                <tr>

                    <th>Admission Number</th>

                    <th>Name</th>

                    <th>Email</th>

                    <th>Phone Number</th>

                    <th>Branch</th>

                    <th>Semester</th>

                </tr>

                </thead>

                <tbody>

                    {

                        data.map((data) => (

                            <tr key={data.id}>

                                <td>{data.admissionno}</td>
                                
                                <td>{data.name}</td>

                                <td>{data.email}</td>

                                <td>{data.phone}</td>

                                <td>{data.branch}</td>

                                <td>{data.semester}</td>

                                <td/>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

}
export default ViewStudent

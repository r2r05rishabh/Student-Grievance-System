
import React, {useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";

const axios = require('axios');


const ViewDept = () => {

    const history = useHistory();
    const [data, setData] = useState([]);


    // GET request function to your Mock API

    const callStatus = async () => {

        const userData = await axios.get('/viewDepartment')
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

            <h1>Department Details</h1>

            <table class="styled-table">

                <thead>

                <tr>

                    <th>Department Name</th>

                    <th>HOD Email</th>

                </tr>

                </thead>

                <tbody>

                    {

                        data.map((data) => (

                            <tr key={data.id}>
                                
                                <td>{data.deptName}</td>

                                <td>{data.email}</td>

                                <td/>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

}
export default ViewDept

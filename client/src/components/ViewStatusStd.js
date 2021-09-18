import React, {useEffect, useState} from 'react';
const axios = require('axios');


const ViewStatusStd = () => {

    const [data, setData] = useState([]);


    // GET request function to your Mock API

    const callStatus = async () => {

        const userId = await axios.get('/getdata')
        const userEmail = userId.data.email;
        const userData = await axios.post('/viewStatus',{
            email: userEmail
        })
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

            <h1>View Complaint</h1>

            <table className="styled-table">

                <thead>

                <tr>

                    <th>Name</th>

                    <th>Complaint</th>

                    <th>Status</th>

                </tr>

                </thead>

                <tbody>

                    {


                            <tr>

                                <td>{data.name}</td>
                                
                                <td>{data.complaint}</td>

                                <td>{data.complaintStatus}</td>

                                <td/>

                            </tr>

                    }

                </tbody>

            </table>

        </div>

    );

}
export default ViewStatusStd

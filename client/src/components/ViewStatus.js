import React, {useEffect, useState} from 'react';
const axios = require('axios');


const ViewStatus = () => {

    const [data, setData] = useState([]);


    // GET request function to your Mock API

    const callStatus = async () => {

       const data = await axios.post('/viewStatusDept',{
           dept : "CSE"
       })
       console.log(data.data);
       setData(data.data);
       return data.data;

    }



    // Calling the function on component mount

    useEffect(() => {

        callStatus();

    }, []);



    return (

        <div className="container">

            <h1>View Complaint</h1>

            <table class="styled-table">

                <thead>

                <tr>

                    <th>Student Name</th>

                    <th>Complaint</th>

                    <th>Status</th>

                </tr>

                </thead>

                <tbody>

                    {

                        data.map((data) => (

                            <tr key={data.id}>

                                <td>{data.name}</td>
                                
                                <td>{data.complaint}</td>

                                <td>{data.complaintStatus}</td>

                                <td/>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

}
export default ViewStatus 

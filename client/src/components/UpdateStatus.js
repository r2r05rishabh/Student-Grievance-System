import React, { useEffect, useState } from "react";
import axios from "axios";

const UpdateStatus = () => {
  const [data, setData] = useState([]);

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

  const [inEditMode, setInEditMode] = useState({
    status: false,

    rowKey: null,
  });

  const [cmptStatus, setStatus] = useState(null);

  const onEdit = ({ id, currentStatus }) => {
    setInEditMode({
      status: true,

      rowKey: id,
    });

    setStatus(currentStatus);
  };
  const updateInventory = ({ id, newStatus }) => {
    axios.patch(`/updateStatus`, {
      //method: "PATCH",

      body: JSON.stringify({
        complaintStatus: newStatus,
      }),

      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())

      .then((json) => {
        // reset inEditMode and unit price state values

        onCancel();

        // fetch the updated data

        callStatus();
      });
  };

  /**
    
         *
    
         * @param id -The id of the product
    
         * @param newUnitPrice - The new unit price of the product
    
         */

  const onSave = ({ id, newStatus }) => {
    updateInventory({ id, newStatus });
  };

  const onCancel = () => {
    // reset the inEditMode state value

    setInEditMode({
      status: false,

      rowKey: null,
    });

    // reset the unit price state value

    setStatus(null);
  };

  return (
    <div className="container">
      <h1>Update Status</h1>

      <table class="styled-table">
        <thead>
          <tr>
            <th>Student Name</th>

            <th>Complaint</th>

            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item,index) => (
            <tr key={item.id}>
              <td>{item.name}</td>

              <td>{item.complaint}</td>

              <td>
                {inEditMode.status && inEditMode.rowKey === item.id ? (
                  <input
                    value={index.cmptStatus}
                    onChange={(event) => setStatus(event.target.value)}
                  />
                ) : (
                  item.complaintStatus
                )}
              </td>

              <td>
                {inEditMode.status && inEditMode.rowKey === item.id ? (
                  <React.Fragment>
                    <button
                      className={"btn-success"}
                      onClick={() =>
                        onSave({ id: item.id, newStatus: index.cmptStatus })
                      }
                    >
                      Save
                    </button>

                    <button
                      className={"btn-secondary"}
                      style={{ marginLeft: 8 }}
                      onClick={() => onCancel()}
                    >
                      Cancel
                    </button>
                  </React.Fragment>
                ) : (
                  <button
                    className={"btn-primary"}
                    onClick={() =>
                      onEdit({
                        id: item.id,
                        currentStatus: item.complaintStatus,
                      })
                    }
                  >
                    Edit
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default UpdateStatus;

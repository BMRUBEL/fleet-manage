import React, { useEffect, useState } from "react";
import Footer from "../Footer";
import Menu from "../Menu";
// import Menu from "../menu/Menu";

import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Fuel_list() {
    const navigate = useNavigate();

  const [vehicles, setvehicles] = useState([{ name: "", id: "" }]);
  const [drivers, setdrivers] = useState([{ name: "", id: "" }]);
  const [data, setList] = useState([]);
  // const [vehicle, setvehicle] = useState("");
  // const [driver, setdriver] = useState("");
  // const [date, setdate] = useState("");
  // const [meter, setmeter] = useState("");
  // const [qty, setqty] = useState("");
  // const [amount, setamount] = useState("");
  // const [remarks, setremarks] = useState("");
  const [msg, setmsg] = useState("");
  // const [type, settype] = useState("insert");
  // const [fuelID, setid] = useState("");

  const getFuel = () => {
    axios({
      method: "get",
      url: "http://fleet.prantiksoft.com/backend/Fuel",
      responseType: "json",
    }).then(function (response) {
      setList(response.data.fuels);
    });
  };
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token == null) {
      navigate("/");
    }
    axios({
      method: "get",
      url: "http://fleet.prantiksoft.com/backend/Fuel/getVehicle",
      responseType: "json",
    }).then(function (response) {
      setvehicles(response.data.vehicle);
    });
    //--------driver-(admin)--------
    axios({
      method: "get",
      url: "http://fleet.prantiksoft.com/backend/Fuel/getDriver",
      responseType: "json",
    }).then(function (response) {
      setdrivers(response.data.driver);
    });
    // getdata();
    getFuel();
  }, []);

    //-----delete-------start
    const deletefuel = (id) => {
        axios
          .post(
            "http://fleet.prantiksoft.com/backend/Fuel/deletefuel",
            {
              id: id,
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("token"),
              },
            }
          )
          .then(function (response) {
            let data = response.data;
            setmsg(data.msg);
            getFuel();
          });
      };
      //-----delete-------end
    
      //--------edit start------
       const editfuel = (id) => {
       navigate("/Fuel_Edit/" + id);
        };
      //--------edit end-----
  return (

       <div className="hold-transition sidebar-mini">
      <div className="wrapper">
 <Menu/>
        <div className="content-wrapper pb-2 mb-0 ">
          <div className="content-header ">
            <div className="container-fluid ">
              <div className="row mb-2 " >
                <div className="col-sm-6 "  >
                  {/* <h1 className="m-0 text-dark">Add Fuel</h1> */}
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item">
                      <a href="#">Fuel</a>
                    </li>
                    <li className="breadcrumb-item active">Add Fuel</li>
                  </ol>
                </div>
                <h4 className="font-warning">{msg}</h4>
              </div>
            </div>
          </div>


  <div className="content">
            <div className="container-fluid">
              <section className="card">
                <div className="card-body">
          <div className="card card-primary card-outline">
                <div className="card-header bg-primary">
                  <h3 className="m-0">Fuel Info</h3>
                </div>
                {/* <div className="card-body"> */}
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>SL</th>
                      <th>Fill_Date</th>
                      <th>DriverName</th>
                      <th>VehicleName</th>
                      <th>Quantity</th>
                      <th>Odometer</th>
                      <th>Amount</th>
                      <th>Remarks</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((d, i) => (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{d.fill_date}</td>
                        <td>{d.drivername}</td>
                        <td>{d.vehiclename}</td>
                        <td>{d.qty}</td>
                        <td>{d.odometer}</td>
                        <td>{d.amount}</td>
                        <td>{d.remarks}</td>

                        <td>
                          <button
                            className="btn btn-success"
                            onClick={() => editfuel(d.id)}  >
                            <i className="fa fa-edit"></i>
                          </button>
                          &nbsp;
                          <button
                            className="btn btn-danger"
                            onClick={() => deletefuel(d.id)}
                          >
                            <i className="fa fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {/* </div> */}
              </div>
            </div>
          </section>
         
          <br />
          <br />
          <br />
          <br />
          <br />
    
        </div>
      </div>
    </div>
    
    <Footer />
    </div>
    </div>
   
 
  )
}

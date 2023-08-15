import React, { useEffect, useState } from "react";
import Footer from "../Footer";
import Menu from "../Menu";
import axios from "axios";
// import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Fuel_report = () => {
  // const p = useParams();
  const navigate = useNavigate();
  const [vehicles, setvehicles] = useState([{ name: "", id: "" }]);
  const [drivers, setdrivers] = useState([{ name: "", id: "" }]);
  const [vehicle, setvehicle] = useState("");
  const [startDate, setstartDate] = useState("");
  const [endDate, setendDate] = useState("");
  const [qty, setqty] = useState("");
  const [report, setreport] = useState([]);  


  useEffect(() => {
       //-------vehicle-------
    axios({
      method: "get",
      url: "http://fleet.prantiksoft.com/backend/Fuel/getVehicle",
      responseType: "json",
    }).then(function (response) {
      setvehicles(response.data.vehicle);
    });
    //-------driver-------
    axios({
      method: "get",
      url: "http://fleet.prantiksoft.com/backend/Fuel/getDriver",
      responseType: "json",
    }).then(function (response) {
      setdrivers(response.data.driver);
    });

    axios
      .post(
        "http://fleet.prantiksoft.com/backend/Fuel/fuel_report",
        {
          // id: p.id,
          vehicle_id: vehicle,
          startDate: startDate,
          endDate: endDate,
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
        console.log(data.fuelrep);
        setreport(data.fuelrep);
    
      });
   
  }, []);

//-----------Save Fuel Report---------
  const save = () => {
    axios
      .post(
        "http://fleet.prantiksoft.com/backend/Fuel/fuel_report",
        {
          // id: p.id,
          vehicle_id: vehicle,
          startDate: startDate,
          endDate: endDate,
          qty:qty,
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
        console.log(data.fuelrep);
        setreport(data.fuelrep);
        localStorage.setItem("stDate", startDate);
        localStorage.setItem("endDate", endDate);
      
      });
  };
  const go = (id) => {
    navigate("/Fuel_graph/" + id);
     };

  return (
    <div className="hold-transition sidebar-mini">
      <div className="wrapper">
        <Menu />
        <div className="content-wrapper pb-2 mb-0 ">
          <div className="content-header ">
            <div className="container-fluid">
              <div className="row mb-2 ">
                <div className="col-sm-6 ">
                  <h1 className="m-0 ">Fuel Report</h1>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item">
                      <a href="#">Report</a>
                    </li>
                    <li className="breadcrumb-item active">Fuel Report</li>
                  </ol>
                </div>
                <h4 className="font-warning"></h4>
              </div>
            </div>
          </div>

          <section className="content">
            <div className="container-fluid">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-6 col-md-3">
                      <div className="form-group">
                        <label className="form-label">
                          Fill Report From
                          <span className="form-required">*</span>
                        </label>

                        <input
                          type="date"
                          required="true"
                          className="form-control form-control-sm datepicker"
                          name="date"
                          onChange={(e) => setstartDate(e.target.value)}
                          value={startDate}
                          placeholder="Date From"
                        />
                      </div>
                    </div>
                    <div className="col-sm-6 col-md-3">
                      <div className="form-group">
                        <label className="form-label">
                          Fill Report to
                          <span className="form-required">*</span>
                        </label>

                        <input
                          type="date"
                          required="true"
                          className="form-control form-control-sm datepicker"
                          name="date"
                          onChange={(e) => setendDate(e.target.value)}
                          value={endDate}
                          placeholder="Date to"
                        />
                      </div>
                    </div>
                    <div className="col-sm-6 col-md-3">
                      <label className="form-label">
                        Vechicle<span className="form-required">*</span>
                      </label>
                      <div className="form-group">
                        <select
                          className="form-control selectized form-required"
                          name="vehicle"
                          required="true"
                          onChange={(e) => setvehicle(e.target.value)}
                        >
                          <option value="">Select Vehicle</option>

                          {vehicles.map((d, i) => {
                            return (
                              <option value={`${d.id}`}  key={i}>
                                {d.name}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>

                    <div className="modal-footer">
                      <button
                        type="submit"
                        onClick={save}
                        className="btn btn-info"
                      >
                        Generate Report
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <br />
              <br />

{/* List show */}
               <div className="col-md-12">
                <div className="card card-primary card-outline">
                  <div className="card-header ">
                    <h3 className="m-0">Fuel Report</h3>
                    <strong className="pull-right">
                    <button
                            className="btn btn-warning"
                            onClick={() => go(report[0].vehicle_id)}  >
                          <i className="fa fa-line-chart"></i>
                          </button>
                    </strong >
                  </div>
             
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
                        {/* <th>Report</th> */}
                      </tr>
                    </thead>
                    <tbody>
                    
                      {report.map((d, i) => (
                        <tr key={i}>
                          <td>{i + 1}</td>
                         
                         
                          <td>{d.fill_date}</td>
                          <td>{d.drivername}</td>
                          <td>{d.vehiclename}</td>
                          <td>{d.qty}</td>
                          <td>{d.odometer}</td>
                          <td>{d.amount}</td>
                        
                          {/* <td>       
                          <button
                            className="btn btn-warning"
                            onClick={() => go(d.vehicle_id)}  >
                          <i className="fa fa-line-chart"></i>
                          </button>
                          </td> */}
                      
                        </tr>
                      ))}
                    </tbody>
                  </table>
                
                </div>
              </div> 
               {/* List end */}

               {/* report show */}


               {/* report show */}

            </div>
          </section>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Fuel_report;

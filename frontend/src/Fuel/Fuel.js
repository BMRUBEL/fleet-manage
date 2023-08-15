import React, { useEffect, useState } from "react";
import Footer from "../Footer";
import Menu from "../Menu";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import Menu from "../menu/Menu";

export default function Fuel() {
  const navigate = useNavigate();

  const [vehicles, setvehicles] = useState([{ name: "", id: "" }]);
  const [drivers, setdrivers] = useState([{ name: "", id: "" }]);
  const [data, setList] = useState([]);
  const [vehicle, setvehicle] = useState("");
  const [driver, setdriver] = useState("");
  const [date, setdate] = useState("");
  const [meter, setmeter] = useState("");
  const [qty, setqty] = useState("");
  const [amount, setamount] = useState("");
  const [remarks, setremarks] = useState("");
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
    //---------amount= Quantity (*) fixamount--------
    // const to = () => {
    //   if(qty==null){
    //      setamount(0)
    //   }else{
    //   // setamount(parseInt(qty) - parseInt(meter));
    //   setamount(parseInt(qty) * parseInt(110));
    //   }
  
    // };
  
    //-------------Insert------------------

  const save = () => {
    axios
      .post(
        "http://fleet.prantiksoft.com/backend/Fuel/addfuel",
        {
          vehicle_id: vehicle,
          driver_id: driver,
          fill_date: date,
          qty: qty,
          odometer: meter,
          amount: amount,
          remarks: remarks,
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
        setvehicle("");
        setdriver("");
        setdate("");
        setqty("");
        setmeter("");
        setamount("");
        setremarks("");
        setTimeout(() => navigate("/fuel_list"), 3000);
      });
  };
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
            <div className="container-fluid">
              <div className="row mb-2 " >
                <div className="col-sm-6 "  >
                  <h1 className="m-0 ">Add Fuel</h1>
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

          <section className="content">
            <div className="container-fluid">
              <div className="card">
                <div className="card-body">
                 
                  <div className="row">
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
                              <option value={d.id} key={i}>
                                {d.name}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                    <div className="col-sm-6 col-md-3">
                      <div className="form-group">
                        <label className="form-label">
                          Added Driver<span className="form-required">*</span>
                        </label>
                        <select
                          required="true"
                          className="form-control selectized"
                          name="driver"
                          onChange={(e) => setdriver(e.target.value)}
                        >
                          <option value="">Select Driver</option>
                          {drivers.map((di, i) => (
                            <option value={di.id} key={i}>
                              {di.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-sm-6 col-md-3">
                      <div className="form-group">
                        <label className="form-label">
                          Fill Date
                          <span className="form-required">*</span>
                        </label>
                        <input
                          type="date"
                          required="true"
                          className="form-control datepicker"
                          name="date"
                          placeholder="Fuel Fill Date"
                          onChange={(e) => setdate(e.target.value)}
                          value={date}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6 col-md-3">
                      <div className="form-group">
                        <label className="form-label">
                          Quantity
                          <span className="form-required">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="qty"
                          placeholder="Quantity"
                          onChange={(e) => setqty(e.target.value)}
                          // value={qty}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6 col-md-3">
                      <div className="form-group">
                        <label className="form-label">
                          Odometer Reading
                          <span className="form-required">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="meter"
                          placeholder="Odometer Reading"
                          onChange={(e) => setmeter(e.target.value)}
                          value={meter}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6 col-md-3">
                      <div className="form-group">
                        <label className="form-label">
                          Amount<span className="form-required">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="amount"
                          placeholder="Amount"
                          onChange={(e) => setamount(e.target.value)}
                          // onClick={to}

                          value={amount}
                        />
                      </div>
                    </div>
                    <div className="col-sm-6 col-md-6">
                      <div className="form-group">
                        <label className="form-label">Comment</label>
                        <input
                          type="text"
                          className="form-control"
                          name="remarks"
                          placeholder="Fuel Comments"
                          onChange={(e) => setremarks(e.target.value)}
                          value={remarks}
                        />
                      </div>
                    </div>
                    <br />
                    {/* p;p */}
                    {/* <div className="col-sm-6 col-md-3">
                      <div className="form-group">
                       <label className="form-label">Need to add in expense?</label>
                           <input className="form-control form-check-input" id="exp" name="exp" type="checkbox"/>
                      </div>
                    </div> */}
                    {/* ll */}
                  </div>
                </div>
                {/* <input type="hidden" id="v_created_date" name="v_created_date" value="2023-03-28 06:02:47"/>
                 */}
                <div className="modal-footer">
                  <button
                    type="submit"
                    onClick={save}
                    className="btn btn-primary"
                  >
                    Add Fuel
                  </button>
                </div>
              </div>
              <br/>
              <br/>
{/* 
              <div className="card card-primary card-outline">
                <div className="card-header bg-primary">
                  <h3 className="m-0">Fuel Info</h3>
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
                            <i class="fa fa-edit"></i>
                          </button>
                          ::
                          <button
                            className="btn btn-danger"
                            onClick={() => deletefuel(d.id)}
                          >
                            <i class="fa fa-trash-o"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              
              </div>
            </div> */}
  </div>
  
          </section>
      
         <br/><br/><br/><br/><br/><br/><br/><br/><br/>
        
        
    
          <Footer />
        </div>
      </div>
    </div>
   
  
  );
}

import React, { useEffect, useState } from 'react';
import Footer from '../Footer';
import Menu from '../Menu';
import { useParams } from 'react-router-dom';
import axios from 'axios';
export default function Driver_report() {
    const p = useParams();
    const [startDate, setstartDate] = useState('');
    const [endDate, setendDate] = useState('');
    const [drivers, setdriver] = useState([{ name: '', id: '' }]);
    const [driverid, setdriverid] = useState('');
    const [driverdetails, setdriverdetails] = useState([]);
//driver report
     const getdriver = () => {
          axios({
            method: 'get',
            url: 'http://fleet.prantiksoft.com/backend/Driver_controller/driverlist',
            responseType: 'json'
          }).then(function (response) {
            setdriver(response.data.driver)
          });
        }
        useEffect(() => {
            getdriver()
        }, []);


    useEffect(() => {
        axios.post('http://fleet.prantiksoft.com/backend/Driver_controller/driver_Details', {
            // id: p.id,
            startDate: startDate,
            endDate: endDate,
            driverid:driverid,
        }, {
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': localStorage.getItem('token')
            }
        }).then(function (response) {
            let data = response.data;
            setdriverdetails(data.driverdetails);
            // console.log(data.driverdetails);

        })
    }, []);
    const search = () => {
        axios.post('http://fleet.prantiksoft.com/backend/Driver_controller/driver_Details', {
            // id: p.id,
            startDate: startDate,
            endDate: endDate,
            driverid:driverid,
        }, {
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': localStorage.getItem('token')
            }
        }).then(function (response) {
            let data = response.data.driverdetails;
            setdriverdetails(data);
            console.log(data);

        })
    }

    return (
        <div className="hold-transition sidebar-mini">
            <div className="wrapper">
                <Menu />
                <div className="content-wrapper">
                    <div className="content-header">
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="col-sm-6">
                                    <h1 className="m-0">Driver Report</h1>
                                </div>
                                <div className="col-sm-6">
                                    <ol className="breadcrumb float-sm-right">
                                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                                        <li className="breadcrumb-item active">Parts Inventory Details</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="content">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="card card-primary card-outline">
                                        <div className="card-header form-inline">
                                            <label>From</label>&nbsp;
                                            <input type="date" className="m-0 form-control col-lg-3" onChange={(e) => setstartDate(e.target.value)} value={startDate} />&nbsp;&nbsp;&nbsp;
                                            <label>To</label>&nbsp;
                                            <input type="date" className="m-0 form-control col-lg-3" onChange={(e) => setendDate(e.target.value)} value={endDate} />
                                            <div className="form-group">
                                            <label for="exampleInputEmail1">Driver</label>
                                            <select className=" form-control" id="exampleInputEmail1" onChange={(e) => setdriverid(e.target.value)}>
                                            <option value="">Select Driver</option>
                                            { drivers.map((d, i) =>
                                                                {
                                                                    return (
                                                                        <option value={ d.id } key={ i }>{ d.name }</option>
                                                                    )
                                                                }) }
                                                </select>
                                            </div>
                                            <button onClick={search}>Search</button>
                                        </div>
                                        <div className="card-body">
                                            <table className='table table-striped table-bordered table-hover'>
                                                <thead>
                                                    <tr>
                                                        <th>SL</th>
                                                        <th>Driver name</th>
                                                        {/* <th>booking</th> */}
                                                        <th>Booking Date</th>
                                                        <th>Vehicle</th>
                                                        <th>Start Location</th>
                                                        <th>End Location</th>
                                                        {/* <th>driver_payment</th> */}
                                                        <th>Transaction Date</th>
                                                        <th>Income</th>
                                                        <th>Tripe</th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {driverdetails.map((d,t)=>{
                                                    return (
                                                        <tr key={t}>
                                                            <td>{t+1}</td>
                                                            <td>{d.name}</td>
                                                            <td>{d.start_date}</td>
                                                            <td>{d.vehicleName}</td>
                                                            <td>{d.start_location}</td>
                                                            <td>{d.end_location}</td>
                                                            <td>{d.trans_date}</td>
                                                            <td>{d.amount}</td>
                                                            <td>{d.status}</td>
                                                        </tr>
                                                    )
                                                })}


                                                </tbody>
                                            </table>

                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>

                </div>

                <Footer />
            </div>
        </div>
    );
}

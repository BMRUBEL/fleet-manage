import React, { useEffect, useState } from 'react';
import Footer from '../Footer';
import Menu from '../Menu';
import axios from 'axios';

const Vehicletrack = () => {
    const [reg, setreg] = useState('');

    const [trackDetails, settrackDetails] = useState({});
    
    const search = () => {
        axios.post('http://fleet.prantiksoft.com/backend/Parts/carTrack', {

            registration_no: reg,
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        }).then(function (response) {
            let data = response.data.track;
            console.log(data);
            settrackDetails(data)

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
                                    <h1 className="m-0">Car Track</h1>
                                </div>
                                <div className="col-sm-6">
                                    <ol className="breadcrumb float-sm-right">
                                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                                        <li className="breadcrumb-item active">Car Track</li>
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
                                            <label>Registration no.</label>&nbsp;
                                            {/* <input type="date" className="m-0 form-control col-lg-2" onChange={(e) => setstartDate(e.target.value)} value={startDate} /> */}
                                            <input type='text' className='m-0 form-control col-lg-3' onChange={(e) => setreg(e.target.value)} value={reg} />
                                            &nbsp;&nbsp;&nbsp;
                                            <button onClick={search} className='btn btn-success'>Track</button>
                                        </div>
                                        <div className="card-body">
                                            <table className='table table-striped table-bordered table-hover'>
                                                <thead>
                                                    <tr>
                                                        <th>Driver</th>
                                                        <th>Car</th>
                                                        <th>Registration No.</th>
                                                        <th>Model</th>
                                                        <th>Color</th>
                                                        <th>Trip Type</th>
                                                        <th>Start Location</th>
                                                        <th>End Location</th>
                                                        <th>Start Date</th>
                                                        <th>End Date</th>
                                                        <th>Total Distance</th>
                                                    </tr>
                                                </thead>
                                                <tbody>

                                                    <tr>
                                                        <td>{trackDetails.driver_name}</td>
                                                        <td>{trackDetails.name}</td>
                                                        <td>{trackDetails.registration_no}</td>
                                                        <td>{trackDetails.model}</td>
                                                        <td>{trackDetails.color}</td>
                                                        <td>{trackDetails.type}</td>
                                                        <td>{trackDetails.start_location}</td>
                                                        <td>{trackDetails.end_location}</td>
                                                        <td>{trackDetails.start_date}</td>
                                                        <td>{trackDetails.end_date}</td>
                                                        <td>{trackDetails.aprox_km}</td>
                                                       
                                                    </tr>



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

export default Vehicletrack;

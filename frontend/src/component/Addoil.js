import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Menu from '../Menu';
import Footer from '../Footer';
import axios from 'axios';

export default function Addoil() {

    const navigate = useNavigate();
    const [vehicle, setVehicle] = useState([{ name: '', id: '' }]);
    const [vehicleid, setVehicleid] = useState('');
    const [oildate, setOildate] = useState('');
    const [oilcost, setOilcost] = useState('');
    const [status, setStatus] = useState('');
    const [msg, setmsg] = useState('');



    const getVehicle = () => {
        axios({
            method: 'get',
            url: 'http://fleet.prantiksoft.com/backend/Maintenance/getVehicle',
            responseType: 'json'
        }).then(function (response) {
            setVehicle(response.data.vehicle)
        });
    }
    useEffect(() => {
        let token = localStorage.getItem('token')
        if (token == null) {
            navigate("/");
        }
        getVehicle();
    }, []);

    const save = () => {

        axios.post('http://fleet.prantiksoft.com/backend/Maintenance/addoil', {
            vehicle_id: vehicleid,
            oildate: oildate,
            status: status,

        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        }).then(function (response) {
            let data = response.data;
            setVehicleid('')
            setOildate('')
            setOilcost('')
            setStatus('')
            setmsg(data.msg)
            setTimeout(() => navigate("/engine_oil"), 3000);
        })
    }
    return (
        <div>
            <div className="hold-transition sidebar-mini">
                <div className="wrapper">
                    <Menu />
                    <div className="content-wrapper">
                        <div className="content-header">
                            <div className="container-fluid">
                                <div className="row mb-2 align-items-center">
                                    <div className="col-sm-6 ">
                                        <h1 className="m-0 ">Engine Oil Maintenance</h1>
                                    </div>
                                    <div className="col-sm-6">
                                        <ol className="breadcrumb float-sm-right">
                                            <li className="breadcrumb-item"><a href="#">Home</a></li>
                                            <li className="breadcrumb-item active">Starter Page</li>
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="content">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-md-6 offset-md-3">
                                        <div className="card card-primary">
                                            <div className="card-header">
                                                <h3 className="card-title">Engine Oil Maintenance Form</h3>
                                            </div>

                                            {/* <!-- /.card-header --> */}
                                            {/* <!-- form start --> */}
                                            <div className="card-body">
                                                <div className='row'>
                                                    <div className="col-md-5 form-group">
                                                        <label>Choose Your Vehicle</label>
                                                        <select className='form-control' onChange={(e) => setVehicleid(e.target.value)} value={vehicleid}>
                                                            <option value=''>Select Vehicle</option>

                                                            {vehicle.map((d, i) => {
                                                                return (
                                                                    <option value={d.id} key={i}>{d.name}</option>
                                                                )
                                                            })}
                                                        </select>
                                                    </div>
                                                    <div className="col-md-5 form-group">
                                                        <label>Oil Change Date</label>
                                                        <input type='date' className='form-control' onChange={(e) => setOildate(e.target.value)} value={oildate} />
                                                    </div>
                                                </div>

                                                <div className='row'>
                                                    <div className=" col-md-4 form-group">
                                                        <label>Total Cost</label>
                                                        <input type='text' className='form-control' onChange={(e) => setOilcost(e.target.value)} value={oilcost} />

                                                    </div>
                                                    <div className="col-md-6 offset-md-1 form-group" onChange={(e) => setStatus(e.target.value)} value={status}>
                                                        <label>Engine Oil Status</label><br />
                                                        <input type="radio" value="Pending" name="status" /> Pending
                                                        <input type="radio" value="Completed" name="status" /> Completed
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <!-- /.card-body --> */}

                                            <div className="card-footer">
                                                <button type="submit" className="btn btn-block btn-primary" onClick={save}>Submit</button>
                                            </div>
                                            <h4>{msg}</h4>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>

                    </div>

                    <Footer />
                </div>
            </div>

        </div>
    )
}

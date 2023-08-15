import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Menu from '../Menu';
import Footer from '../Footer';

export default function Editmaintenance() {
    const navigate = useNavigate()
    const p = useParams();

    const [vehicle, setVehicle] = useState([]);
    const [vendors, setVendor] = useState([{ name: '', id: '' }]);
    const [vendorid, setVendorid] = useState('');
    const [vehicleid, setVehicleid] = useState('');
    const [sdate, setSdate] = useState('');
    const [edate, setEdate] = useState('');
    const [details, setDetail] = useState('');
    const [cost, setCost] = useState('');
    const [status, setStatus] = useState('');
    const [msg, setmsg] = useState('');

    useEffect(() => {
        //-----vehicle----------
        axios({
            method: 'get',
            url: 'http://fleet.prantiksoft.com/backend/Maintenance/getVehicle',
            responseType: 'json'
        }).then(function (response) {

            setVehicle(response.data.vehicle);
            // console.log(response.data);
        });
        ////----------Vendor-------
        axios({
            method: 'get',
            url: 'http://fleet.prantiksoft.com/backend/Maintenance/getVendor',
            responseType: 'json'
        }).then(function (response) {
            setVendor(response.data.vendor)
        });


        //------edit----------
        axios.post('http://fleet.prantiksoft.com/backend/Maintenance/editMaintenance', {
            id: p.id
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        }).then(function (response) {
            let data = response.data;
            setSdate(data.maintenance.start_date);
            setEdate(data.maintenance.end_date);
            setDetail(data.maintenance.details);
            setCost(data.maintenance.cost);
            setStatus(data.maintenance.status);
            let vehicl_Id = (data.maintenance.vehicle_id);
            let vendor_Id = (data.maintenance.vendor_id);
            setVehicleid(vehicl_Id);
            setVendorid(vendor_Id);
            // console.log(vehicl_Id,vendor_Id);
        })

        // console.log(vendorid)
    }, []);

    const save = () => {
        axios
            .post(
                "http://fleet.prantiksoft.com/backend/Maintenance/updatemaintenance",
                {
                    vendor_id: vendorid,
                    vehicle_id: vehicleid,
                    start_date: sdate,
                    end_date: edate,
                    details: details,
                    cost: cost,
                    status: status,
                    id: p.id,
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
                // console.log (data);
                setmsg(data.msg);
                setTimeout(() => navigate("/list"), 3000);
            });
    };

    return (

        <div className="hold-transition sidebar-mini">
            <div className="wrapper">
                <Menu />
                <div className="content-wrapper">
                    <div className="content-header">
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="col-sm-6">
                                    <h1 className="m-0">Edit Maintenance</h1>
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
                                <div className="col-lg-12">
                                    <div className="card card-primary">
                                        <div className="card-header">
                                            <h4>{msg}</h4>
                                            <h3 className="card-title">Maintenance Form</h3>
                                        </div>
                                        {/* <!-- /.card-header --> */}
                                        {/* <!-- form start --> */}
                                        <div className="card-body">
                                            <div className="form-group">
                                                <label>Vehicle</label>
                                                <select className='form-control' onChange={(e) => setVehicleid(e.target.value)} value={vehicleid}>

                                                    {vehicle.map((d, i) => {
                                                        return (
                                                            <option value={d.id} key={i}>{d.name}</option>
                                                        )
                                                    })}
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label>Vendor</label>
                                                <select className='form-control' onChange={(e) => setVendorid(e.target.value)} value={vendorid}>

                                                    {vendors.map((d, i) => {
                                                        return (
                                                            <option value={d.id} key={i} >{d.name}</option>
                                                        )
                                                    })}
                                                </select>
                                            </div>

                                            <div className="form-group">
                                                <label>Start Date</label>
                                                <input type="date" className="form-control" onChange={(e) => setSdate(e.target.value)} value={sdate} />
                                            </div>
                                            <div className="form-group">
                                                <label>End Date</label>
                                                <input type="date" className="form-control" onChange={(e) => setEdate(e.target.value)} value={edate} />
                                            </div>
                                            <div className="form-group">
                                                <label>Details</label>
                                                <input type="text" className="form-control" onChange={(e) => setDetail(e.target.value)} value={details} />
                                            </div>
                                            <div className="form-group">
                                                <label>Cost</label>
                                                <input type="text" className="form-control" onChange={(e) => setCost(e.target.value)} value={cost} />
                                            </div>
                                            <div className="form-group">
                                                <label>Status</label>
                                                <div onChange={(e) => setStatus(e.target.value)} value={status}>
                                                    {
                                                        (status == 'planned') ? <input type="radio" value="planned" name="status" checked /> : <input type="radio" value="planned" name="status" />
                                                    } Planned
                                                    {(status == 'ongoing') ? <input type="radio" value="ongoing" name="status" checked /> : <input type="radio" value="ongoing" name="status" />} On Going

                                                    {(status == 'completed') ? <input type="radio" value="completed" name="status" checked /> : <input type="radio" value="completed" name="status" />} Completed
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-footer">
                                            <button type="submit" className="btn btn-primary" onClick={save}>Update</button>
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

    )
}

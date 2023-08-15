import React, { useEffect, useState } from 'react'
import Menu from '../Menu'
import Footer from '../Footer'
import axios from 'axios'
import { redirect, useNavigate } from 'react-router-dom'


export default function Maintenance() {
    const navigate = useNavigate();
    const [vehicle, setVehicle] = useState([{ name: '', id: '' }]);
    const [vendor, setVendor] = useState([{ name: '', id: '' }]);
    // const [parts, setParts] = useState([]);
    // const [qty, setQty] = useState('')

    //-----parts table---
    const [partsname, setPartsname] = useState([]);
    const [partslist, setParts] = useState([{ id: '', name: '' }]);
    const [partsid, setPartsid] = useState([])
    const [qty, setQty] = useState([]);


    const [list, setList] = useState([]);
    const [vendorid, setVendorid] = useState('');
    const [vehicleid, setVehicleid] = useState('');
    const [sdate, setSdate] = useState('');
    const [edate, setEdate] = useState('');
    const [details, setDetail] = useState('');
    const [cost, setCost] = useState('');
    const [status, setStatus] = useState('');

    const [msg, setmsg] = useState('');
    //   const [type, settype] = useState('insert');
    //   const [mid, setMid] = useState('');
    const setQtyData = (v, i) => {
        let data = qty
        data[i] = v
        setQty(data)
        console.log(qty)
    }

    const setPartsdata = (v, i) => {
        let data = partsid
        data[i] = v
        setPartsid(data)
        console.log(partsid)
    }

    useEffect(() => {
        let token = localStorage.getItem('token')
        if (token == null) {
            navigate("/");
        }
        //-----vehicle----------
        axios({
            method: 'get',
            url: 'http://fleet.prantiksoft.com/backend/Maintenance/getVehicle',
            responseType: 'json'
        }).then(function (response) {
            setVehicle(response.data.vehicle)
        });

        ////----------Vendor-------
        axios({
            method: 'get',
            url: 'http://fleet.prantiksoft.com/backend/Maintenance/getVendor',
            responseType: 'json'
        }).then(function (response) {
            setVendor(response.data.vendor)
        });
        //-----Parts in Maintenance-------
        axios({
            method: 'get',
            url: 'http://fleet.prantiksoft.com/backend/Maintenance/getParts',
            responseType: 'json'
        }).then(function (response) {
            setPartsname(response.data.parts)
        });
    }, []);

    //-----list show------
    const getMaintenance = () => {
        axios({
            method: 'get',
            url: 'http://fleet.prantiksoft.com/backend/Maintenance/getMaintenance',
            responseType: 'json'
        }).then(function (response) {
            setList(response.data.maintenance)
        });
    }

    useEffect(() => {
        getMaintenance()
    }, []);

    ///-----Appending list----

    const handleremove = index => {
        const parts = [...partslist];
        parts.splice(index, 1);
        setParts(parts);
    }
    const handleaddclick = () => {
        alert('add');
        setParts([...partslist, { id: '', name: '' }])
    }

    //----------Add/insert----------
    const save = () => {

        axios.post('http://fleet.prantiksoft.com/backend/Maintenance/addmaintenance', {
            vendor_id: vendorid,
            vehicle_id: vehicleid,
            start_date: sdate,
            end_date: edate,
            details: details,
            cost: cost,
            status: status,
            parts: partsid,
            qty: qty,

        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        }).then(function (response) {
            let data = response.data;
            setVehicleid('')
            setVendorid('')
            setSdate('')
            setEdate('')
            setDetail('')
            setPartsid('')
            setQty('')
            setCost('')
            setStatus('')
            setmsg(data.msg)
            setTimeout(() => navigate("/list"), 3000);
            // navigate('../maintenance')
            // console.log(data);
        })
    }

    //------edit---------
    const edit_maintenance = (id) => {
        navigate('/edit/' + id)
    }
    //------delete---------
    const deletemaintenance = (id) => {
        axios.post('http://fleet.prantiksoft.com/backend/Maintenance/deletemaintenance', {
            id: id
        },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                }
            }).then(function (response) {
                let data = response.data
                getMaintenance()
            }
            )
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
                                        <h1 className="m-0 ">Add Maintenance</h1>
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
                                                <h3 className="card-title">Maintenance Form</h3>
                                            </div>

                                            {/* <!-- /.card-header --> */}
                                            {/* <!-- form start --> */}
                                            <div className="card-body">
                                                <div className="form-group">
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
                                                <div className="form-group">
                                                    <label>Vendor Name</label>
                                                    <select className='form-control' onChange={(e) => setVendorid(e.target.value)} value={vendorid}>
                                                        <option value=''>Select Vendor</option>
                                                        {vendor.map((d, i) => {
                                                            return (
                                                                <option value={d.id} key={i}>{d.name}</option>
                                                            )
                                                        })}
                                                    </select>
                                                </div>

                                                <div className='row'>
                                                    <div className="col-md-6 form-group">
                                                        <label>Maintenance Start Date</label>
                                                        <input type="date" className="form-control" onChange={(e) => setSdate(e.target.value)} value={sdate} />
                                                    </div>
                                                    <div className="col-md-6 form-group">
                                                        <label>Maintenance End Date</label>
                                                        <input type="date" className="form-control" onChange={(e) => setEdate(e.target.value)} value={edate} />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label>Service Details</label>
                                                    <input type="text" className="form-control" onChange={(e) => setDetail(e.target.value)} value={details} />
                                                </div>

                                                <div className='row'>
                                                    <div className="form-group">
                                                        {/* <label>Parts Name</label>
                                                        */}

                                                        <div>
                                                            <div className='row'>
                                                                <div className='col-md-12'>
                                                                    {partslist.map((d, i) => {
                                                                        return (
                                                                            <div className='row mb-4' key={i}>
                                                                                <div className='form-group col-md-5'>
                                                                                    <label>Parts Name</label>
                                                                                    <select className='form-control' onChange={(e) => setPartsdata(e.target.value, i)}>
                                                                                        <option value=''>Select Parts</option>
                                                                                        {partsname.map((d, i) => {
                                                                                            return (
                                                                                                <option value={d.id} key={i}>{d.name}</option>
                                                                                            )
                                                                                        })}
                                                                                    </select>

                                                                                </div>
                                                                                <div className='form-group col-md-5'>
                                                                                    <label>Quantity</label>
                                                                                    <input type='text' name='qty[]' className='form-control' onChange={(e) => setQtyData(e.target.value, i)} />
                                                                                </div>
                                                                                
                                                                                <div className='form-group col-md-2 mt-4'>
                                                                                    {
                                                                                        partslist.length !== 1 &&
                                                                                        <button className='btn btn-sm btn-secondary mx-1' onClick={() => handleremove(i)}><h5>-</h5></button>
                                                                                    }
                                                                                    {partslist.length - 1 === i &&
                                                                                        <button className='btn btn-sm btn-success mx-1' onClick={handleaddclick}><h5>+</h5></button>
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    })}
                                                                </div>
                                                            </div>
                                                        </div>


                                                    </div>
                                                </div>

                                                <div className='row'>
                                                    <div className=" col-md-4 form-group">
                                                        <label>Total Cost</label>
                                                        <input type="text" className="form-control" onChange={(e) => setCost(e.target.value)} value={cost} />
                                                    </div>
                                                    <div className="col-md-6 offset-md-1 form-group" onChange={(e) => setStatus(e.target.value)} value={status}>
                                                        <label>Maintenance Status</label><br />
                                                        <input type="radio" value="Planned" name="status" /> Planned
                                                        <input type="radio" value="OnGoing" name="status" /> On Going
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

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Footer from '../Footer'
import Menu from '../Menu'

export default function Booking_add ()
{
    const [customers, setcustomers] = useState([{ name: '', id: '' }]);
    const [customerid, setcustomerid] = useState('');
    const [vehicles, setvehicles] = useState([{ name: '', id: '' }]);
    const [vehicleid, setvehicleid] = useState('');
    const [drivers, setdrivers] = useState([{ name: '', id: '' }]);
    // const [driverid, setdriverid] = useState('');
    const [type, settype] = useState('');
    const [startlocation, setstartlocation] = useState('');
    const [endlocation, setendlocation] = useState('');
    const [startdate, setstartdate] = useState('');
    const [enddate, setenddate] = useState('');
    const [aproxkm, setaproxkm] = useState('');
    const [amount, setamount] = useState('');
    const [status, setstatus] = useState('');
    const [ExistingBookings, setExistingBookings] = useState([]);
    const navigate = useNavigate();
    useEffect(() =>
    {
        let token = localStorage.getItem('token')
        if (token == null)
        {
            navigate("/");
        }
        // axios({
        //     method: 'get',
        //     url: 'http://fleet.prantiksoft.com/backend/Tauhid/getCustomer',
        //     responseType: 'json'
        // }).then(function (response)
        // {
        //     setcustomers(response.data.customer)
        // });
        getCustomer();
        getVehicle();
        getDriver();
        getExistingBookings();

    }, []);
    const getCustomer = () =>
    {
        axios({
            method: 'get',
            url: 'http://fleet.prantiksoft.com/backend/Tauhid/getCustomer',
            responseType: 'json'
        }).then(function (response)
        {
            setcustomers(response.data.customer)
        });
    }
    const getVehicle = () =>
    {
        axios({
            method: 'get',
            url: 'http://fleet.prantiksoft.com/backend/Tauhid/getVehicle',
            responseType: 'json'
        }).then(function (response)
        {
            setvehicles(response.data.vehicle)
        });
    }
    const getDriver = () =>
    {
        axios({
            method: 'get',
            url: 'http://fleet.prantiksoft.com/backend/Tauhid/getDriver',
            responseType: 'json'
        }).then(function (response)
        {
            setdrivers(response.data.driver)
        });
    }
    const getExistingBookings = () =>
    {
        axios({
            method: 'get',
            url: 'http://fleet.prantiksoft.com/backend/Tauhid/getExistingBookings',
            responseType: 'json'
        }).then(function (response)
        {
            setExistingBookings(response.data.booking)
            console.log(ExistingBookings)
        });
    }
    const save = () =>
    {
        axios.post('http://fleet.prantiksoft.com/backend/Tauhid/addbooking', {
            customer_id: customerid,
            vehicle_id: vehicleid,
            // driver_id: driverid,
            type: type,
            start_location: startlocation,
            end_location: endlocation,
            start_date: startdate,
            end_date: enddate,
            aprox_km: aproxkm,
            amount: amount,
            status: status
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        }).then(function (response)
        {
            let data = response.data;
            setcustomerid('')
            setvehicleid('')
            // setdriverid('')
            settype('')
            setstartlocation('')
            setendlocation('')
            setstartdate('')
            setenddate('')
            setaproxkm('')
            setamount('')
            setstatus('')
        })

    }
    // const chk = () => {
    //     console.log(customers)
    // }
    return (
        <>
            <div className="hold-transition sidebar-mini">
                <div className="wrapper">
                    <Menu />
                    <div className="content-wrapper">
                        <div className="content-header">
                            <div className="container-fluid">
                                <div className="row mb-2">
                                    <div className="col-sm-6">
                                        <h1 className="m-0">Add Booking Data</h1>
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
                                                <h3 className="card-title">Booking Form</h3>
                                            </div>
                                            {/* <!-- /.card-header --> */ }
                                            {/* <!-- form start --> */ }
                                            <div className="card-body">
                                                <div className='row'>
                                                    <div className='col-md-4'>
                                                        <div className="form-group">
                                                            <label>Customer</label>
                                                            <select className='form-control' onChange={ (e) => setcustomerid(e.target.value) }>
                                                                <option value=''>Select Customer</option>

                                                                { customers.map((d, i) =>
                                                                {
                                                                    return (
                                                                        <option value={ d.id } key={ i }>{ d.name }</option>
                                                                    )
                                                                }) }
                                                            </select>
                                                        </div>
                                                        <div className="form-group">
                                                            <label>Vehicle</label>
                                                            <select className='form-control' onChange={ (e) => setvehicleid(e.target.value) }>
                                                                <option value=''>Select Vehicle</option>

                                                                { vehicles.map((d, i) =>
                                                                {
                                                                    return (
                                                                        <option value={ d.id } key={ i }>{ d.name }</option>
                                                                    )
                                                                }) }
                                                            </select>
                                                        </div>
                                                        <div className="form-group">
                                                            <label>Driver</label>
                                                            <select className='form-control' disabled>
                                                                <option value=''>Assign Driver Later</option>

                                                                { drivers.map((d, i) =>
                                                                {
                                                                    return (
                                                                        <option value={ d.id } key={ i }>{ d.name }</option>
                                                                    )
                                                                }) }
                                                            </select >
                                                        </div>
                                                        <div className="form-group">
                                                            <label>Type</label><br />
                                                            <div className="form-control" onChange={ (e) => settype(e.target.value) } value={ type }>
                                                                <input type="radio" value="Single" name="type" /> Single
                                                                <input type="radio" value="Round" name="type" /> Round
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='col-md-4'>
                                                        <div className="form-group">
                                                            <label>Start Location</label>
                                                            <input type="text" className="form-control" onChange={ (e) => setstartlocation(e.target.value) } value={ startlocation } />
                                                        </div>
                                                        <div className="form-group">
                                                            <label>End Location</label>
                                                            <input type="text" className="form-control" onChange={ (e) => setendlocation(e.target.value) } value={ endlocation } />
                                                        </div>
                                                        <div className="form-group">
                                                            <label>Start Date</label>
                                                            <input type="datetime-local" className="form-control" onChange={(e) => setstartdate(e.target.value) } value={ startdate } />
                                                        </div>
                                                        <div className="form-group">
                                                            <label>End Date</label>
                                                            <input type="datetime-local" className="form-control" onChange={ (e) => setenddate(e.target.value) } value={ enddate } />
                                                        </div>
                                                    </div>
                                                    <div className='col-md-4'>
                                                        <div className="form-group">
                                                            <label>Approx. Km</label>
                                                            <input type="text" className="form-control" onChange={ (e) => setaproxkm(e.target.value) } value={ aproxkm } />
                                                        </div>
                                                        <div className="form-group">
                                                            <label>Amount</label>
                                                            <input type="text" className="form-control" onChange={ (e) => setamount(e.target.value) } value={ amount } />
                                                        </div>
                                                        <div className="form-group">
                                                            <label>Status</label>
                                                            <div className="" onChange={ (e) => setstatus(e.target.value) } value={ status }>
                                                                <input type="radio" value="Yet to Start" name="status" /> Yet to Start &nbsp;
                                                                <input type="radio" value="Completed" name="status" /> Completed &nbsp;
                                                                <input type="radio" value="On Going" name="status" /> On Going &nbsp;
                                                                <input type="radio" value="Cancelled" name="status" /> Cancelled &nbsp;
                                                            </div>
                                                        </div>

                                                        {/* <!-- /.card-body --> */ }

                                                        <div className="card-footer">
                                                            <button type="submit" className="btn btn-primary" onClick={ save }>Submit</button>
                                                        </div>
                                                    </div>
                                                </div>
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
        </>
    )
}

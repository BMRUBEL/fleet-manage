import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import Footer from '../Footer';
import Menu from '../Menu';

export default function Booking_list ()
{
    const [booking, setbooking] = useState([]);
    const navigate = useNavigate();
    useEffect(() =>
    {
        let token = localStorage.getItem('token')
        if (token == null)
        {
            navigate("/");
        }
        getBooking();
    }, []);
    const getBooking = () =>
    {
        axios({
            method: 'get',
            url: 'http://fleet.prantiksoft.com/backend/Tauhid/getBooking',
            responseType: 'json'
        }).then(function (response)
        {
            setbooking(response.data.booking)
        });
    }
    const deletebooking = (id) =>
    {
        axios.post('http://fleet.prantiksoft.com/backend/Tauhid/deletebooking', {
            id: id
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        }).then(function (response)
        {
            let data = response.data;
            getBooking()
        })
    }
    const editbooking = (id) =>
    {
        navigate('/bookingedit/' + id)
        // axios.post('http://fleet.prantiksoft.com/backend/Tauhid/editbooking', {
        //     id: id
        // }, {
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': localStorage.getItem('token')
        //     }
        // }).then(function (response) {
        //     let data = response.data;
        //     console.log(data)
        // })
    }
    const viewbooking = (id) =>
    {
        navigate('/bookingview/' + id)
    }
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
                                        <h1 className="m-0">Manage Booking Data</h1>
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
                                        <div className="card">
                                            <div className="card-header">
                                                <h3 className="card-title">Booking List</h3>&nbsp;
                                                <div className="card-title" style={{ paddingLeft: '20px' }}>
                                                    <NavLink to="/bookingreport"><button type="" className='btn btn-sm btn-outline-primary'>Check Report</button></NavLink>
                                                </div>
                                                <div className="card-tools">
                                                    {/* <div className="input-group input-group-sm" style={{width: 150}}>
                                                        <input type="text" name="table_search" className="form-control float-right" placeholder="Search"/>

                                                            <div className="input-group-append">
                                                                <button type="submit" className="btn btn-default">
                                                                    <i className="fas fa-search"></i>
                                                                </button>
                                                            </div>
                                                    </div> */}
                                                </div>
                                            </div>
                                            {/* <!-- /.card-header --> */ }
                                            <div className="card-body table-responsive p-0">
                                                <table className="table table-hover text-nowrap">
                                                    <thead>
                                                        <tr>
                                                            <th>SL</th>
                                                            <th>Customer</th>
                                                            <th>Vehicle</th>
                                                            {/* <th>Driver</th> */ }
                                                            <th>Trip Start</th>
                                                            <th>Trip End</th>
                                                            <th>Trip Status</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        { booking.map((d, i) =>
                                                        {
                                                            return (
                                                                <tr key={ i }>
                                                                    <td>{ i + 1 }</td>
                                                                    <td>{ d.customername }</td>
                                                                    <td>{ d.vehiclename }</td>
                                                                    {/* <td>{ d.drivername }</td> */ }
                                                                    <td>{ d.start_date }</td>
                                                                    <td>{ d.end_date }</td>
                                                                    <td>{ d.status }</td>
                                                                    <td>
                                                                        <button onClick={ () => editbooking(d.id) } className="btn btn-xs btn-secondary">Assign Driver</button>&nbsp;&nbsp;
                                                                        <button onClick={ () => viewbooking(d.id) } className="btn btn-xs btn-success">View</button>&nbsp;&nbsp;
                                                                        <button onClick={ () => editbooking(d.id) } className="btn btn-xs btn-primary">Edit</button>&nbsp;&nbsp;
                                                                        <button onClick={ () => deletebooking(d.id) } className="btn btn-xs btn-danger">Delete</button>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        }) }
                                                    </tbody>
                                                </table>
                                            </div>
                                            {/* <!-- /.card-body --> */ }
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

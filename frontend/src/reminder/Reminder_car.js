import React, { useEffect, useState } from 'react';
import Menu from '../Menu';
import Footer from '../Footer';

import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Reminder_car = () => {
    const navigate = useNavigate();
    const [vehicle, setvehicle] = useState([{name:'', id:''}]);
    const [vehicles_id, setvehicle_id] = useState('');
    const [date, setdate] = useState('');
    const [message, setmessage] = useState('');
    const [msg, setmsg] = useState('');

    // const getdata = () => {
    //     axios({
    //         method: 'get',
    //         url: 'http://fleet.prantiksoft.com/backend/Reminder',
    //         responseType: 'json'
    //     }).then(function (response) {
    //         setList(response.data.list)
    //     });
    // }

    // useEffect(() => {
    //     getdata()
    // }, []);

    const getVehicle = () => {
        axios({
            method: 'get',
            url: 'http://fleet.prantiksoft.com/backend/Reminder/getvehicle',
            responseType: 'json'
        }).then(function (response) {
            setvehicle(response.data.vehicles)
        });
    }
    useEffect(() => {
        getVehicle()
    }, []);
    // const getReminder = () => {
    //     axios({
    //         method: 'get',
    //         url: 'http://fleet.prantiksoft.com/backend/Reminder/getreminder',
    //         responseType: 'json'
    //     }).then(function (response) {
    //         setvehicle(response.data.vehicle)
    //         // console.log(response.data.vehicle)
    //     });
    // }
    // useEffect(() => {
    //     getReminder()
    // }, []);

    const save = () => {

        axios.post('http://fleet.prantiksoft.com/backend/Reminder/addreminder', {
            // role: role,
            vehicles_id: vehicles_id,
            date: date,
            message: message,
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        }).then(function (response) {
            let data = response.data;
            setmsg(data.msg)
            setvehicle_id('')
            setdate('')
            setmessage('')
            setTimeout(() => setmsg(''), 5000)
            // getdata()
            setTimeout(() => navigate('/reminder_management') )
        })
    }


    const deletereminder = (id) => {
        axios.post('http://fleet.prantiksoft.com/backend/Customers/deletereminder', {
            id: id
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        }).then(function (response) {
            let data = response.data;
            setmsg(data.msg)
            // getdata()
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
                                    <h1 className="m-0">Reminder</h1>
                                </div>
                                <div className="col-sm-6">
                                    <ol className="breadcrumb float-sm-right">
                                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                                        <li className="breadcrumb-item active">Reminder Create</li>
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
                                        <div className="card-header">
                                            <h5 className="m-0">Add New Reminder</h5>
                                        </div>
                                        <div className="card-body">
                                            <h4>{msg}</h4>
                                            <table className='table table-bordered'>
                                                <tbody>

                                                    {/* <tr>
                                                        <th>Role</th>
                                                        <td>
                                                            <select onChange={(e) => setrole(e.target.value)} className='form-control' >
                                                                <option value=''>Select Role</option>

                                                                <option value='admin'>Admin</option>
                                                                <option value='users'>Users</option>
                                                                <option value='drivers'>Drivers</option>

                                                            </select>
                                                        </td>
                                                    </tr> */}
                                                    <tr>
                                                        <th>Vehicle*</th>
                                                        <td>
                                                        
                                                            <select onChange={(e) => setvehicle_id(e.target.value)} className='form-control' >
                                                                <option value=''>Select Vehicle</option>
                                                                {vehicle.map((d, i) =>
                                                                <option value={d.id} key={i}>{d.name}</option>
                                                                )}

                                                            </select>
                                                            
                                                            </td>
                                                            
                                                    </tr>
                                                    <tr>
                                                        <th>Date*</th>
                                                        <td><input type='date' className='form-control' placeholder='Choose reminder date' onChange={(e) => setdate(e.target.value)} value={date} required /></td>
                                                    </tr>
                                                    <tr>
                                                        <th>Message*</th>
                                                        <td><input type='text' className='form-control' placeholder='Message' onChange={(e) => setmessage(e.target.value)} value={message} required /></td>
                                                    </tr>
                                                    
                                                    <tr>
                                                        <td colSpan={2}><input type='submit' className='btn btn-block btn-primary' value="Save" onClick={save} /></td>
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

export default Reminder_car;

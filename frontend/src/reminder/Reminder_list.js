import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from '../Footer';
import Menu from '../Menu';
const Reminder_list=()=>{
    const [data, setList] = useState([]);
    const [reminder, setreminder] = useState([]);
    const [vehicles, setvehicles] = useState([]);
    const [name,setname]= useState('');
    const [date,setdate]= useState('');
    const [message,setmessage]= useState('');
    const [msg, setmsg] = useState('');

    const getReminder = () => {
        axios({
            method: 'get',
            url: 'http://fleet.prantiksoft.com/backend/Reminder/getreminder',
            responseType: 'json'
        }).then(function (response) {

            setreminder(response.data.reminder)
            console.log(response.data.reminder)
        });
    }
    useEffect(() => {
        getReminder()
    }, []);
    const getVehicle = () => {
        axios({
            method: 'get',
            url: 'http://fleet.prantiksoft.com/backend/Reminder/getvehicle',
            responseType: 'json'
        }).then(function (response) {

            setvehicles(response.data.vehicles)
        });
    }

    const deletereminder = (id) => {
        axios.post('http://fleet.prantiksoft.com/backend/Reminder/deletereminder', {
            id: id
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        }).then(function (response) {
            let data = response.data;
            setmsg(data.msg)
            getReminder()
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
                                        <li className="breadcrumb-item active">Reminder List</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="content">
                        <div className="container-fluid">

                            <div className='row'>
                                <div className="col-lg-12">
                                    <div className="card card-primary card-outline">
                                        <div className="card-header">
                                            <h5 className="m-0">Reminder List</h5>
                                        </div>
                                        <div className="card-body">
                                            <table className='table table-bordered'>
                                                <thead>
                                                    <tr>
                                                        <th>SL</th>
                                                        <th>Vehicle	</th>
                                                        <th>Date</th>
                                                        <th>Message</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                 <tbody>
                                                    {reminder.map((d, i) =>
                                                        <tr key={i}>
                                                            <td>{i + 1}</td>
                                                            <td>{d.vehicleName}</td>
                                                            <td>{d.date}</td>
                                                            <td>{d.message}</td>
                                                       
                                                             <td>
                                                                <button className="btn btn-danger" onClick={() => deletereminder(d.id)}>
                                                                <i className="fa fa-trash"></i>
                                                                </button>
                                                                &nbsp;
                                                               
                                                                
                                                            </td> 
                                                        </tr>
                                                    )}
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
export default Reminder_list;


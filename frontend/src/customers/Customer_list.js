import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from '../Footer';
import Menu from '../Menu';

export default function Customer_list() {

    const navigate = useNavigate();
    const [data, setList] = useState([]);
    const [admin, setadmin] = useState([]);
    const [role, setrole] = useState('');
    const [name, setname] = useState('');
    const [phone, setphone] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [address, setaddress] = useState('');
    const [status, setstatus] = useState('');
    const [msg, setmsg] = useState('');
    const [type, settype] = useState('insert');
    const [userID, setid] = useState('');

    const getdata = () => {
        axios({
            method: 'get',
            url: 'http://fleet.prantiksoft.com/backend/Customers',
            responseType: 'json'
        }).then(function (response) {
            setList(response.data.list)
        });
    }

    useEffect(() => {
        getdata()
    }, []);

    const getCustomer = () => {
        axios({
            method: 'get',
            url: 'http://fleet.prantiksoft.com/backend/Customers/getCustomer',
            responseType: 'json'
        }).then(function (response) {
            setadmin(response.data.admin)
        });
    }
    useEffect(() => {
        getCustomer()
    }, []);

    const save = () => {

        axios.post('http://fleet.prantiksoft.com/backend/Customers/addcustomers', {
            role: role,
            name: name,
            phone: phone,
            email: email,
            password: password,
            address: address,
            status: status,
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        }).then(function (response) {
            let data = response.data;
            setmsg(data.msg)
            setrole('')
            setname('')
            setphone('')
            setemail('')
            setpassword('')
            setaddress('')
            setstatus('')
            setTimeout(() => setmsg(''), 5000);
            getdata();
        })
    }


    const deletecustomers = (id) => {
        axios.post('http://fleet.prantiksoft.com/backend/Customers/deletecustomers', {
            id: id
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        }).then(function (response) {
            let data = response.data;
            setmsg(data.msg)
            getdata()
        })
    }

    const editcustomers = (id) => {
        navigate('/customersedit/' + id)

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
                                    <h1 className="m-0">Customers List</h1>
                                </div>
                                <div className="col-sm-6">
                                    <ol className="breadcrumb float-sm-right">
                                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                                        <li className="breadcrumb-item active">Customers List</li>
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
                                            <h5 className="m-0">List</h5>
                                        </div>
                                        <div className="card-body">
                                            <table className='table table-bordered'>
                                                <thead>
                                                    <tr>
                                                        <th>SL</th>
                                                        <th>Name</th>
                                                        <th>Phone</th>
                                                        <th>Email</th>
                                                        <th>Address</th>
                                                        <th>Status</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {data.map((d, i) =>
                                                        <tr key={i}>
                                                            <td>{i + 1}</td>
                                                            <td>{d.name}</td>
                                                            <td>{d.phone}</td>
                                                            <td>{d.email}</td>
                                                            <td>{d.address}</td>
                                                            <td>{d.status}</td>
                                                            <td>
                                                                <button className="btn btn-danger" onClick={() => deletecustomers(d.admin_id)}>Delete</button>
                                                                <button className="btn btn-primary" onClick={() => editcustomers(d.admin_id)}>Edit</button>
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
    )
}

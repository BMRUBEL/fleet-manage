import React, { useEffect, useState } from 'react';
import Menu from '../Menu';
import Footer from '../Footer';

import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Customers = () => {
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
            // role: role,
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
            setTimeout(() => setmsg(''), 5000)
            getdata()
            setTimeout(() => navigate('/customers_management') )
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
                            <div className="row">

                                <div className="col-lg-12">
                                    <div className="card card-primary card-outline">
                                        <div className="card-header">
                                            <h5 className="m-0">Add New Customers</h5>
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
                                                        <th>Name</th>
                                                        <td><input type='text' className='form-control' onChange={(e) => setname(e.target.value)} value={name} required/></td>
                                                    </tr>
                                                    <tr>
                                                        <th>Phone</th>
                                                        <td><input type='text' className='form-control' onChange={(e) => setphone(e.target.value)} value={phone} required /></td>
                                                    </tr>
                                                    <tr>
                                                        <th>Email</th>
                                                        <td><input type='text' className='form-control' onChange={(e) => setemail(e.target.value)} value={email} required /></td>
                                                    </tr>
                                                    <tr>
                                                        <th>Password</th>
                                                        <td><input type='text' className='form-control' onChange={(e) => setpassword(e.target.value)} value={password} required /></td>
                                                    </tr>
                                                    <tr>
                                                        <th>Address</th>
                                                        <td><input type='text' className='form-control' onChange={(e) => setaddress(e.target.value)} value={address} required /></td>
                                                    </tr>
                                                    <tr>
                                                        <th>Status</th>
                                                        <td>

                                                            Active<input type="radio" onChange={(e) => setstatus(e.target.value)} name="status" value="Active" />

                                                            InActive<input type="radio" onChange={(e) => setstatus(e.target.value)} name="status" value="InActive" />
                                                        </td>

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

export default Customers;

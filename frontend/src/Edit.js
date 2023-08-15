import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from './Footer';
import Menu from './Menu';

const Edit = () => {
    const navigate = useNavigate()
    const p = useParams();
    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [pass, setpass] = useState('');
    const [msg, setmsg] = useState('');
    const [userRole, setRole] = useState('');
    useEffect(() => {
        axios.post('http://fleet.prantiksoft.com/backend/User/edituser', {
            id: p.id
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        }).then(function (response) {
            let data = response.data;
            setname(data.user.name)
            setemail(data.user.email)
            setRole(data.user.role)
        })
    }, []);
    const save = () => {
        axios.post('http://fleet.prantiksoft.com/backend/User/updateuser', {
            email: email,
            password: pass,
            name: name,
            role: userRole,
            id: p.id
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        }).then(function (response) {
            let data = response.data;
            setmsg(data.msg)
            setTimeout(() => navigate('/admin'), 5000)

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
                                    <h1 className="m-0">Admin List</h1>
                                </div>
                                <div className="col-sm-6">
                                    <ol className="breadcrumb float-sm-right">
                                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                                        <li className="breadcrumb-item active">Admin List</li>
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
                                            <h5 className="m-0">Add New</h5>
                                        </div>
                                        <div className="card-body">
                                            <h4>{msg}</h4>
                                            <table className='table table-bordered'>
                                                <tbody>
                                                    <tr>
                                                        <th>Role</th>
                                                        <td><select className="form-control" onChange={(e) => setRole(e.target.value)} value={userRole}>
                                                            <option value="admin">Admin</option>
                                                            <option value="driver">Driver</option>
                                                            <option value="users">User</option>

                                                        </select>
                                                        </td>
                                                        {/* <td><input type='text' className='form-control' onChange={(e) => setname(e.target.value)} value={name} /></td> */}
                                                    </tr>
                                                    <tr>
                                                        <th>Name</th>
                                                        <td><input type='text' className='form-control' onChange={(e) => setname(e.target.value)} value={name} /></td>
                                                    </tr>
                                                    <tr>
                                                        <th>Email</th>
                                                        <td><input type='text' className='form-control' onChange={(e) => setemail(e.target.value)} value={email} /></td>
                                                    </tr>
                                                    <tr>
                                                        <th>Password</th>
                                                        <td><input type='password' className='form-control' onChange={(e) => setpass(e.target.value)} value={pass} /></td>
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

export default Edit;

import React, { useEffect, useState } from 'react';
import Menu from '../Menu';
import Footer from '../Footer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const List = () => {
    const navigate = useNavigate();
    const [data, setList] = useState([]);
    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [pass, setpass] = useState('');
    const [msg, setmsg] = useState('');
    const [type, settype] = useState('insert');
    const [userID, setid] = useState('');
    const [userRole, setRole] = useState('');
    const getdata = () => {
        axios({
            method: 'get',
            url: 'http://fleet.prantiksoft.com/backend/User',
            responseType: 'json'
        }).then(function (response) {
            setList(response.data.list)
        });
    }
    useEffect(() => {
        getdata()
    }, []);
    const save = () => {
        if (type == 'insert') {
            axios.post('http://fleet.prantiksoft.com/backend/User/adduser', {
                email: email,
                password: pass,
                name: name,
                role: userRole
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                }
            }).then(function (response) {
                let data = response.data;
                setmsg(data.msg)
                setname('')
                setemail('')
                setpass('')
                setRole('')
                setTimeout(() => setmsg(''), 5000)
                getdata()
            })
        } else {
            axios.post('http://fleet.prantiksoft.com/backend/User/updateuser', {
                email: email,
                password: pass,
                name: name,
                id: userID,
                role: userRole
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                }
            }).then(function (response) {
                let data = response.data;
                setmsg(data.msg)
                setname('')
                setemail('')
                setpass('')
                setRole('')
                settype('insert')
                setid('')
                getdata()
            })
        }
    }

    const deleteuser = (id) => {
        axios.post('http://fleet.prantiksoft.com/backend/User/deleteuser', {
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
    const edituser = (id) => {
        navigate('/edit/' + id)
        //     setid(id)
        //     settype('update')
        //     axios.post('http://fleet.prantiksoft.com/backend/User/edituser', {
        //     id: id
        //   },{
        //     headers: {
        //       'Content-Type': 'application/json',
        //       'Authorization':localStorage.getItem('token')
        //     }
        //   }).then(function (response) {
        //     let data=response.data;
        //     setname(data.user.name)
        //     setemail(data.user.email)
        //   })
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
                                <div className="col-lg-6">
                                    <div className="card card-primary card-outline">
                                        <div className="card-header">
                                            <h5 className="m-0">List</h5>
                                        </div>
                                        <div className="card-body">
                                            <table className='table table-bordered '>
                                                <thead>
                                                    <tr>
                                                        <th>SL</th>
                                                        <th>Role</th>
                                                        <th>Name</th>
                                                        <th>Email</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {data.map((d, i) =>
                                                        <tr key={i}>
                                                            <td>{i + 1}</td>
                                                            <td>{d.role}</td>
                                                            <td>{d.name}</td>
                                                            <td>{d.email}</td>
                                                            <td>
                                                                <i class="fa-sharp fa-solid fa-trash btn btn-danger btn-sm" onClick={() => deleteuser(d.id)}></i>
                                                                <br/>
                                                                
                                                                <i class="fa-sharp fa-solid fa-pen-to-square btn btn-success btn-sm" onClick={() => edituser(d.id)}></i>

                                                            </td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>

                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="card card-primary card-outline">
                                        <div className="card-header">
                                            <h5 className="m-0">Add New</h5>
                                        </div>
                                        <div className="card-body">
                                            <h4>{msg}</h4>
                                            <table className='table table-bordered'>
                                                <tbody>
                                                    <tr>
                                                        <th>Name</th>
                                                        <td><input type='text' className='form-control' onChange={(e) => setname(e.target.value)} value={name} /></td>
                                                    </tr>
                                                    <tr>
                                                        <th>Role</th>
                                                        <td><select className="form-control" onChange={(e) => setRole(e.target.value)} value={userRole}>
                                                            <option value="">Select Role</option>
                                                            <option value="admin">Admin</option>
                                                            <option value="driver">Driver</option>
                                                            <option value="users">User</option>

                                                        </select>
                                                        </td>
                                                        {/* <td><input type='text' className='form-control' onChange={(e) => setname(e.target.value)} value={name} /></td> */}
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

export default List;

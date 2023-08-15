import React, { useEffect, useState } from "react";
import Menu from "../Menu";
import Footer from "../Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Parts = () => {
    const navigate = useNavigate();
    const [data, setParts] = useState([]);
    const [name, setname] = useState('');
    const [details, setdetails] = useState('');
    const [status, setstatus] = useState('');
    const [msg, setmsg] = useState('');
    const [type, settype] = useState('insert');
    const [partsID, setid] = useState('');
    const getdata = () => {
        axios({
            method: 'get',
            url: 'http://fleet.prantiksoft.com/backend/Partsmanage',
            responseType: 'json'
        }).then(function (response) {
            setParts(response.data.parts_list)
        });
    }
    useEffect(() => {
        getdata()
    }, []);

    const save = () => {
        if (type == 'insert') {
            axios.post('http://fleet.prantiksoft.com/backend/Partsmanage/add_parts', {
                name: name,
                details: details,
                status: status
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                }
            }).then(function (response) {
                let data = response.data;
                setmsg(data.msg)
                setname('')
                setdetails('')
                setstatus('')
                getdata()
            })
        } else {
            axios.post('http://fleet.prantiksoft.com/backend/Partsmanage/update_parts', {
                name: name,
                details: details,
                status: status,
                id: partsID
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                }
            }).then(function (response) {
                let data = response.data;
                setmsg(data.msg)
                setname('')
                setdetails('')
                setstatus('')
                settype('insert')
                setid('')
                getdata()
            })

        }
    }

    const edit_parts = (id) => {
        navigate('/parts_edit/' + id)
        //  setid(id)
        //  settype('update')
        //  axios.post('http://fleet.prantiksoft.com/backend/Parts/edit_parts', {
        //      id: id
        //    },{
        //      headers: {
        //        'Content-Type': 'application/json',
        //        'Authorization':localStorage.getItem('token')
        //      }
        //    }).then(function (response) {
        //      let data=response.data;
        //      setname(data.parts.name)
        //      setdetails(data.parts.details)
        //    })

    }

    const delete_parts = (id) => {
        axios.post('http://fleet.prantiksoft.com/backend/Partsmanage/delete_parts', {
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
    return (
        <div className="hold-transition sidebar-mini">
            <div className="wrapper">
                <Menu />
                <div className="content-wrapper">
                    <div className="content-header">
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="col-sm-6">
                                    <h1 className="m-0">Parts Section</h1>
                                </div>
                                <div className="col-sm-6">
                                    <ol className="breadcrumb float-sm-right">
                                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                                        <li className="breadcrumb-item active">Parts List</li>
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
                                            <h5 className="m-0">Add New Parts</h5>
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
                                                        <th>Details</th>
                                                        <td><input type='text' className='form-control' onChange={(e) => setdetails(e.target.value)} value={details} /></td>
                                                    </tr>
                                                    <tr>
                                                        <th>Status</th>
                                                        <td>
                                                            <input type='radio' name='status' onChange={(e) => setstatus(e.target.value)} value='Active' /> Active
                                                            <input type='radio' name='status' onChange={(e) => setstatus(e.target.value)} value='Inactive' /> Inactive
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

                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="card card-primary card-outline">
                                        <div className="card-header">
                                            <h5 className="m-0">List OF Parts</h5>
                                        </div>
                                        <div className="card-body">
                                            <table className='table table-bordered'>
                                                <thead>
                                                    <tr>
                                                        <th>SL</th>
                                                        <th>Name</th>
                                                        <th>Details</th>
                                                        <th>Status</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {data.map((d, i) =>
                                                        <tr key={i}>
                                                            <td>{i + 1}</td>
                                                            <td>{d.name}</td>
                                                            <td>{d.details}</td>
                                                            <td>{d.status}</td>
                                                            <td>
                                                                <button onClick={() => edit_parts(d.id)} className="btn btn-primary btn-xs">Edit</button>
                                                                <button onClick={() => delete_parts(d.id)} className="btn btn-danger btn-xs">Delete</button>
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
export default Parts






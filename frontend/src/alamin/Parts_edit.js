import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Menu from "../Menu";
import Footer from "../Footer";
import axios from "axios";
const Parts_edit = () => {
    const navigate = useNavigate();
    const p = useParams();
    const [name, setname] = useState('');
    const [details, setdetails] = useState('');
    const [status, setstatus] = useState('');
    const [msg, setmsg] = useState('');
    useEffect(() => {
        axios.post('http://fleet.prantiksoft.com/backend/Partsmanage/edit_parts', {
            id: p.id
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        }).then(function (response) {
            let data = response.data;
            setname(data.parts.name)
            setdetails(data.parts.details)
            setstatus(data.parts.status)

        })
    }, []);

    const save = () => {
        axios.post('http://fleet.prantiksoft.com/backend/Partsmanage/update_parts', {
            name: name,
            details: details,
            status: status,
            id: p.id
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        }).then(function (response) {
            let data = response.data;
            navigate('/parts')

        })

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
                                        <h1 className="m-0">Parts Section</h1>
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
                                                <h5 className="m-0">Edit Parts</h5>
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
                                                                {(status == 'Active') ? <>
                                                                    <input type='radio' name='status' onChange={(e) => setstatus(e.target.value)} value={'Active'} checked /> Active
                                                                </> : <>
                                                                    <input type='radio' name='status' onChange={(e) => setstatus(e.target.value)} value={'Active'} /> Active
                                                                </>}

                                                                {(status == 'Inactive') ? <>
                                                                    <input type='radio' name='status' onChange={(e) => setstatus(e.target.value)} value={'Inactive'} checked /> Inactive
                                                                </> : <>
                                                                    <input type='radio' name='status' onChange={(e) => setstatus(e.target.value)} value={'Inactive'}  /> Inactive
                                                                </>}

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
        </>

    );
}
export default Parts_edit;
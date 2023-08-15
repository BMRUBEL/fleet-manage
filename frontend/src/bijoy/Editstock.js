
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Footer from '../Footer';
import Menu from '../Menu';


const Editstock = () => {
    const navigate = useNavigate();
    const [parts, setparts] = useState([]);
    const p = useParams();
    // const [name, setname] = useState('');
    const [partsID, setpartsID] = useState('');
    const [qty, setqty] = useState('');
    const [outDate, setoutDate] = useState('');
    // const [stockID, setstockID] = useState('');
    const [msg, setmsg] = useState('');

    useEffect(() => {
        axios.post('http://fleet.prantiksoft.com/backend/Parts/editparts', {
            id: p.id
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        }).then(function (response) {
            let data = response.data;
            console.log(data.parts.qty)
            // setname(data.parts.name);
            setpartsID(data.parts.parts_id);
            setqty(data.parts.qty);
            setoutDate(data.parts.out_date)
            // setstockID(data.parts.stockID)

        })
    }, []);

    const getdata = () => {
        axios({
            method: 'get',
            url: 'http://fleet.prantiksoft.com/backend/Parts/get_parts',
            responseType: 'json'
        }).then(function (response) {
            setparts(response.data.list)

        });
    }
    useEffect(() => {
        getdata();
    }, []);

    const update = () => {
        axios.post('http://fleet.prantiksoft.com/backend/Parts/updatestockout', {
            id: p.id,
            parts_id: partsID,
            qty: qty,
            out_date: outDate


        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        }).then(function (response) {
            let data = response.data;
            setmsg(data.msg);
            setTimeout(() => navigate('/stock-out'), 3000)

        })
    };


    return (
        <div className="hold-transition sidebar-mini">
            <div className="wrapper">
                <Menu />
                <div className="content-wrapper">
                    <div className="content-header">
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="col-sm-6">
                                    <h1 className="m-0">Edit Stock Out</h1>
                                </div>
                                <div className="col-sm-6">
                                    <ol className="breadcrumb float-sm-right">
                                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                                        <li className="breadcrumb-item active">Edit Stock Out</li>
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
                                            <h5 className="m-0">Edit Stock Entry</h5>
                                        </div>
                                        <div className="card-body">

                                            {msg && (
                                                <div className="alert alert-success" role="alert">
                                                    {msg}
                                                </div>
                                            )}



                                            <table className='table table-bordered'>
                                                <tbody>
                                                    <tr>

                                                        <th>Select item</th>
                                                        <td>
                                                            <select className="form-control" onChange={(e) => setpartsID(e.target.value)} value={partsID}>

                                                                {/* <option value={`${partsID}`}>{name}</option> */}
                                                                {parts.map((d, i) =>
                                                                    <option value={`${d.id}`} key={i}>{d.name}</option>
                                                                )}
                                                            </select>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th>Quantity</th>
                                                        <td><input type='text' className='form-control' onChange={(e) => setqty(e.target.value)} value={qty} /></td>
                                                    </tr>
                                                    <tr>
                                                        <th>Date</th>
                                                        <td><input type='date' className='form-control' onChange={(e) => setoutDate(e.target.value)} value={outDate} /></td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan={2}><input type='submit' className='btn btn-block btn-primary' value="Save" onClick={update} /></td>
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

export default Editstock;

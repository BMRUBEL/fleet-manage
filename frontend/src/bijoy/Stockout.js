import React from 'react';
import Footer from '../Footer';
import Menu from '../Menu';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const Stockout = () => {
    const navigate=useNavigate();
    const [id, setid] = useState('');
    const [qty, setqty] = useState('');
    const [date, setdate] = useState('');
    const [msg, setmsg] = useState('');
    const [parts, setparts] = useState([]);
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

    const save = () => {

        axios.post('http://fleet.prantiksoft.com/backend/Parts/add_stock_out', {
            
            parts_id: id,
            qty: qty,
            out_date: date

        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        }).then(function (response) {
            let data = response.data;
            setmsg(data.msg)
            setid('')
            setqty('')
            setdate('')
            getparts()

        })
    }

    const [stocklist, setstocklist] = useState([]);
    const getparts = () => {
        axios({
            method: 'get',
            url: 'http://fleet.prantiksoft.com/backend/Parts/get_stock_out',
            responseType: 'json'
        }).then(function (response) {
            setstocklist(response.data.stock_out)

        });
    }
    useEffect(() => {
        getparts()
    }, []);

    const deleteparts=(id)=>{
        axios.post('http://fleet.prantiksoft.com/backend/Parts/deleteparts', {
            id: id
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        }).then(function (response) {
            let data = response.data;
            setmsg(data.msg)
            getparts()
        })
    }
    const editparts=(id)=>{
        navigate('/editparts/'+id)
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
                                    <h1 className="m-0">Stock Out Entry</h1>
                                </div>
                                <div className="col-sm-6">
                                    <ol className="breadcrumb float-sm-right">
                                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                                        <li className="breadcrumb-item active">Stock Out</li>
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
                                            <h5 className="m-0">Add New Stock out Entry</h5>
                                        </div>
                                        <div className="card-body">
                                            <h4>{msg}</h4>
                                            <table className='table table-bordered'>
                                                <tbody>
                                                    <tr>

                                                        <th>Select item</th>
                                                        <td>
                                                            <select className="form-control" onChange={(e) => setid(e.target.value)} value={id}>
                                                                <option value="">Select Parts</option>
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
                                                        <td><input type='date' className='form-control' onChange={(e) => setdate(e.target.value)} value={date} /></td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan={2}><input type='submit' className='btn btn-block btn-primary' value="Save" onClick={save} /></td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="card card-primary card-outline">
                                        <div className="card-header">
                                            <h5 className="m-0">List</h5>
                                        </div>
                                        <div className="card-body">
                                            <table className='table table-striped table-bordered table-hover'>
                                                <thead>
                                                    <tr>
                                                        <th>SL</th>
                                                        <th>Name</th>
                                                        <th>Quantity</th>
                                                        <th>Out Date</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {stocklist.map((d,i) =>
                                                        <tr key={i}>
                                                            <td>{i + 1}</td>
                                                            <td>{d.name}</td>
                                                            <td>{d.qty}</td>
                                                            <td>{d.out_date}</td>
                                                            <td>
                                                                <i className="fa-sharp fa-solid fa-trash btn btn-danger btn-sm" onClick={() => deleteparts(d.stockId)}></i>
                                                                <i className="fa-sharp fa-solid fa-pen-to-square btn btn-success btn-sm" style={{marginLeft: '15px'}} onClick={() => editparts(d.stockId)}></i>
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

export default Stockout;

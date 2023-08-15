import React from 'react';
import Footer from '../Footer';
import Menu from '../Menu';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';



const Parts_stock_in = () => {
    const navigate = useNavigate();
    const [partsid, setid] = useState('');
    const [id, setStockid] = useState('');
    const [price, setprice] = useState('');
    const [qty, setqty] = useState('');
    const [date, setdate] = useState('');
    const [msg, setmsg] = useState('');
    const [partsName, setpartsName] = useState([]);
    const p = useParams()

    const getpartsName = () => {
        axios({
            method: 'get',
            url: 'http://fleet.prantiksoft.com/backend/Partsin/get_partsName',
            responseType: 'json'
        }).then(function (response) {
            setpartsName(response.data.Namelist)
            // console.log(response.data.Namelist);
        });
    }
    useEffect(() => {
        getpartsName();
    }, []);

    
    const getOnedata = () => {
        axios.post('http://fleet.prantiksoft.com/backend/Partsin/editGet_stock', {
            id: p.id
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        }).then(function (response) {
            let data = response.data.parts_data;
            setmsg(data.msg);
            setStockid(data.id);
            setid(data.parts_id);
            setprice(data.price);
            setqty(data.qty);
            setdate(data.purchase_date);

        })

    }
    console.log(partsid);

    useEffect(() => {
        getOnedata();

    }, [])

    const Update = () => {
        axios.post('http://fleet.prantiksoft.com/backend/Partsin/update_stock_in', {

            id: id,
            parts_id: partsid,
            price: price,
            qty: qty,
            purchase_date: date

        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        }).then(function (response) {
            let data = response.data;
            setmsg(data.msg);
            navigate('/parts_stock_in');


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
                                    <h1 className="m-0">Parts Stock in</h1>

                                </div>
                                <div className="col-sm-6">
                                    <ol className="breadcrumb float-sm-right">
                                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                                        <li className="breadcrumb-item active">Stock in</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="content">
                        <div className="container-fluid">
                            <div className="row">

                                <div className="col-lg-10">
                                    <div className="card card-primary card-outline">
                                        <div className="card-header">
                                            <h4 className='m-0'>{msg}</h4>
                                        </div>
                                        <div className="card-body">
                                            {/* <h4>{msg}</h4> */}
                                            <table className='table table-bordered'>
                                                <tbody>
                                                    <tr>

                                                        <th>Select item</th>
                                                        <td>
                                                            <select className="form-control" onChange={(e) => setid(e.target.value)} value={partsid}>
                                                                <option value="">Select Parts</option>
                                                                {partsName.map((d, i) =>
                                                                    <option value={`${d.id}`} key={i}>{d.name}</option>
                                                                )}
                                                            </select>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th>Price</th>
                                                        <td>
                                                            <input type='text' className='form-control' onChange={(e) => setprice(e.target.value)} value={price} />
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
                                                        <td colSpan={2}><input type='submit' className='btn btn-block btn-primary' value="Save" onClick={Update} /></td>
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

export default Parts_stock_in;

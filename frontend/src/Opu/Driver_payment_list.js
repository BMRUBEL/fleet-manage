
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer';
import Menu from '../Menu';
import axios from 'axios';

// export default function Driver_payment_list() {
    
    export default function Payment_list() {
        const [payment, setpayment] = useState([]);
        const navigate = useNavigate();
        useEffect(() => {
            let token = localStorage.getItem('token')
            if (token == null) {
                navigate("/");
            }
            getPayment();
            console.log(payment);
        }, []);

        const getPayment = () => {
            axios({
                method:'get',
                url: 'http://fleet.prantiksoft.com/backend/Opu/getPayment',
                responseType:'json'
            }).then(function (response) {
                setpayment(response.data.payment)
                console.log(response.data.payment);
            });
        }
        const deletepayment = (id) => {
            axios.post('http://fleet.prantiksoft.com/backend/Opu/deletepayment', {
                id: id
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                }
            }).then(function (response) {
                let data = response.data;
                getPayment();
            })
        }
        const editpayment= (id) => {
            navigate('/paymentedit/'+id)
            // axios.post('http://fleet.prantiksoft.com/backend/Tauhid/editbooking', {
            //     id: id
            // }, {
            //     headers: {
            //         'Content-Type': 'application/json',
            //         'Authorization': localStorage.getItem('token')
            //     }
            // }).then(function (response) {
            //     let data = response.data;
            //     console.log(data)
            // })
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
                                        <h1 className="m-0">Manage Driver Payment Data</h1>
                                    </div>
                                    <div className="col-sm-6">
                                        <ol className="breadcrumb float-sm-right">
                                            <li className="breadcrumb-item"><a href="#">Home</a></li>
                                            <li className="breadcrumb-item active">Starter Page</li>
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="content">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="card">
                                            <div className="card-header">
                                                <h3 className="card-title">Payment List</h3>

                                                <div className="card-tools">
                                                    {/* <div className="input-group input-group-sm" style={{width: 150}}>
                                                        <input type="text" name="table_search" className="form-control float-right" placeholder="Search"/>

                                                            <div className="input-group-append">
                                                                <button type="submit" className="btn btn-default">
                                                                    <i className="fas fa-search"></i>
                                                                </button>
                                                            </div>
                                                    </div> */}
                                                </div>
                                            </div>
                                            {/* <!-- /.card-header --> */}
                                            <div className="card-body table-responsive p-0">
                                                <table className="table table-hover text-nowrap">
                                                    <thead>
                                                        <tr>
                                                            <th>SL</th>
                                                            <th>Driver</th>
                                                            <th>Travel Date</th>
                                                            <th>Amount</th>
                                                            <th>Remarks</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {payment?.map((f, i) =>
                                                            <tr key={i}>
                                                                <td>{i + 1}</td>
                                                                <td>{f.drivername}</td>
                                                                <td>{f.trans_date}</td>
                                                                <td>{f.amount}</td>
                                                                <td>{f.remarks}</td>
                                                                <td>
                                                                <button onClick={() => editpayment(f.id)} className="btn btn-xs btn-primary">Edit</button>
                                                                <button onClick={() => deletepayment(f.id)} className="btn btn-xs btn-danger">Delete</button>
                                                                </td>
                                                            </tr>
                                                        )} 
                                                    </tbody>
                                                </table>
                                            </div>
                                            {/* <!-- /.card-body --> */}
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
    )
}

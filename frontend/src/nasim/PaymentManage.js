import axios from "axios";
import Menu from "../Menu";
import Footer from "../Footer";
import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from "react-router-dom";


export default function PaymentManage() {

    const [Vnm, setVehi] = useState([]);
    const [Vname, setVehiNM] = useState('');
    const [email, seteDate] = useState('');
    const [amnt, setAmnt] = useState('');
    const [rmRk, setRmrk] = useState('');
    const [typ_e, setType] = useState('');
    const [msg, setmsg] = useState('');

    const getdata = () => {
        axios({
            method: 'get',
            url: 'http://fleet.prantiksoft.com/backend/Payment_c/VehicleName',
            responseType: 'json'
        }).then(function (response) {
            let VnmN = response.data.vehicl;
            setVehi(VnmN);
        });
    }

    useEffect(() => {
        getdata();
    }, []);

    const navigate = useNavigate();
    useEffect(() => {
        let token = localStorage.getItem('token')
        if (token == null) {
            navigate("/");
        }
    }, []);

    const save = () => {
        axios.post('http://fleet.prantiksoft.com/backend/Payment_c/saveVehi', {

            vehicle_id: Vname,
            trans_date: email,
            amount: amnt,
            remarks: rmRk,
            type: typ_e
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        }).then(function (response) {
            let data = response.data;
            setmsg(data.msg);
            setVehiNM(data.msg);
            seteDate('');
            setRmrk('');
            setAmnt('');
            setType('');
            getPmnt('');
        })
    }

    const [pmnts, setPmnts] = useState([]);
    const getPmnt = () => {
        axios({
            method: 'get',
            url: 'http://fleet.prantiksoft.com/backend/Payment_c/pmntGet',
            responseType: 'json'
        }).then(function (response) {
            let pmnt = response.data.pmnts;
            setPmnts(pmnt);
        });
    }

    useEffect(() => {
        getPmnt();
    }, []);


    const deletePemnt = (id) => {
        axios.post('http://fleet.prantiksoft.com/backend/Payment_c/deletPmnt', {
            id: id
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        }).then(function (response) {
            let data = response.data;
            setmsg(data.msg);
            getPmnt();
        })

    }


    const editPemnt = (id) => {
        navigate('/edit_payment/' + id)

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
                                    <h1 className="m-0">Starter Page</h1>
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
                            


                                <div className="col-12">
                                    <div className="card card-primary card-outline">
                                        <div className="card-header">
                                            <h5 className="m-0">Payment Expense List</h5>
                                        </div>
                                        <div className="card-body">
                                            <table className='table table-bordered table-responsive'>
                                                <thead>
                                                    <tr>
                                                        <th>SL</th>
                                                        <th>Vehicle Name</th>
                                                        <th>Tranjection Date</th>
                                                        <th>Amount</th>
                                                        <th>Remerks</th>
                                                        <th>Type</th>
                                                        <th colSpan={2}>Action</th>
                                                    </tr>
                                                </thead>

                                                <tbody>
                                                    {pmnts.map((d, i) =>

                                                        <tr key={i}>
                                                            <td>{i + 1}</td>
                                                            <td>{d.name}</td>
                                                            <td>{d.trans_date}</td>
                                                            <td>{d.amount}</td>
                                                            <td>{d.remarks}</td>
                                                            <td>{d.type}</td>
                                                            <td>
                                                                <button className='btn btn-primary btn-sm' onClick={() => editPemnt(d.id)}  >Edit</button>

                                                            </td>
                                                            <td>
                                                                <button className='btn btn-danger btn-sm' onClick={() => deletePemnt(d.id)}  >Delete</button>
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
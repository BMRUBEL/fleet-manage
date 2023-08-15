
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer';
import Menu from '../Menu';

export default function Addinl_cost() {

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
            setVehi(VnmN)
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
            getPmnt();
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
           console.log(pmnt);
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

    // const editPemnt = (id) => {
    //     axios.post('http://fleet.prantiksoft.com/backend/Payment_c/editPmnt', {
    //         id: id
    //     }, {
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': localStorage.getItem('token')
    //         }
    //     }).then(function (response) {
    //         let data = response.data;
    //         setmsg(data.msg)
    //         getdata()
    //     }
    //     )

    // }

    const editPemnt = (id) => {
        navigate('/editpay/' + id );
        // setid(id)
        // settype('update')
        // axios.post('http://fleet.prantiksoft.com/backend/User/edituser', {
        //     id: id
        // }, {
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': localStorage.getItem('token')
        //     }
        // }).then(function (response) {
        //     let data = response.data;
        //     setname(data.user.name)
        //     setemail(data.user.email)
        // })
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
                                    <h1 className="m-0">Additional Expense</h1>
                                </div>
                                <div className="col-sm-6">
                                    <ol className="breadcrumb float-sm-right">
                                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                                        <li className="breadcrumb-item active">Add Expense</li>
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
                                            <h5 className="m-0">Add Expense</h5>
                                        </div>
                                        <div className="card-body">
                                            <h4>{msg}</h4>
                                            <table className='table table-bordered'>
                                                <tbody>
                                                    <tr>
                                                        <th>Vehicle Name</th>
                                                        <td>
                                                            <select className='form-control' onChange={(e) => setVehiNM(e.target.value)} value={Vname} >
                                                                <option value='' key=''>Select One</option>
                                                                {Vnm.map((d, i) =>
                                                                    <option value={`${d.id}`} key={i} >{d.name} </option>
                                                                )}
                                                            </select>

                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th>Transjection date</th>
                                                        <td><input type='date' className='form-control' value="" onChange={(e) => seteDate(e.target.value)} value={email} /></td>
                                                    </tr>
                                                    <tr>
                                                        <th>Amount</th>
                                                        <td><input type='number' className='form-control' value="" onChange={(e) => setAmnt(e.target.value)} value={amnt} /></td>
                                                    </tr>
                                                    <tr>
                                                        <th>Remarks</th>
                                                        <td><input type='text' className='form-control' value="" onChange={(e) => setRmrk(e.target.value)} value={rmRk} /></td>
                                                    </tr>
                                                    <tr>
                                                        <th>Type</th>
                                                        <td>
                                                            {/* <input type="radio" id="html" name="fav_language" value={'income'} onChange={(e) => setType(e.target.value)} />
                                                            <label >Income</label> */}
                                                            <input type="radio" id="html" name="fav_language" value={'expense'} onChange={(e) => setType(e.target.value)} />
                                                            <label >Expense</label><br />
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
                                <div className="col-lg-12">
                                    <div className="card card-primary card-outline">
                                        <div className="card-header">
                                            <h5 className="m-0">Payment Expense List</h5>
                                        </div>
                                        <div className="card-body">
                                            <table className='table table-bordered'>
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
                                                                <button className='btn btn-primary btn-sm' onClick={() => editPemnt(d.id)}  > Edit</button>

                                                            </td>
                                                            <td>
                                                                <button className='btn btn-danger btn-sm' onClick={() => deletePemnt(d.id)}  > Delete</button>
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

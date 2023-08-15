
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer';
import Menu from '../Menu';

export default function Payment() {

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


    // if(!Vname||!email||){

    // }else{

    // }
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
                                            <h5 className="m-0">Add New</h5>
                                        </div>
                                        <div className="card-body row">
                                            <div className='form-control'>
                                                <h4 style={{textAlign:'center', color: 'green' }} >{msg}</h4>
                                            </div>

                                            <div className='col-6'>
                                                <div>
                                                    <label>Vehicle Name</label>
                                                    <select className='form-control' onChange={(e) => setVehiNM(e.target.value)} value={Vname} >
                                                        <option value='' key=''>Select One</option>
                                                        {Vnm.map((d, i) =>
                                                            <option value={`${d.id}`} key={i} >{d.name} </option>
                                                        )}
                                                    </select>
                                                </div>
                                                <div>
                                                    <label>Transjection Date</label>
                                                    <input type='date' className='form-control' onChange={(e) => seteDate(e.target.value)} value={email} />
                                                </div>
                                                <div>
                                                    <label>Amount</label>
                                                    <input type='number' className='form-control' onChange={(e) => setAmnt(e.target.value)} value={amnt} />
                                                </div>
                                            </div>

                                            <div className='col-6'>
                                                <div>
                                                    <label>Remarks</label>
                                                    <input type='text' className='form-control' onChange={(e) => setRmrk(e.target.value)} value={rmRk} />
                                                </div>

                                                <div>
                                                    <label>Type</label>
                                                    <div>
                                                        <input type="radio" id="html" name="fav_language" value={'income'} onChange={(e) => setType(e.target.value)} />
                                                        <label for='html' >Income</label>
                                                        <input type="radio" id="htmls" name="fav_language" value={'expense'} onChange={(e) => setType(e.target.value)} />
                                                        <label for='htmls' >Expense</label><br/>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div>
                                                        <label></label>
                                                        <input type='submit' className='btn btn-block btn-primary' value="Save" onClick={save} />
                                                    </div>
                                                </div>
                                            </div>

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

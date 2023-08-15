import React, { useEffect, useState } from 'react';
import Footer from '../Footer';
import Menu from '../Menu';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Stockdetails = () => {
    const p = useParams();
    const [startDate, setstartDate] = useState('');
    const [endDate, setendDate] = useState('');
    const [partdetails, setpartdetails] = useState([]);
    useEffect(() => {
        axios.post('http://fleet.prantiksoft.com/backend/Parts/stockDetails', {
            id: p.id,
            startDate: startDate,
            endDate: endDate,
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        }).then(function (response) {
            let data = response.data;
            console.log(data.stockdetails);
            setpartdetails(data.stockdetails)

        })
    }, []);
    const search = () => {
        axios.post('http://fleet.prantiksoft.com/backend/Parts/stockDetails', {
            id: p.id,
            startDate: startDate,
            endDate: endDate,
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        }).then(function (response) {
            let data = response.data.stockdetails;
            console.log(data);
            setpartdetails(data)

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
                                    <h1 className="m-0">Parts Inventory</h1>
                                </div>
                                <div className="col-sm-6">
                                    <ol className="breadcrumb float-sm-right">
                                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                                        <li className="breadcrumb-item active">Parts Inventory Details</li>
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
                                        <div className="card-header form-inline">
                                            <label>From</label>&nbsp;
                                            <input type="date" className="m-0 form-control col-lg-2" onChange={(e) => setstartDate(e.target.value)} value={startDate} />&nbsp;&nbsp;&nbsp;
                                            <label>To</label>&nbsp;
                                            <input type="date" className="m-0 form-control col-lg-2" onChange={(e) => setendDate(e.target.value)} value={endDate} />
                                            <button onClick={search}>Search</button>
                                        </div>
                                        <div className="card-body">
                                            <table className='table table-striped table-bordered table-hover'>
                                                <thead>
                                                    <tr>
                                                        <th>SL</th>
                                                        <th>date</th>
                                                        {/* <th>opening stock</th> */}
                                                        <th>Stock in</th>
                                                        <th>stock out</th>
                                                        <th>Maintanence</th>
                                                        {/* <th>Closing stock</th> */}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                {partdetails.map((d,t)=>{
                                                    return (
                                                        <tr key={t}>
                                                            <td>{t+1}</td>
                                                            <td>{d.date}</td>
                                                            <td>{d.in}</td>
                                                            <td>{d.out}</td>
                                                            <td>{d.main}</td>
                                                        </tr>
                                                    )
                                                })}
                                                

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

export default Stockdetails;

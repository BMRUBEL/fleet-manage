import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Footer from '../Footer'
import Menu from '../Menu'

export default function Booking_edit ()
{
    const navigate = useNavigate();
    const p = useParams();
    // const [customers, setcustomers] = useState([{ name: '', id: '' }]);
    // const [customerid, setcustomerid] = useState('');
    // const [vehicles, setvehicles] = useState([{ name: '', id: '' }]);
    // const [vehicleid, setvehicleid] = useState('');
    // const [drivers, setdrivers] = useState([{ name: '', id: '' }]);
    // const [driverid, setdriverid] = useState('');
    // const [type, settype] = useState('');
    // const [startlocation, setstartlocation] = useState('');
    // const [endlocation, setendlocation] = useState('');
    // const [startdate, setstartdate] = useState('');
    // const [enddate, setenddate] = useState('');
    // const [aproxkm, setaproxkm] = useState('');
    // const [amount, setamount] = useState('');
    // const [status, setstatus] = useState('');

    const [drivers, setdrivers] = useState([{ name: '', id: '' }]);
    const [driverid, setdriverid] = useState('');
    const [transdate, settransdate] = useState('');
    const [amount, setamount] = useState('');
    const [remarks, setremarks] = useState('');

    useEffect(() =>
    {
        axios.post('http://fleet.prantiksoft.com/backend/Opu/editpayment', {
            id: p.id
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        }).then(function (response)
        {
            let data = response.data;
            setdriverid(data.payment.driver_id)
            settransdate(data.payment.trans_date)
            setamount(data.payment.amount)
            setremarks(data.payment.remarks)
         

        });
        getDriver();
    }, []);
   
    
    const getDriver = () =>
    {
        axios({
            method: 'get',
            url: 'http://fleet.prantiksoft.com/backend/Opu/getDriver',
            responseType: 'json'
        }).then(function (response)
        {
            setdrivers(response.data.driver)
        });
    }
    const save = () =>
    {
        axios.post('http://fleet.prantiksoft.com/backend/Opu/updatepayment', {
            id: p.id,
            driver_id: driverid,
            trans_date: transdate,
            amount: amount,
            remarks: remarks
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        }).then(function (response)
        {
            let data = response.data;
            navigate('/driverpaymentlist');
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
                                        <h1 className="m-0">Add Driver Payments</h1>
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
                                        <div className="card card-primary">
                                            <div className="card-header">
                                                <h3 className="card-title">Payment Form</h3>
                                            </div>
                                            {/* <!-- /.card-header --> */}
                                            {/* <!-- form start --> */}
                                            <div className="card-body">
                                                <div className=''>
                                                    <div className=''>
                                                        {/* <div className="form-group">
                                                            <label>Customer</label>
                                                            
                                                        </div>
                                                        <div className="form-group">
                                                            <label>Vehicle</label>
                                                            
                                                        </div> */}
                                                        <div className="form-group">
                                                            <label>Driver</label>
                                                            <select className='form-control' onChange={ (e) => setdriverid(e.target.value)}value={driverid}>
                                                                <option value=''>Select Driver</option>

                                                                { drivers.map((d, i) =>
                                                                {
                                                                    return (
                                                                        <option value={ d.id } key={ i }>{ d.name }</option>
                                                                    )
                                                                }) }
                                                            </select>
                                                        </div>
                                                        {/* <div className="form-group">
                                                            <label>Type</label><br />
                                                            
                                                        </div> */}
                                                    </div>
                                                    <div className=''>
                                                        <div className="form-group">
                                                            <label>Transportation Date</label>
                                                            <input type="date" className="form-control" onChange={ (e) => settransdate(e.target.value) } value={ transdate }/>
                                                        </div>
                                                        <div className="form-group">
                                                            <label>Amount</label>
                                                            <input type="text" className="form-control" onChange={ (e) => setamount(e.target.value) } value={ amount }/>
                                                        </div>
                                                        <div className="form-group">
                                                            <label>Remarks</label>
                                                            <textarea className="form-control" rows="3" onChange={ (e) => setremarks(e.target.value) } value={ remarks } placeholder="Enter ..."></textarea>
                                                        </div>
                                                        {/* <div className="form-group">
                                                            <label>End Date</label>
                                                            
                                                        </div> */}
                                                    </div>
                                                    <div className=''>
                                                        {/* <div className="form-group">
                                                            <label>Approx. Km</label>
                                                            
                                                        </div>
                                                        <div className="form-group">
                                                            <label>Amount</label>
                                                            
                                                        </div>
                                                        <div className="form-group">
                                                            <label>Status</label>
                                                            
                                                        </div> */}

                                                        {/* <!-- /.card-body --> */}

                                                        <div className="card-footer">
                                                            <button type="submit" className="btn btn-primary" onClick={ save }>Submit</button>
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
        </>
    )
}

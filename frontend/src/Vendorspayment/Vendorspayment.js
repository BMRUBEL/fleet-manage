import React, { useEffect, useState } from 'react'
import Menu from '../Menu'
import Footer from '../Footer'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Vendor_payments() {
const navigate = useNavigate();
    const [vendors, setVendor] = useState([]);
    const [vendorid, setVendorid] = useState('');
    const [selectedVendor, setSelectvendor] = useState('');

    const [cost, setCost] = useState('');
    const [paidamount, setPaidamount] = useState('');
    const [date, setDate] = useState('');
    const [msg, setmsg]=useState('');

    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://fleet.prantiksoft.com/backend/Vendorspayment/getVendorspayment',
            responseType: 'json'
        }).then(function (response) {
            setVendor(response.data.payment)
            console.log(response.data.payment)
        });
    }, []);

    const handleVendorSelect = (vendor_id) => {
        setVendorid(vendor_id)
        // const selectedVendorName = event.target.value;
        // setSelectvendor(selectedVendorName);

        // // Find the selected vendor in the data and retrieve the total_cost
        const selectedVendor = vendors.find(
            (vendor) => vendor.id === vendor_id
        );

        if (selectedVendor) {
            setCost(selectedVendor.due);
        } else {
            setCost('');
        }
    };



    //----------Add/insert----------
    const save = () => {

        axios.post('http://fleet.prantiksoft.com/backend/vendorspayment/addvendorpayment', {
            vendor_id: vendorid,
            payment_date: date,
            paid_amount: paidamount,

        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        }).then(function (response) {
            let data = response.data;
            setVendorid('')
            setPaidamount('')
            setDate('')
            setSelectvendor('')
            setmsg(data.msg)
            setTimeout(()=> navigate("/paymentlist"),3000)
            console.log(data);
        })
    }

    //------edit---------
    // const edit_maintenance = (id) => {
    //     navigate('/edit/' + id)
    // }
    //------delete---------
    // const deletemaintenance = (id) => {
    //     axios.post('http://fleet.prantiksoft.com/backend/vendorspayment/deletemaintenance', {
    //         id: id
    //     },
    //         {
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': localStorage.getItem('token')
    //             }
    //         }).then(function (response) {
    //             let data = response.data
    //             getMaintenance()
    //         }
    //         )
    // }

    return (
        <div>
            <div className="hold-transition sidebar-mini">
                <div className="wrapper">
                    <Menu />
                    <div className="content-wrapper">
                        <div className="content-header">
                            <div className="container-fluid">
                                <div className="row mb-2 align-items-center">
                                    <div className="col-sm-6 ">
                                        <h1 className="m-0 ">Vendors Payment</h1>
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
                                    <div className="col-md-6 offset-md-3">
                                        <div className="card card-primary">
                                            <div className="card-header">
                                                <h3 className="card-title">Payement Form</h3>
                                            </div>

                                            {/* <!-- /.card-header --> */}
                                            {/* <!-- form start --> */}
                                            <div className="card-body">

                                                <div className="form-group">
                                                    <label>Select Vendor:</label>
                                                    <select value={selectedVendor} onChange={(e) => handleVendorSelect(e.target.value)}  className="form-control">
                                                        <option value="">Select</option>
                                                        {vendors.map((vendor) => (
                                                            <option key={vendor.id} value={vendor.id}>
                                                                {vendor.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <br />
                                                <div className="form-group">
                                                    <label>Due Amount:</label>
                                                    <input type="text" className="form-control" value={cost} readOnly />

                                                </div>

                                                <div className="form-group">
                                                    <label>Paid Amount</label>
                                                    <input type="text" className="form-control" onChange={(e) => setPaidamount(e.target.value)} value={paidamount} />
                                                </div>
                                                <div className="form-group">
                                                    <label>Date</label>
                                                    <input type="date" className="form-control" onChange={(e) => setDate(e.target.value)} value={date} />
                                                </div>


                                                <div className="form-group">
                                                    <button type="submit" className="btn btn-block btn-primary" onClick={save}>Submit</button>

                                                </div> 
                                            <h2>{msg}</h2>
                                            </div>










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
       
    )
}

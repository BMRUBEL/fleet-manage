import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Footer from '../Footer';
import Menu from '../Menu';

export default function Paymentlist() {

    const [list, setList]=useState([]);

    const getPayment=() =>{
        axios({
            method: 'get',
            url: 'http://fleet.prantiksoft.com/backend/Vendorspayment/getpayment',
            responseType: 'json'
        }).then(function (response) {
            setList(response.data.list)
            console.log(response.data.list)
        });

      
    }
    useEffect(()=>{
        getPayment()
   }, []);


  return (
    <div>
    <div className="hold-transition sidebar-mini">
        <div className="wrapper">
            <Menu />
            <div className="content-wrapper">
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                               
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                                    <li className="breadcrumb-item active">Admin List</li>
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
                                        <h4 className="m-0">Vendor List</h4>
                                    </div>
                                    <div className="card-body">
                                        <table className='table table-bordered'>
                                            <thead>
                                                <tr>
                                                    <th>SL</th>
                                                    <th>Name</th>
                                                    <th>Paid Amount</th>
                                                    <th>Payment Date</th>
                                                    <th></th>
                                                    <th colSpan="2">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {list.map((d, i) =>
                                                    <tr key={i}>
                                                        <td>{i + 1}</td>
                                                        <td>{d.vendor}</td>
                                                        <td>{d.paid_amount}</td>
                                                        <td>{d.payment_date}</td>
                                                       

                                                       <td><button class="btn btn-danger" >Delete</button></td> 

                                                        <td><button 
                                                        class="btn btn-success">Edit</button></td>
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
</div>
  )
}

import React, { useEffect, useState } from 'react';
import Footer from '../Footer';
import Menu from '../Menu';
import axios from 'axios';

export default function Booking_report ()
{

    const [startDate, setstartDate] = useState('');
    const [endDate, setendDate] = useState('');
    const [bookingdetails, setbookingdetails] = useState([]);
    useEffect(() =>
    {
        axios.post('http://fleet.prantiksoft.com/backend/Tauhid/bookingreport', {
            startDate: startDate,
            endDate: endDate,
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        }).then(function (response)
        {
            let data = response.data;
            console.log(data.bookDetails);
            setbookingdetails(data.bookDetails);

        })
    }, []);
    const search = () =>
    {
        axios.post('http://fleet.prantiksoft.com/backend/Tauhid/bookingreport', {
            startDate: startDate,
            endDate: endDate,
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        }).then(function (response)
        {
            let data = response.data;
            // console.log(data);
            // setpartdetails(data)
            setbookingdetails(data.bookDetails);
            console.log(data.bookDetails);

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
                                        <h1 className="m-0">Booking Report</h1>
                                    </div>
                                    <div className="col-sm-6">
                                        <ol className="breadcrumb float-sm-right">
                                            <li className="breadcrumb-item"><a href="#">Home</a></li>
                                            <li className="breadcrumb-item active">Booking Report</li>
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
                                                <input type="date" className="m-0 form-control col-lg-2" onChange={ (e) => setstartDate(e.target.value) } value={ startDate } />&nbsp;&nbsp;&nbsp;
                                                <label>To</label>&nbsp;
                                                <input type="date" className="m-0 form-control col-lg-2" onChange={ (e) => setendDate(e.target.value) } value={ endDate } />&nbsp;&nbsp;&nbsp;
                                                <button className='btn btn-md btn-primary' onClick={ search }>Generate Report</button>
                                            </div>
                                            <div className="card-body">
                                                <table className='table table-striped table-bordered table-hover'>
                                                    <thead>
                                                        <tr>
                                                            {/* <th>SL</th> */}
                                                            <th>Customer</th>
                                                            <th>Vehicle</th>
                                                            <th>Driver</th>
                                                            <th>Start</th>
                                                            <th>End</th>
                                                            <th>Starting Date</th>
                                                            <th>Amount</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {/* {bookingdetails.map((d, i) => {

                                                            return (
                                                            <tr key={i}>
                                                                <td>{i+1}</td>
                                                                <td>{(d[0])?d[0].customername:''}</td>
                                                                <td>{(d[0])?d[0].vehiclename:''}</td>
                                                                <td>{(d[0])?d[0].drivername:''}</td>
                                                                <td>{(d[0])?d[0].start_location:''}</td>
                                                                <td>{(d[0])?d[0].end_location:''}</td>
                                                                <td>{(d[0])?d[0].start_date:''}</td>
                                                                <td>{(d[0])?d[0].amount:''}</td>
                                                            </tr>
                                                            )

                                                        })} */}

                                                        { bookingdetails.map((d, i) =>
                                                        {
                                                            return d.map((booking, index) => (
                                                                <tr key={ index }>
                                                                    {/* <td>{ i + 1 }</td> */}
                                                                    <td>{ booking.customername }</td>
                                                                    <td>{ booking.vehiclename }</td>
                                                                    <td>{ booking.drivername }</td>
                                                                    <td>{ booking.start_location }</td>
                                                                    <td>{ booking.end_location }</td>
                                                                    <td>{ booking.start_date }</td>
                                                                    <td>{ booking.amount }</td>
                                                                </tr>
                                                            ));
                                                        }) }


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
        </>
    )
}

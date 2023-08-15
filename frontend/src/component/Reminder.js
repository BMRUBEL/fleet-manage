import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Menu from '../Menu';
import axios from 'axios';
import Footer from '../Footer';

export default function Reminder() {

    const navigate = useNavigate();
    const [list, setList] = useState({ "reminder": {} });
    const [date, setDate] = useState([]);

    const getReminder = () => {

        axios({
            method: 'get',
            url: 'http://fleet.prantiksoft.com/backend/Maintenance/getreminder',
            responseType: 'json'
        }).then(function (response) {
            setList(response.data.reminder)
            console.log(response.data.reminder)


        });

    }

    useEffect(() => {
        getReminder()
    }, []);

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
                                        <h1 className="m-0 ">Reminder List</h1>
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
                                        <div className="card card-primary card-outline">
                                            <div className="card-header">
                                                <h5 className="m-0">List</h5>
                                            </div>
                                            <div className="card-body">
                                                <table className='table table-bordered '>
                                                    <thead>
                                                        <tr>
                                                            <th>SL</th>
                                                            <th>Car Name</th>
                                                            <th>Car Number</th>
                                                            <th>Oil Change Date</th>
                                                            <th>Message</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {Object.keys(list).map((d, i) => {
                                                            const item = list[d]
                                                            let oilChangeMessage;
                                                            if (item.date_chan < 0) {
                                                                oilChangeMessage = <div className='bg-dark font-weight-bold' style={{ color: 'red', fontSize: '16px', padding: '7px' }}>
                                                                    <div>{"Engine oil Expired"}</div>
                                                                </div>;
                                                            } else if (item.date_chan == 0) {
                                                                oilChangeMessage = <div className='bg-danger font-weight-bold' style={{ color: 'white', fontSize: '16px', padding: '7px' }}>
                                                                    <div>{"You have to change your oil within 11:59 pm ( Today ) "}</div>
                                                                </div>;
                                                            }else if(item.date_chan <= 3){
                                                                oilChangeMessage = <div className='bg-danger font-weight-bold' style={{ color: 'white', fontSize: '16px', padding: '7px' }}>
                                                                <div>{"You have to change your oil within " + item.date_chan + " days."}</div>
                                                            </div>;
                                                            }
                                                            else if (item.date_chan <= 7) {
                                                                oilChangeMessage = <div className='bg-warning font-weight-bold' style={{ color: 'white', fontSize: '16px', padding: '7px' }}>
                                                                    <div>{"You have to change your oil within " + item.date_chan + " days."}</div>
                                                                </div>;
                                                            } else {
                                                                oilChangeMessage = <div>
                                                                    <div className='font-weight-bold'>{"You have to change your oil within " + item.date_chan + " days."}</div>
                                                                </div>;
                                                            }

                                                            return (
                                                                <tr key={i}>
                                                                    <td>{i + 1}</td>
                                                                    <td>{item.name}</td>
                                                                    <td>{item.registration_no}</td>
                                                                    <td className=''>{item.date}</td>
                                                                    <td>{oilChangeMessage}</td>

                                                                </tr>
                                                            );
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

        </div>
    )
}

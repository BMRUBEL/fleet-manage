import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer';
import Menu from '../Menu';


const Availablecar = () => {
    const navigate = useNavigate();
    const [List, setList] = useState([]);
    const [msg, setmsg] = useState('');
    const getdata = () => {
        axios({
            method: 'get',
            url: 'http://fleet.prantiksoft.com/backend/Parts/availableCar',
            responseType: 'json'
        }).then(function (response) {

            setList(response.data.list)
            console.log(response.data.list)
        });
    }
    useEffect(() => {
        let token = localStorage.getItem("token");
        if (token == null) {
            navigate('/')
        }
        getdata()
    }, []);
    const deletevehicle = (id) => {
        axios.post('http://fleet.prantiksoft.com/backend/Rubel/deletevehicle', {
            id: id

        },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                }
            }).then(function (response) {
                let data = response.data;
                setmsg(data.setmsg);
                setTimeout(() => navigate('/vehicle'), 5000);
                getdata()

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
                                        <h1 className="m-0">Available Car List</h1>
                                    </div>
                                    <div className="col-sm-12">
                                        <ol className="breadcrumb float-sm-right">
                                            <li className="breadcrumb-item"></li>
                                            <li className="breadcrumb-item">Car List</li>
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
                                                <h5 className="m-0">Vehicles List</h5>
                                            </div>
                                            <div className="card-body">
                                                <table className='table table-striped table-bordered table-hover'>
                                                    <thead>
                                                        <tr>
                                                            <th>SL</th>
                                                            <th>Name</th>
                                                            <th>Type</th>
                                                            <th>Model</th>
                                                            <th>Color</th>
                                                            <th>Registration_no</th>
                                                            <th>Expire date</th>
                                                            <th>Status</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {List.map((d, i) =>
                                                            <tr key={i}>
                                                                <td>{i + 1}</td>
                                                                <td>{d.name}</td>
                                                                <td>{d.title}</td>
                                                                <td>{d.model}</td>
                                                                <td>{d.color}</td>
                                                                <td>{d.registration_no}</td>
                                                                <td>{d.expire_date}</td>
                                                                <td className='badge badge-success'>Available</td>
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
        </>
    )
}

export default Availablecar;







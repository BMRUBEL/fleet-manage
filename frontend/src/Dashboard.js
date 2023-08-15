import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Menu from './Menu';
import axios from 'axios';

const Dashboard = () => {
    const navigate = useNavigate();

    const [vList, setvList] = useState([]);
    useEffect(() => {
        let token = localStorage.getItem('token')
        if (token == null) {
            navigate("/");
        }
    }, []);


    const getdata = () => {
        axios({
            method: 'get',
            url: 'http://fleet.prantiksoft.com/backend/Parts/getVehicles',
            responseType: 'json'
        }).then(function (response) {
            setvList(response.data.list);
            console.log(response.data.list);
        });
    }
    useEffect(() => {
        getdata()
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
                                    <h1 className="m-0">Vehicle Status</h1>
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
                                <div className="col-lg-3 col-6">
                                    <div className="small-box bg-info">
                                        <div className="inner">
                                            <h3>{vList.vava}</h3>
                                            <h5>Available Cars</h5>
                                        </div>
                                        <div className="icon">
                                            <i className="ion ion-android-car"></i>
                                        </div>
                                        <NavLink to="/available-car" className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></NavLink>
                                    </div>
                                </div>

                                <div className="col-lg-3 col-6">
                                    <div className="small-box bg-success">
                                        <div className="inner">
                                            <h3>{vList.vyet}</h3>
                                            <h5>Yet to Start</h5>
                                        </div>
                                        <div className="icon">
                                            <i className="ion ion-clock"></i>
                                        </div>
                                        <NavLink to="/bookinglist" className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></NavLink>
                                    </div>
                                </div>
                                
                                
                                <div className="col-lg-3 col-6">
                                    <div className="small-box bg-warning">
                                        <div className="inner">
                                            <h3>{vList.vongo}</h3>
                                            <h5>On Going Trip</h5>
                                        </div>
                                        <div className="icon">
                                            <i className="ion ion-ios-speedometer"></i>
                                        </div>
                                        <NavLink to="/bookinglist" className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></NavLink>
                                    </div>
                                </div>
                                
                                <div className="col-lg-3 col-6">
                                    <div className="small-box bg-danger">
                                        <div className="inner">
                                            <h3>{vList.vmain}</h3>
                                            <h5>Cars in Maintanence</h5>
                                        </div>
                                        <div className="icon">
                                            <i className="ion ion-ios-gear"></i>
                                        </div>
                                        <NavLink to="/list" className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></NavLink>
                                    </div>
                                </div>
                                
                                
                            </div>
                            <br/><br/><br/>
                            <div className='row'>
                            <div className="col-lg-6 col-6 offset-3">
                                    <div className="small-box bg-secondary">
                                        <div className="inner">
                                            <h3>{vList.vav}</h3>
                                            <h5>Total Number of Cars</h5>
                                        </div>
                                        <div className="icon">
                                            <i className="ion ion-model-s"></i>
                                        </div>
                                        <NavLink to="/vehicle" className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></NavLink>
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

export default Dashboard;

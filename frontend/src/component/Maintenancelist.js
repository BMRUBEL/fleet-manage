import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Menu from '../Menu';
import Footer from '../Footer';

export default function Maintenancelist() {
    const navigate = useNavigate();
    const [list, setList] = useState([]);
      //-----list show------
      const getMaintenance = () => {
        axios({
            method: 'get',
            url: 'http://fleet.prantiksoft.com/backend/Maintenance/getMaintenance',
            responseType: 'json'
        }).then(function (response) {
            setList(response.data.maintenance);
            // console.log(response.data.maintenance);
        });
    }
    useEffect(() => {
        getMaintenance()
    }, []);

        //------edit---------
        const edit_maintenance = (id) => {
            navigate('/maintanenceedit/' + id)
        }
        //------delete---------
        const deletemaintenance = (id) => {
            axios.post('http://fleet.prantiksoft.com/backend/Maintenance/deletemaintenance', {
                id: id
            },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': localStorage.getItem('token')
                    }
                }).then(function (response) {
                    let data = response.data
                    getMaintenance()
                }
                )
        }
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
                            <h1 className="m-0 ">Maintenance List</h1>
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
                                    <table className='table table-bordered'>
                                        <thead>
                                            <tr>
                                                <th>SL</th>
                                                <th>Car Name</th>
                                                <th>Vendor Name</th>
                                                <th>Start Date</th>
                                                <th>End Date</th>
                                                <th>Details</th>
                                                <th>Cost</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {list.map((d, i) =>
                                                <tr key={i}>
                                                    <td>{i + 1}</td>
                                                    <td>{d.vehiclename}</td>
                                                    <td>{d.vendorname}</td>
                                                    <td>{d.start_date}</td>
                                                    <td>{d.end_date}</td>
                                                    <td>{d.details}</td>
                                                    <td>{d.cost}</td>
                                                    <td>{d.status}</td>
                                                    <td>
                                                        <button onClick={() => deletemaintenance(d.id)} className='btn btn-xs btn-danger'>Delete</button>&nbsp;
                                                        <button onClick={() => edit_maintenance(d.id)} className='btn btn-xs btn-primary'>Edit</button>
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

                <Footer/>
            </div>
        </div>
    </div>
  )
}

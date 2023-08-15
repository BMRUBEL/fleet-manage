import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Menu from '../Menu'
import Footer from '../Footer'
import axios from 'axios';
export default function Vendorlist() {
    const navigate = useNavigate();
    const [data, setList] = useState([]);
    const [name, setname] = useState('');
    const [address, setaddress] = useState('');
    const [phone, setphone] = useState('');
    const [email, setemail] = useState('');
    const getdata = () => {
        axios({
            method: 'get',
            url: 'http://fleet.prantiksoft.com/backend/Vendors',
            responseType: 'json'
        }).then(function (response) {
            setList(response.data.list)
        });
    }
    useEffect(() => {
        getdata()
    }, []);

    const save = () => {
        axios.post('http://fleet.prantiksoft.com/backend/Vendors/addvendors', {
            name:name,
            address:address,
            phone:phone,
            email: email,
            
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        }).then(function (response) {
            let data = response.data;
           
            setname('')
            setaddress('')
            setphone('')
            setemail('')
            getdata()
        })
    }
    const deleteuser = (id) => {
        axios.post('http://fleet.prantiksoft.com/backend/Vendors/deletevendors', {
            id: id
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        }).then(function (response) {
            let data = response.data;
           
            getdata()
        })
    }

    const editvendors=(id)=>{
    
        navigate('/editvendors/'+id)
      }


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
                                        <h1 className="m-0">Add Vendor</h1>
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
                                                <h5 className="m-0">Add New</h5>
                                            </div>
                                            <div className="card-body">
                                                <h4>Vendor List</h4>
                                                <table className='table table-bordered'>
                                                    <tbody>
                                                        <tr>
                                                            <th>Name</th>
                                                            <td><input type='text' className='form-control'  onChange={(e) => setname(e.target.value)} value={name}/>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <th>Address</th>
                                                            <td><input type='text' className='form-control' onChange={(e) => setaddress(e.target.value)} value={address}/></td>
                                                        </tr>
                                                        <tr>
                                                            <th>Phone Number</th>
                                                            <td><input type='text' className='form-control' onChange={(e) => setphone(e.target.value)} value={phone}/></td>

                                                            
                                                        </tr>

                                                        <tr>
                                                            <th>Email</th>
                                                            <td><input type='text' className='form-control' onChange={(e) => setemail(e.target.value)} value={email}/> </td>
                                                          
                                                        </tr>


                                                        <tr >
                                                            <td colSpan={2}>

                                                                <input type='submit' className='btn btn-block btn-primary' value="Save" onClick={save} /> </td>
                                                        </tr>


                                                    </tbody>
                                                </table>

                                            </div>
                                        </div>
                                    </div>





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
                                                            <th>Name</th>
                                                            <th>Address</th>
                                                            <th>Phone</th>
                                                            <th>Email</th>
                                                            <th colSpan="2">Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {data.map((d, i) =>
                                                            <tr key={i}>
                                                                <td>{i + 1}</td>
                                                                <td>{d.name}</td>
                                                                <td>{d.address}</td>
                                                                <td>{d.phone}</td>
                                                                <td>{d.email}</td>

                                                               <td><button class="btn btn-danger" onClick={ () => deleteuser(d.id) }>Delete</button></td> 

                                                                <td><button 
                                                                onClick={()=>editvendors(d.id)} class="btn btn-success">Edit</button></td>



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

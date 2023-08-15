import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import Menu from '../Menu'
import Footer from '../Footer'
import axios from 'axios';

export default function Edit_vandor() {
        const navigate = useNavigate();
    const d = useParams();
    // const [data, setList] = useState([]);
    const [name, setname] = useState('');
    const [address, setaddress] = useState('');
    const [phone, setphone] = useState('');
    const [email, setemail] = useState('');
   
    //---Edit-----
    useEffect(() =>{
        axios.post('http://fleet.prantiksoft.com/backend/Vendors/editvendors', {
            id: d.id,
        },{
           headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
        }).then(function (response) {
            let data = response.data;
            // console.log(data)
            setname(data.vendors.name);
            setaddress(data.vendors.address);
            setphone(data.vendors.phone);
            setemail(data.vendors.email);
          
        })
       
    },[]);
// update----------
const update=()=> {
    axios.post('http://fleet.prantiksoft.com/backend/Vendors/updatevendors', {
        name:name,
        address:address,
        phone:phone,
        email: email,
        id: d.id
  },{
    headers: {
      'Content-Type': 'application/json',
      'Authorization':localStorage.getItem('token')
    }
  }).then(function (response) {
    let data=response.data;
    // setmsg(data.msg)
    setTimeout(()=>navigate('/vendor'), 1000)
    
     
            
  })
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
                                        <h1 className="m-0">Vendor List</h1>
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
                                                <h4>List</h4>
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

                                                                <input type='submit' className='btn btn-block btn-primary' value="Update" onClick={update} /> </td>
                                                        </tr>


                                                    </tbody>
                                                </table>

                                            </div>
                                        </div>
                                    </div>

                                    </div>

                                    </div>
                
                                    <Footer />
                                </div>
                            </div>
                        </div>
                        </div>
                        </div>

  )
}

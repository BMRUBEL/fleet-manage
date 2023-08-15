import axios, { Axios } from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer'
import Menu from '../Menu'

export default function Driverlist() {
    const [data, setList] = useState([]);
    const [msg, setmsg] = useState('');
    const navigate=useNavigate();
    const getdata=()=>{
        axios({
            method: 'get',
            url: 'http://fleet.prantiksoft.com/backend/Driver_controller',
            responseType: 'json'
          }).then(function (response) {
                setList(response.data.list)
            });
    }
    useEffect(() => {
        getdata()
    }, []);
  const deletedriver=(id)=>{
    axios.post("http://fleet.prantiksoft.com/backend/Driver_controller/deletedriver",{
      id:id
    },{
      headers: {
        'Content-Type': 'application/json',
        'Authorization':localStorage.getItem('token')
      }
    }).then(function(response){
      let data=response.data;
      setmsg(data.msg)
      getdata()
    })
  }
  const editdriver=(id)=>{
    navigate('/editdriver/'+id)
  }
  const viewdriver=(id)=>{
    navigate('/viewdriver/'+id)
  }
  return (
    <div className="hold-transition sidebar-mini">
    <div className="wrapper">
    <Menu/>
    <div className="content-wrapper">
    <div className="content-header">
        <div className="container-fluid">
        <div className="row mb-2">
            <div className="col-sm-6">
            <h1 className="m-0">Deriver Info</h1>
            </div>
            <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item"><a href="#">Home</a></li>
                <li className="breadcrumb-item active">Driver</li>
            </ol>
            </div>
        </div>
        </div>
    </div>

    <div className="content">
      <div className="container-fluid">
      
     
        <div className="card card-primary card-outline">
              <div className="card-header">
                <h5 className="m-0">derivers List</h5>
              </div>
              <div className="card-body">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>SL</th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Gmail</th>
                            <th>Address</th>
                            <th>Exprience</th>
                            <th>Action</th>                            
                        </tr>
                    </thead>
                    <tbody>
                    {data.map((d,i)=>
                        <tr key={i}>
                            <td>{i+1}</td>
                            <td>{d.name}</td>
                            <td>{d.phone}</td>
                            <td>{d.email}</td>
                            <td>{d.address}</td>
                            <td>{d.experience}</td>
                            {/* <td><img src="" width="100" height="80"/></td> */}
                            <td>
                            <button onClick={()=>editdriver(d.admin_id)} className="btn btn-primary "><i class="fa fa-edit" style={{fontsize:"24px"}}></i></button>
                              &nbsp;
                              <button onClick={()=>viewdriver(d.admin_id)} className="btn btn-success "><i class="fa fa-eye" style={{fontsize:"24px"}}></i></button>
                              &nbsp;
                              <button onClick={()=>deletedriver(d.admin_id)}  className="btn btn-danger"><i class="fa fa-trash-o" style={{fontSize:"24px"}}></i></button>
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

    <Footer/>
    </div>
</div>
  )
}

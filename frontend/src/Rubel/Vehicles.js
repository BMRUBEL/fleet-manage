import axios from 'axios';
import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer';
import Menu from '../Menu';
 

export default function Vehicles() {
    const navigate = useNavigate();
        const [data, setList] = useState([]);
        const [selectedFile, setselectedFile] = useState('');
        const [selecteddoct, setselecteddoct] = useState('');
        const [title, settitle] = useState([{title: "",id: ""}]);
        const [type_id, settype_id] = useState('');
        const [name, setname] = useState('');
        const [registration_no, setregistration_no] = useState('');
        const [model, setmodel] = useState('');
        const [chesis_no, setchesis_no] = useState('');
        const [manufacture, setmanufacture] = useState('');
        const [color, setcolor] = useState('');
        const [expire_date, setexpire_date] = useState('');
        // const [photo, setphoto] = useState('');
        // const [documents, setdocuments] = useState('');
        const [vehiclesID, setid] = useState('');
        const [msg, setmsg] = useState('');
        const getdata=()=>{
              axios({
                  method: 'get',
                  url: 'http://fleet.prantiksoft.com/backend/Rubel',
                  responseType: 'json'
              }).then(function (response) {
                setList(response.data.type)
            });
        }
        useEffect(() => {
            let token = localStorage.getItem("token");
            if(token == null){
                navigate('/')
            }
            getdata()
        }, []);
        const deletevehicle = (id)=>{
            axios.post('http://fleet.prantiksoft.com/backend/Rubel/deletevehicle',{
                id:id

            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                }
            }).then(function (response) {
                let data = response.data;
                setmsg(data.setmsg);
                setTimeout(()=>navigate('/vehicle'), 5000);
                getdata()
                 
            })
        }
        const editvehicle=(id)=>{
            // axios.post('http://fleet.prantiksoft.com/backend/Rubel/editvehicle',{
            //     id:id

            // },
            // {
            //     headers: {
            //         'Content-Type': 'application/json',
            //         'Authorization': localStorage.getItem('token')
            //     }
            // }).then(function (response) {
            //     let data = response.data;
                 
            // })
            navigate('/editvehicle/'+id)
          }
        
  return (
    <>
    <div className="hold-transition sidebar-mini">
            <div className="wrapper">
            <Menu/>
            <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                <div className="row mb-2">
                    <div className="col-sm-6">
                    <h1 className="m-0">Vehicles List</h1>
                    </div>
                    <div className="col-sm-12">
                    <ol className="breadcrumb float-sm-right">
                        <li className="breadcrumb-item"></li>
                        <li className="breadcrumb-item">Vhicle List</li>
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
                        <h4>{msg}</h4>
                        <div className="card-body">
                        <table className='table table-bordered table-responsive'>
                            <thead>
                                <tr>
                                    <th>SL</th>
                                    <th>Name</th>
                                    <th>Type</th>
                                    <th>Model</th>
                                    <th>Color</th>
                                    <th>Registration_no</th>
                                    <th>Chesis number</th>
                                    <th>Manufacture</th>
                                    <th>Expire date</th>
                                    {/* <th>Photo</th>
                                    <th>Documents</th> */}
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                    {data.map((d,i)=>
                                    <tr key={i}>
                                        <td>{i+1}</td>
                                        <td>{d.name}</td>
                                        <td>{d.vehicle_title}</td>
                                        <td>{d.model}</td>
                                        <td>{d.color}</td>
                                        <td>{d.registration_no}</td>
                                        <td>{d.chesis_no}</td>
                                        <td>{d.manufacturer}</td>
                                        
                                        <td>{d.expire_date}</td>
                                        {/* <td>{d.photo}</td>
                                        <td>{d.documents}</td> */}
                                        <td>
                                            <button onClick={()=>deletevehicle(d.id)} className="btn btn-xs btn-danger">Delete</button>&nbsp;
                                            <button onClick={()=>editvehicle(d.id)} className="btn btn-xs btn-primary">Edit</button>
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
    </>
  )
}







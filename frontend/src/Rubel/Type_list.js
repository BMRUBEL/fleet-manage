import axios from 'axios';
import React, {useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Menu from '../Menu';
import Footer from '../Footer';

export default function Type_list() {
    const navigate = useNavigate();
    const [data, setList] = useState([]);
    const [title, settitle] = useState('');
    const [msg, setmsg] = useState('');
    const [vehicle_typeID, setid] = useState('');
    const getdata=()=>{
        axios({
            method: 'get',
            url: 'http://fleet.prantiksoft.com/backend/Rubel/vehicle_type',
            responseType: 'json'
          }).then(function (response) {
                setList(response.data.list)
            });
    }
    useEffect(() => {
        getdata()
    }, []);
    const deletevehicle_type = (id)=>{
        axios.post('http://fleet.prantiksoft.com/backend/Rubel/deletevehicle_type',{
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
            setTimeout(()=>navigate('/typelist'), 5000);
            getdata()
             
        })
    }
    const editvehicle_type=(id)=>{
        // axios.post('http://fleet.prantiksoft.com/backend/Rubel/editvehicle_type',{
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
        navigate('/typeedit/'+id)
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
                    <h1 className="m-0 ">Vehicles Type List</h1>
                    </div>
                    <div className="col-sm-12 bg-primary">
                    <ol className="breadcrumb float-sm-right">
                        <li className="breadcrumb-item"></li>
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
                        <h5 className="m-0 ">Vehicles Type List</h5>      
                        </div>
                        <h4>{msg}</h4>
                        <div className="card-body">
                        <table className='table table-bordered'>
                            <thead>
                                <tr>
                                    <th>SL</th>
                                    <th>Title</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            {data.map((d,i)=>
                                    <tr key={i}>
                                        <td>{i+1}</td>
                                        <td>{d.title}</td>
                                        <td>
                                            <button onClick={()=>deletevehicle_type(d.id)} className="btn btn-xs btn-danger">Delete</button>
                                            <button onClick={()=>editvehicle_type(d.id)} className="btn btn-xs btn-primary">Edit</button>
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
  );
}

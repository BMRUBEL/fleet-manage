import React, { useEffect, useState } from 'react'
import react from 'react'
import Menu from '../Menu';
import Footer from '../Footer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Service_list() {
    const navigate = useNavigate();
    const [data, setList] = useState([]);
    const [title, settitle] = useState('');
    const [icon, seticon] = useState('');
    const [descript, setdescript] = useState('');
    const [msg, setmsg] = useState('');
    const getdata = () => {
        axios({
            method: 'get',
            url: 'http://fleet.prantiksoft.com/backend/Service/service_list',
            responseType: 'json'
        }).then(function (response) {
            setList(response.data.list)
        });
    }
    useEffect(() => {
        getdata()
    }, []);


    // deleteservice-----------
    const deleteservice = (id)=>{
        axios.post('http://fleet.prantiksoft.com/backend/Service/deleteservice',{
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
            setTimeout(()=>navigate('/service_list'), 3000)
            getdata()
        })

       
    }

    const edit_service=(id)=>{
           
        navigate('/editservice/'+id)
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
                                        <h1 className="m-0 ">Service List</h1>
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
                                                <h5 className="m-0 ">Service List</h5>
                                            </div>
                                            <h4>{msg}</h4>
                                            <div className="card-body">
                                                <table className='table table-bordered'>
                                                    <thead>
                                                        <tr>
                                                            <th>SL</th>
                                                            <th>Title</th>
                                                            <th>Photo</th>
                                                            <th>Icon</th>
                                                            <th>Descript</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {data.map((d, i) =>
                                                            <tr key={i}>
                                                                <td>{i + 1}</td>
                                                                <td>{d.title}</td>
                                                                <td><img
                                                                        src={`http://fleet.prantiksoft.com/backend/uploads/${d.photo}`}
                                                                        style={{ width: "100px", height: "80px" }}
                                                                    /></td>
                                                                <td><img
                                                                        src={`http://fleet.prantiksoft.com/backend/uploads/${d.icon}`}
                                                                        style={{ width: "100px", height: "80px" }}
                                                                    /></td>
                                                                <td>{d.descript}</td>
                                                                <td>
                                            <button onClick={()=>deleteservice(d.id)} className="btn btn-xs btn-danger">Delete</button>
                                            &nbsp; 
                                            <button onClick={()=>edit_service(d.id)} className="btn btn-xs btn-primary">Edit</button>
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

                    <Footer />
                </div>
            </div>
        </>
    );
}

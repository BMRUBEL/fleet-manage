 import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Menu from '../Menu';
import Footer from '../Footer';
 
 export default function Vehicle_type() {
    const navigate = useNavigate();
    const [title, settitle] = useState('');
    const [msg, setmsg] = useState('');
    useEffect(()=>{
      axios({
       method: "get",
       url:'http://fleet.prantiksoft.com/backend/Rubel/vehicle_type',
       responseType: "json"
      })
      .then(function (response){
       settitle(response.data.title);
      })

   },[]);
   const save =()=>{
        
    axios.post('http://fleet.prantiksoft.com/backend/Rubel/addvehicle_type', {
        title: title
    },{
        headers: {
        'Content-Type': 'application/json',
        'Authorization':localStorage.getItem('token')
        }
    }).then(function (response) {
        let data=response.data;
        setmsg(data.msg)
        settitle('')
        setTimeout(()=>setmsg(''), 3000)
        setTimeout(()=>navigate('/typelist'), 5000)

})

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
                    <h1 className="m-0">Add Vehicle Type</h1>
                    </div>
                    <div className="col-sm-6">
                    <ol className="breadcrumb float-sm-right">
                        <li className="breadcrumb-item"> 
                        {/* <a href='#'>Home</a> */}
                        </li>
                        <li className="breadcrumb-item active">Add Vehicle Type</li>
                    </ol>
                    </div>
                    <h3>{msg}</h3>
                </div>
                </div>
            </div>

            <div className="content">
                <div className="container-fluid">
                <div className="row">
                 <div className="col-lg-12">
                    <div className="card card-primary card-outline">
                        <div className="card-header">
                        <h5 className="m-0">Add Vehicle Type</h5>
                        </div>
                        <div className="card-body">
                       <table className='table table-bordered'>
                            <tbody>
                             
                            <tr>
                                <th>Title</th>
                                <td><input type='text' className='form-control' placeholder="Title name" onChange={(e)=>settitle(e.target.value)} value={title}/></td>
                            </tr>
                            <tr>
                                <td colSpan={2}><input type='submit' className='btn btn-block btn-primary' value="Save" onClick={save}/></td>
                            </tr>
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
 
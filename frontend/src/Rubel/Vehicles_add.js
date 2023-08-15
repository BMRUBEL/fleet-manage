import axios from 'axios';
import React, { useState,useEffect } from 'react'
// import React, { useState} from 'react'
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer'
import Menu from '../Menu'

export default function Vehicles_add() {
    const navigate = useNavigate();
    // const [data, setList] = useState([]);
    const [selectedFile, setselectedFile] = useState('');
    const [selecteddoct, setselecteddoct] = useState('');
    const [title, settitle] = useState([{title: "",id: ""}]);
    const [tyte, settyte] = useState("");
    const [id, setid] = useState("");
    const [type_id, settype_id] = useState('');
    const [registration_no, setregistration_no] = useState('');
    const [name, setname] = useState('');
    const [model, setmodel] = useState('');
    const [chesis_no, setchesis_no] = useState('');
    const [manufacture, setmanufacture] = useState('');
    const [color, setcolor] = useState('');
    const [expire_date, setexpire_date] = useState('');
    // const [photo, setphoto] = useState('');
    // const [documents, setdocuments] = useState('');
    const [msg, setmsg] = useState('');
    // const [type, settype] = useState('insert');
    // const [vehicleID, setid] = useState('');

    useEffect(()=>{
       axios({
        method: "get",
        url:'http://fleet.prantiksoft.com/backend/Rubel/gettype',
        responseType: "json"
       })
       .then(function (response){
        settitle(response.data.title);
       })

    },[]);
    
  const save =()=>{
        const formdata=new FormData();
        formdata.append('photo',selectedFile);
        formdata.append('documents',selecteddoct);
        formdata.append('id',id);
        formdata.append('type_id',type_id);
        formdata.append('registration_no',registration_no);
        formdata.append('name',name);
        formdata.append('model',model);
        formdata.append('chesis_no',chesis_no);
        formdata.append('manufacturer',manufacture);
        formdata.append('color',color);
        formdata.append('expire_date',expire_date);
        // formdata.append('documents',documents);
     
        fetch('http://fleet.prantiksoft.com/backend/Rubel/vehiclesfile',{
            method:'POST',
            body:formdata

        }).then((response) => response.json())
          .then((data) => {
            setmsg(data.msg)
      
            setregistration_no('')
            setname('')
            setmodel('')
            setchesis_no('')
            setmanufacture('')
            setcolor('')
            setexpire_date('')
            // setphoto('')
            // setdocuments('')
            setTimeout(()=>setmsg(''), 3000)
            setTimeout(()=>navigate('/vehicle'), 5000)
          });
         
        //     axios.post('http://fleet.prantiksoft.com/backend/Rubel/addvehicles', {
        //         type_id: type_id,
        //         registration_no: registration_no,
        //         name: name,
        //         model: model,
        //         chesis_no: chesis_no,
        //         manufacture: manufacture,
        //         color: color,
        //         expire_date: expire_date,
        //         photo: photo,
        //         documents:selecteddoct,
        //     },{
        //         headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization':localStorage.getItem('token')
        //         }
        //     }).then(function (response) {
        //         let data=response.data;
        //         setmsg(data.msg)
          
        //         setregistration_no('')
        //         setname('')
        //         setmodel('')
        //         setchesis_no('')
        //         setmanufacture('')
        //         setcolor('')
        //         setexpire_date('')
        //         setphoto('')
        //         setdocuments('')
        //         setTimeout(()=>setmsg(''), 3000)
        //         setTimeout(()=>navigate('/vehicle'), 5000)

        // })
    
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
                    <h1 className="m-0">Vehicle Add</h1>
                    </div>
                    <div className="col-sm-6">
                    <ol className="breadcrumb float-sm-right">
                        <li className="breadcrumb-item"> 
                        {/* <a href='#'>Home</a> */}
                        </li>
                        <li className="breadcrumb-item active">Vehicles Add</li>
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
                        <h5 className="m-0">Add Vehicles</h5>
                        </div>
                        <div className="card-body">
                       <table className='table table-bordered'>
                            <tbody>
                            <tr>
                              <th>
                                
                              </th>
                              <td>
                                <input type="hidden" name="id" className="form-control" onChange={(e) => setid(e.target.value)}
                                  value={id} />
                              </td>
                            </tr>
                            <tr>
                                <th>Vehicle Type</th>
                                <td>
                                    <select className='form-control' onChange={(e)=>settype_id(e.target.value)} >
                                        <option value="">Select Vehicle Type</option>
                                        {title.map((d,i)=>{
                                            return(
                                                <option value={d.id} key={i}>{d.title}</option>
                                            )
                                        })}
                                        
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <th>Registration No *</th>
                                <td><input type='text' className='form-control' placeholder="Registration no" onChange={(e)=>setregistration_no(e.target.value)} value={registration_no}/></td>
                            </tr>
                            <tr>
                                <th>Vehicles Name</th>
                                <td><input type='text' className='form-control' placeholder="vehicles Name" onChange={(e)=>setname(e.target.value)} value={name}/></td>
                            </tr>
                            <tr>
                                <th>Model</th>
                                <td><input type='text' className='form-control' placeholder="input Model" onChange={(e)=>setmodel(e.target.value)} value={model}/></td>
                            </tr>
                            <tr>
                                <th>Chesis No</th>
                                <td><input type='text' className='form-control' placeholder="Chesis No" onChange={(e)=>setchesis_no(e.target.value)} value={chesis_no}/></td>
                            </tr>
                            <tr>
                                <th>Manufacture</th>
                                <td><input type='text' className='form-control' placeholder="Manufacture" onChange={(e)=>setmanufacture(e.target.value)} value={manufacture}/></td>
                            </tr>
                            <tr>
                                <th>Color</th>
                                <td><input type='text' className='form-control'  placeholder="Color Name" onChange={(e)=>setcolor(e.target.value)} value={color}/></td>
                            </tr>
                            <tr>
                                <th>Expire_date</th>
                                <td><input type="datetime-local" className='form-control'  placeholder="Expire date" onChange={(e)=>setexpire_date(e.target.value)} value={expire_date}/></td>
                            </tr> 
                            <tr>
                                <th>Photo</th>
                                <td><input type='file' className='form-control' onChange={(e)=>setselectedFile(e.target.files[0])}/></td>
                            </tr>
                            <tr>
                                <th>Documents</th>
                                <td><input type='file' className='form-control' onChange={(e)=>setselecteddoct(e.target.files[0])}/></td>
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

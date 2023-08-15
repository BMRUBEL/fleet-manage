import axios from "axios";
import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
// import {   useParams } from 'react-router-dom';
import Menu from "../Menu";
import Footer from "../Footer";
import { type } from "@testing-library/user-event/dist/type";

export default function Vehicleedit() {
  const navigate = useNavigate();
  const d = useParams();
  const [selectedFile, setselectedFile] = useState("");
  const [id, setid] = useState("");
  const [selecteddoct, setselecteddoct] = useState("");
  const [title, settitle] = useState([{ title: "", id: "" }]);
  const [type_id, settype_id] = useState("");
  const [registration_no, setregistration_no] = useState("");
  const [name, setname] = useState("");
  const [model, setmodel] = useState("");
  const [chesis_no, setchesis_no] = useState("");
  const [manufacture, setmanufacture] = useState("");
  const [color, setcolor] = useState("");
  const [expire_date, setexpire_date] = useState("");
  const [photo, setphoto] = useState("");
  const [documents, setdocuments] = useState("");
  const [msg, setmsg] = useState("");

  useEffect(() => {
    axios({
      method: "get",
      url: "http://fleet.prantiksoft.com/backend/Rubel/gettype",
      responseType: "json",
    }).then(function (response) {
      settitle(response.data.title);
    });

    axios
      .post(
        "http://fleet.prantiksoft.com/backend/Rubel/editvehicle",
        {
          id: d.id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then(function (response) {
        let data = response.data;
        console.log(data);
        setselectedFile(data.user.selectedFile);
        setselecteddoct(data.user.selecteddoct);
        // settitle(data.user.title);
        settype_id(data.user.type_id);
        setregistration_no(data.user.registration_no);
        setname(data.user.name);
        setmodel(data.user.model);
        setchesis_no(data.user.chesis_no);
        setmanufacture(data.user.manufacturer);
        setcolor(data.user.color);
        setexpire_date(data.user.expire_date);
        setphoto(data.user.photo);
        setdocuments(data.user.documents);
        setid(data.user.type_id);
      });
  }, []);

  //-------update fetch use---------
  const update = () => {

    const formdata=new FormData();
    formdata.append('photo',selectedFile);
    formdata.append('documents',selecteddoct);
    // formdata.append('id',id);

    formdata.append('type_id',type_id);
    formdata.append('registration_no',registration_no);
    formdata.append('name',name);
    formdata.append('model',model);
    formdata.append('chesis_no',chesis_no);
    formdata.append('manufacturer',manufacture);
    formdata.append('color',color);
    formdata.append('expire_date',expire_date);
    // formdata.append('documents',documents);
 
    fetch('http://fleet.prantiksoft.com/backend/Rubel/updatevehicle/'+d.id,{
        method:'POST',
        body:formdata

    }).then((response) => response.json())
      .then((data) => {
        setmsg(data.msg)
        setid('')
        setregistration_no('')
        setname('')
        setmodel('')
        setchesis_no('')
        setmanufacture('')
        setcolor('')
        setexpire_date('')
        // setphoto('')
        // setdocuments('')
        setselectedFile('')
        setselecteddoct('')
        
        setTimeout(()=>navigate('/vehicle'), 3000)
      });
    }

  //-------update axios use---------

  //   const update = () => {
  //   axios
  //     .post(
  //       "http://fleet.prantiksoft.com/backend/Rubel/updatevehicle",
  //       {
  //         // title: title,
  //         type_id: type_id,
  //         registration_no: registration_no,
  //         name: name,
  //         model: model,
  //         chesis_no: chesis_no,
  //         manufacture: manufacture,
  //         color: color,
  //         expire_date: expire_date,
  //         photo: photo,
  //         documents: documents,
  //         id: d.id,
  //       },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: localStorage.getItem("token"),
  //         },
  //       }
  //     )
  //     .then(function (response) {
  //       let data = response.data;
  //       setmsg(data.msg);
  //       setTimeout(()=>navigate('/vehicle'), 3000)
  //     });

  // };

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
                    <h1 className="m-0">Edit vehicle </h1>
                  </div>
                  <div className="col-sm-6">
                    <ol className="breadcrumb float-sm-right">
                      <li className="breadcrumb-item"></li>
                      <li className="breadcrumb-item active">Vehicles Add</li>
                      <h2>{msg}</h2>
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
                        <h5 className="m-0">Edit Vehicles</h5>
                      </div>
                      <div className="card-body">
                        <table className="table table-bordered">
                          <tbody>
                            {/* <tr>
                                <th>Vehicle_type</th>
                                <td>
                                    <select className='form-control' onChange={(e)=>settype_id(e.target.value)} value={type_id}>
                                        <option value="">Select type</option>
                                        {title.map((d,i)=>{
                                            return(
                                                <option value={d.id} key={i}>{d.title}</option>
                                            )
                                        })}
                                        
                                    </select>
                                </td>
                            </tr> */}
                            <tr>
                              <th>
                                Id
                              </th>
                              <td>
                                <input type="hidden" name="id" className="form-control" onChange={(e) => setid(e.target.value)}
                                  value={id} />
                              </td>
                            </tr>
                            <tr>

                              <th>Vehicle_type</th>
                              <td>
                                <select
                                  className="form-control f"
                                  onChange={(e) => settype_id(e.target.value)}
                                  
                                  value={type_id}
                                >
                                  <option value="">Select type</option>
                                  {title.map((d, i) => {
                                    return (
                                      <option key={i} value={d.id}>{d.title}
                                      </option>
                                    );
                                  })}
                                </select>
                              </td>
                            </tr>
                            <tr>
                              <th>Registration No</th>
                              <td>
                                <input
                                  type="text"
                                  className="form-control"
                                  onChange={(e) =>
                                    setregistration_no(e.target.value)
                                  }
                                  value={registration_no}
                                />
                              </td>
                            </tr>
                            <tr>
                              <th>Vehicles Name</th>
                              <td>
                                <input
                                  type="text"
                                  className="form-control"
                                  onChange={(e) => setname(e.target.value)}
                                  value={name}
                                />
                              </td>
                            </tr>
                            <tr>
                              <th>Model</th>
                              <td>
                                <input
                                  type="text"
                                  className="form-control"
                                  onChange={(e) => setmodel(e.target.value)}
                                  value={model}
                                />
                              </td>
                            </tr>
                            <tr>
                              <th>Chesis No</th>
                              <td>
                                <input
                                  type="text"
                                  className="form-control"
                                  onChange={(e) => setchesis_no(e.target.value)}
                                  value={chesis_no}
                                />
                              </td>
                            </tr>
                            <tr>
                              <th>Manufacture</th>
                              <td>
                                <input
                                  type="text"
                                  className="form-control"
                                  onChange={(e) =>
                                    setmanufacture(e.target.value)
                                  }
                                  value={manufacture}
                                />
                              </td>
                            </tr>
                            <tr>
                              <th>Color</th>
                              <td>
                                <input
                                  type="text"
                                  className="form-control"
                                  onChange={(e) => setcolor(e.target.value)}
                                  value={color}
                                />
                              </td>
                            </tr>
                            <tr>
                              <th>Expire_date</th>
                              <td>
                                <input
                                  type="datetime-local"
                                  className="form-control"
                                  onChange={(e) =>
                                    setexpire_date(e.target.value)
                                  }
                                  value={expire_date}
                                />
                              </td>
                            </tr>
                            <tr>
                              <th>Photo</th>
                              <td>
                                <input
                                  type="file"
                                  className="form-control" name="photo"
                                  onChange={(e) =>
                                    setselectedFile(e.target.files[0])
                                  }
                                />
                              </td>
                            </tr>
                            <tr>
                              <td>
                                {/* <img src={`http://fleet.prantiksoft.com/backend/uploads/${selectedFile}`} /> */}
                                <img
                                  src={`http://fleet.prantiksoft.com/backend/uploads/${photo}`}
                                  style={{ width: "250px", height: "200px" }}
                                />
                              </td>
                            </tr>
                            <tr>
                              <th>Documents</th>
                              <td>
                                <input
                                  type="file"
                                  className="form-control" name="documents"
                                  onChange={(e) =>
                                    setselecteddoct(e.target.files[0])
                                  }
                                />
                              </td>
                            </tr>
                            <tr>
                              <td>
                                {/* <img src={`http://fleet.prantiksoft.com/backend/uploads/${selectedFile}`} /> */}
                                <img
                                  src={`http://fleet.prantiksoft.com/backend/uploads/${documents}`}
                                  style={{ width: "250px", height: "200px" }}
                                />
                              </td>
                            </tr>
                            <tr>
                              <td colSpan={2}>
                                <input
                                  type="submit"
                                  className="btn btn-block btn-primary"
                                  value="Update"
                                  onClick={update}
                                />
                              </td>
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
          <Footer />
        </div>
      </div>
    </>
  );
}

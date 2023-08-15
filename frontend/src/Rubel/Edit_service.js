import React, { useEffect, useState } from 'react'
import Menu from '../Menu'
import Footer from '../Footer'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function Edit_service() {
  const navigate = useNavigate();
  const [selectedFile, setselectedFile] = useState("");
  const d = useParams();
  const [title, settitle] = useState("");
  const [icon, seticon] = useState("");
  const [descript, setdescript] = useState("");
  const [photo, setphoto] = useState("");
  const [msg, setmsg] = useState("");

  useEffect(()=>{
      axios.post('http://fleet.prantiksoft.com/backend/Service/editservice', {
          id: d.id,
        },{
          headers: {
            'Content-Type': 'application/json',
            'Authorization':localStorage.getItem('token')
          },
      }
      )
      .then(function(response){
          let data=response.data;
         setphoto(data.user.photo);
         settitle(data.user.title);
         setdescript(data.user.descript);
         seticon(data.user.icon);
          
      })
  },[]);
  const update = () => {

    const formdata=new FormData();
    formdata.append('photo',selectedFile);
    formdata.append('title',title);
    formdata.append('descript',descript);
    formdata.append('icon',icon);
     
    
 
    fetch('http://fleet.prantiksoft.com/backend/Service/updateservice/'+d.id,{
        method:'POST',
        body:formdata

    }).then((response) => response.json())
      .then((data) => {
        setmsg(data.msg)
        settitle('')
        setdescript('')
        seticon('')
        setselectedFile('')
        setphoto('')
        // setdocuments('')
        
        
        setTimeout(()=>navigate('/service_list'), 3000)
      });
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
                    <h1 className="m-0">Edit Services</h1>
                  </div>
                  <div className="col-sm-6">
                    <ol className="breadcrumb float-sm-right">
                      <li className="breadcrumb-item">
                        {/* <a href='#'>Home</a> */}
                      </li>
                      <li className="breadcrumb-item active">Edit Services</li>
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
                        <h5 className="m-0">Edit Services</h5>
                      </div>

                      <section className="content">
                        <div className="container-fluid">
                          <div>
                            <div className="card-body">
                              <div className="row">
                                <div className="col-sm-6 col-md-4">
                                  <div className="form-group">
                                    <label className="form-label">
                                      Title<span className="form-required">*</span>
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="title"
                                      placeholder="Input title"
                                      onChange={(e) => settitle(e.target.value)}
                                      value={title}
                                    />
                                  </div>
                                </div>
                                <div className="col-sm-6 col-md-4">
                                  <div className="form-group">
                                    <label className="form-label">
                                      Photo<span className="form-required">*</span>
                                    </label>
                                    <input
                                      type="file"
                                      className="form-control"
                                      // name="photo"
                                      onChange={(e) =>
                                        setselectedFile(e.target.files[0])
                                      }
                                    />
                                    <img
                                  src={`http://fleet.prantiksoft.com/backend/uploads/${photo}`}
                                  style={{ width: "250px", height: "200px" }}
                                />
                                  </div>
                                </div>
                                <div className="col-sm-6 col-md-4">
                                  <div className="form-group">
                                    <label className="form-label">
                                      Icon<span className="form-required">*</span>
                                    </label>
                                    <input
                                      type="file"
                                      className="form-control"
                                      name="icon"
                                      placeholder="Add Icon"
                                      onChange={(e) =>
                                        seticon(e.target.files[0])
                                      }
                                    />
                                    <img
                                  src={`http://fleet.prantiksoft.com/backend/uploads/${icon}`}
                                  style={{ width: "250px", height: "200px" }}
                                />
                                    
                                  </div>
                                </div>

                                <div className="col-sm-6 col-md-4">
                                  <div className="form-group">
                                    <label className="form-label">
                                      Address
                                      <span className="form-required">*</span>
                                    </label>
                                    <textarea
                                      className="form-control"
                                      placeholder="Description"
                                      name="descript"
                                      onChange={(e) =>
                                        setdescript(e.target.value)
                                      }
                                      value={descript}
                                    ></textarea>
                                  </div>
                                </div>
                              </div>

                              <div className="modal-footer">
                                <button
                                  type="submit"
                                  className="btn btn-primary"
                                  onClick={update}
                                >
                                   Update
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </section>
                      {/* <!-- /.content --> */}
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
